
import { Router } from 'Oak';
import { Css , Js , Svg , Stop , Board , Index , NotFound } from 'Routes';


const router = new Router;

router.get('/css/:css',Css);
router.get('/js/:js',Js);
router.get('/svg/:svg',Svg);
router.get('/board/:yaml',Board);
router.get('/stop',Stop);
router.get('/favicon.ico',NotFound);
router.get('/',Index);


export default router.routes();
