
import { join } from 'Deno/Path';


const
  root = join(Deno.cwd(),'src/client'),
  html = join(root,'html');


export const menu = join(html,'Interface.html');

export const css = join(root,'css');
export const svg = join(root,'svg');
export const js = join(root,'js');
export const board = join(root,'board');
