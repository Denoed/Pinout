
import { Directory } from 'Misc';
import { Status } from 'Oak';



export default async (context) => {

    const { response } = context;

    response.status = Status.OK;
    response.type = 'text/html';

    await context.send({ root: Directory.menu });
}
