import axios from './index';

interface IHtttpDecoratorOptions {
  url: string;
  headers?: any;
}

export const httpDecorator = (method: string, options: IHtttpDecoratorOptions): MethodDecorator => (
  target,
  propertyKey,
  descriptor
) => {
  const oldVal: any = descriptor.value;
  (descriptor as any).value = (...args: any[]) => {
    const axiosOpt = {
      method,
      url: options.url,
      data: method === 'get' || 'delete' ? {} : args[0],
      params: method === 'get' || 'delete' ? args[0] : {}
    };

    axios(axiosOpt)
      .then(res => {
        args[0] = res;
        oldVal.apply(target, args);
      })
      .catch(err => {
        args[0] = err;
        oldVal.apply(target, args);
      });
  };
};

const buildDecorator = (method: string, options: IHtttpDecoratorOptions): MethodDecorator => (
  target,
  propertyKey,
  descriptor
) => {
  const oldVal: any = descriptor.value;
  (descriptor as any).value = (...args: any[]) => {
    const axiosOpt = {
      method,
      data: method === 'get' || 'delete' ? {} : args[0],
      params: method === 'get' || 'delete' ? args[0] : {}
    };

    const arg = Object.assign(axiosOpt, options);

    return oldVal.apply(target, [arg, target]);
  };
};


export function GET(options: IHtttpDecoratorOptions) {
  const method = 'get';
  return buildDecorator(method, options);
}
