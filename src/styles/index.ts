import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'

import { IStyleInterface, styleVar } from '@/styles/_var'

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IStyleInterface>

export { css, injectGlobal, keyframes, ThemeProvider, styleVar }
export default styled
