
import { Regex , Directory } from 'Misc';
import { Status } from 'Oak';

const { board } = Regex;


export default async (context) => {

    const { request , response } = context;
    const { pathname } = request.url;

    if(!board.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'text/yaml';

    const path = pathname
        .slice(6)
        .replaceAll('%20',' ');

    await context.send({ path , root: Directory.board });
}
