import { cloneDeep } from 'lodash'

export function buildTree<T, A>(menu: T[], key: string = 'key', parentKey: string = 'parentKey'): A[] {
  const _menu = cloneDeep(menu)
  const result: any[] = []

  _menu.forEach(i => {
    if (!i[parentKey]) {
      result.push(i)
    }
  })

  _menu.forEach(i => {
    result.forEach(j => {
      if (i[parentKey] === j[key]) {
        if (!j.children) {
          j.children = []
        }
        j.children.push(i)
      }
    })
  })

  return result
}
