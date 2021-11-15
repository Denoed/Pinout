
import { Regex , Directory } from 'Misc';
import { Status } from 'Oak';

const { svg } = Regex;


export default async (context) => {

    const { request , response } = context;
    const { pathname } = request.url;

    if(!svg.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'image/svg+xml';

    const path = pathname
        .slice(5)
        .replaceAll('%20',' ');

    await context.send({ path , root: Directory.svg });
}
