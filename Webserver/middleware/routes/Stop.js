
import { Status } from 'Oak';


export default async (context) => {

    const { response } = context;

    response.status = Status.OK;
    // response.type = 'text/html';
    // response.body = "STOPPING";

    setTimeout(() => {
        Deno.exit();
    },200);
}
