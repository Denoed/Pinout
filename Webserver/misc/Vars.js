
import { parse } from 'Deno/Flags';


const args = parse(Deno.args);

export const port = args.port ?? 7805;
