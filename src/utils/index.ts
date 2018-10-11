import { cloneDeep } from 'lodash';
import * as moment from 'moment';

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

/**
 * 时间格式化
 *
 * @export
 * @param {string} time
 * @returns
 */
export function timeFormat(time: string, format = 'dddd, MMM Do YYYY, HH:mm:ss') {
  return moment(new Date(time).toString()).format(format);
}
