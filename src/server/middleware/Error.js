
export default async ( context , next ) => {
    try { await next(); } catch (error) {
        console.error(error);
        context.throw(404);
    }
}
