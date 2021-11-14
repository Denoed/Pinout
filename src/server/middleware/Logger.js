
const { log } = console;


export default async (context,next) => {

    const start = Date.now();

    await next();

    const delta = Date.now() - start;

    const { method , url } = context.request;

    log(`{ ${ method } }[ ${ url.pathname } ] in ${ delta }ms`);
}
