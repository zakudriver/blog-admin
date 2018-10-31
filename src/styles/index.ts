import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'

import { IStyleInterface, styleVar } from '@/styles/variable'

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IStyleInterface>

export { css, createGlobalStyle, keyframes, ThemeProvider, styleVar }
export default styled
