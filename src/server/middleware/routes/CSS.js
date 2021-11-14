
import { Regex , Directory } from 'Misc';
import { Status } from 'Oak';

const { css } = Regex;


export default async (context) => {

    const { request , response } = context;
    const { pathname } = request.url;

    if(!css.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'text/css';

    await context.send({
        root: Directory.css,
        path: pathname.slice(5)
    });
}
