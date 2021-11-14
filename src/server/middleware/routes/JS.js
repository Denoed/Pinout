
import { Regex , Directory } from 'Misc';
import { Status } from 'Oak';

const { js } = Regex;

export default async (context) => {

    const { request , response } = context;
    const { pathname } = request.url;

    if(!js.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'text/javascript';

    await context.send({
        root: Directory.js,
        path: pathname.slice(4)
    });
}
