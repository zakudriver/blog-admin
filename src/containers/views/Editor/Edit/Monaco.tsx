import * as React from 'react'
import * as monaco from 'monaco-editor'
import styled from '@/styles'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'

interface IMonacoEditorProps extends IClassName {
  width: string | number
  height: string | number
  value: string
  defaultValue?: string
  theme?: theme
  language: string
  options: monaco.editor.IEditorOptions
  monacoWillMount?: (params: typeof monaco) => void
  monacoDidMount?: (editor: monaco.editor.IStandaloneCodeEditor, params: typeof monaco) => void
  onChange: (value: string, event: monaco.editor.IModelContentChangedEvent) => void
}

type theme = 'vs' | 'vs-dark' | 'hc-black'

export default class MonacoEditor extends React.Component<IMonacoEditorProps> {
  containerEle: HTMLElement | null
  __current_value: string
  editor: monaco.editor.IStandaloneCodeEditor | undefined

  constructor(props: IMonacoEditorProps) {
    super(props)
    this.containerEle = null
    this.__current_value = ''
    this.editor = undefined
  }

  monacoWillMount = () => {
    const { monacoWillMount } = this.props
    if (monacoWillMount) {
      monacoWillMount(monaco)
    }
  }

  monacoDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    if (this.props.monacoDidMount) {
      this.props.monacoDidMount(editor, monaco)
    }
    editor.onDidChangeModelContent(event => {
      const value = editor.getValue()
      this.__current_value = value

      this.props.onChange(value, event)
    })
  }

  initMonaco = () => {
    const value = this.props.value !== null ? this.props.value : this.props.defaultValue
    const { language, theme, options } = this.props
    if (this.containerEle) {
      this.monacoWillMount()
      this.editor = monaco.editor.create(this.containerEle, {
        value,
        language,
        ...options
      })
    }
    if (theme) {
      monaco.editor.setTheme(theme)
    }
    if (this.editor) {
      this.monacoDidMount(this.editor)
    }
  }

  destroyMonaco = () => {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
    }
  }

  componentDidMount() {
    this.initMonaco()
  }

  componentDidUpdate(prevProps: IMonacoEditorProps) {
    if (this.props.value !== this.__current_value) {
      this.__current_value = this.props.value
      if (this.editor) {
        this.editor.setValue(this.__current_value)
      }
    }
    if (prevProps.language !== this.props.language) {
      monaco.editor.setModelLanguage(this.editor!.getModel(), this.props.language)
    }
    if (prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme!)
    }
    if (this.editor && (this.props.width !== prevProps.width || this.props.height !== prevProps.height)) {
      this.editor.layout()
    }
  }

  componentWillUnmount() {
    this.destroyMonaco()
  }

  public render() {
    const { width, height } = this.props
    const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`
    const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`
    const style = {
      width: fixedWidth,
      height: fixedHeight
    }
    return <div ref={ref => (this.containerEle = ref)} style={style} className="monaco__container"/>
  }
}