
// decorator for AppController instance getters that will prevent reading a value if the AppController instance is disposed
export function Guard<T, TController extends { readonly isDisposed: boolean }>(_target: TController, _propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    const original = descriptor.get;
    descriptor.get = function (this: TController, ...args: []) {
        if (this.isDisposed) {
            throw new Error('AppController is disposed, its properties should not be accessed. This error means there\'s probably a memory leak in the code.');
        }
        // eslint-disable-next-line prefer-rest-params
        return original?.apply(this, args);
    } as (() => T);
    return descriptor;
}
