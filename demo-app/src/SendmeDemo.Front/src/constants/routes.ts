import { Path } from '@zajno/common/structures/path';
import { IssuerName } from './names';

const getDynamicRoute = <P extends Path.BaseInput[]>(...inputs: P) => {
    const builder = Path.construct(...inputs);
    type BuilderFnArg = Parameters<typeof builder['build']>[0];
    const fn = ((args) => builder.build(args, { addStart: true })) as (((args: BuilderFnArg) => string) & { Root: string, Template: string });
    fn.Root = builder.build(undefined, { addStart: true });
    fn.Template = builder.template(':', { addStart: true });
    return fn;
};

export namespace AppRoutes {
    export const Users = getDynamicRoute('users', Path.build`${'name'}`);
    export const Issuer = Users({ name: IssuerName }) as '/users/Issuer';
}
