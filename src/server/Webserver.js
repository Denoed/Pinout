
import { Vars } from 'Misc';
import { Application } from 'Oak';
import { Error , Logger , Router } from 'Middleware';

const { log } = console;

console.log('\n\n\n\n-------------------------');


const app = new Application;

app.use(Error);
app.use(Logger);
app.use(Router);

const { port } = Vars;

log(`
    Starting with port: ${ port }
`);

await app.listen({ port });
