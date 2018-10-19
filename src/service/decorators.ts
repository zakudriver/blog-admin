/**
 * http请求前缀
 *
 * @export
 * @param {string} value
 * @returns {ClassDecorator}
 */
export function prefix(value: string): ClassDecorator {
  return target => {
    target.prototype.prefix = value;
  };
}

interface IHtttpDecoratorOptions {
  url: string;
  headers?: { [i: string]: string };
}

const createDecorator = (method: string, options: IHtttpDecoratorOptions): MethodDecorator => (
  target,
  propertyKey,
  descriptor
) => {
  const oldVal: any = descriptor.value;
  (descriptor as any).value = (...args: any[]) => {
    const axiosOpt = {
      method,
      data: method === 'get' ? null : args[0],
      params: method === 'get' ? args[0] : null
    };

    const arg = Object.assign(axiosOpt, options);
    arg.url = (target as any).prefix + arg.url;

    return oldVal.apply(target, [arg, target]);
  };
};

/**
 * @GET({
 *  url:'/user'
 *  header:{}
 * })
 * @param options
 */
export function GET(options: IHtttpDecoratorOptions) {
  const method = 'get';
  return createDecorator(method, options);
}

/**
 * @POST({
 *  url:'/user'
 *  header:{}
 * })
 * @param options
 */
export function POST(options: IHtttpDecoratorOptions) {
  const method = 'post';
  return createDecorator(method, options);
}

/**
 * @PUT({
 *  url:'/user'
 *  header:{}
 * })
 * @param options
 */
export function PUT(options: IHtttpDecoratorOptions) {
  const method = 'put';
  return createDecorator(method, options);
}

/**
 * @DELETE({
 *  url:'/user'
 *  header:{}
 * })
 * @param options
 */
export function DELETE(options: IHtttpDecoratorOptions) {
  const method = 'delete';
  return createDecorator(method, options);
}
