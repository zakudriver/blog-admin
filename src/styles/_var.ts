import { globalStore } from '@/store'

const { theme } = globalStore.webConfig

export interface IStyleInterface {
  primaryColor: string
}

export const styleVar = {
  primaryColor: theme.primaryColor
}
