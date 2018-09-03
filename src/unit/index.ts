import { cloneDeep } from 'lodash';

export function buildTree<T, A>(menu: T[]): A[] {
  let _menu = cloneDeep(menu);
  let result: any[] = [];

  _menu.forEach(i => {
    if (!i['parentKey']) {
      result.push(i);
    }
  });

  _menu.forEach(i => {
    result.forEach(j => {
      if (i['parentKey'] === j['key']) {
        if (!j.children) {
          j.children = [];
        }
        j.children.push(i);
      }
    });
  });

  return result;
}
