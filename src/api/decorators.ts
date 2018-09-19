interface IHtttpDecoratorParams {
  method: string;
  url: string;
}

export const http = (params: IHtttpDecoratorParams): MethodDecorator => (target, propertyKey, descriptor) => {
  const oldVal: any = descriptor.value;
  (descriptor as any).value = (data: any) => {
    const config = {
      method: params.method,
      url: params.url,
      params: data
    };
    const axios: Promise<any> = (target as any).http(config);

    axios
      .then(res => {
        oldVal.call(target, data, res);
      })
      .catch(err => {
        oldVal.call(target, data, err);
      });
  };
};
