
import { join , dirname , fromFileUrl } from 'Deno/Path';


const
    root = join(dirname(fromFileUrl(import.meta.url)),'..','..','Interface'),
    html = join(root,'html');

console.log(`Running from: ${ root }`);

export const menu = join(html,'Interface.html');

export const css = join(root,'css');
export const svg = join(root,'svg');
export const js = join(root,'js');
export const board = join(root,'board');
