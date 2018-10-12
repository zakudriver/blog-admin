import { cloneDeep } from 'lodash';

/**
 * 生成菜单树
 *
 * @export
 * @template T
 * @template A
 * @param {T[]} menu
 * @param {string} [key='key']
 * @param {string} [parentKey='parentKey']
 * @returns {A[]}
 */
export function buildTree<T, A>(menu: T[], key: string = 'key', parentKey: string = 'parentKey'): A[] {
  const _menu = cloneDeep(menu);
  const result: any[] = [];

  _menu.forEach(i => {
    if (!i[parentKey]) {
      result.push(i);
    }
  });

  _menu.forEach(i => {
    result.forEach(j => {
      if (i[parentKey] === j[key]) {
        if (!j.children) {
          j.children = [];
        }
        j.children.push(i);
      }
    });
  });

  return result;
}

/**
 * 多重继承
 *
 * @export
 * @param {*} derivedCtor
 * @param {any[]} baseCtors
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

/**
 * 数组移动项
 *
 * @export
 * @param {any[]} source
 * @param {number} from
 * @param {number} to
 * @returns
 */
export function moveArrayItem(source: any[], from: number, to: number) {
  source = cloneDeep(source);
  const target = source.splice(from, 1)[0];
  source.splice(to, 0, target);
  return source;
}

const weekMap = new Map([[0, 'Sun'], [1, 'Mon'], [2, 'Tues'], [3, 'Wed'], [4, 'Thur'], [5, 'Fri'], [6, 'Sat']]);
/**
 * 时间格式化
 * return MMM Do YYYY, HH:mm:ss
 * @param {string} dateStr
 * @param {boolean} [isWeek=true]
 * @returns
 */
export function formatDateTime(dateStr: string, isWeek = true) {
  const date = new Date(dateStr);

  const y = date.getFullYear();
  let m: number | string = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d: number | string = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h: number | string = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute: number | string = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  let second: number | string = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  let w: number | string = date.getDay();
  w = weekMap.get(w)!;
  return `${isWeek ? w + ', ' : ''}${y}-${m}-${d} ${h}:${minute}:${second}`;
}
