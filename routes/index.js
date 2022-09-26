import routerx from 'express-promise-router';
import clienteRoutes from './cliente.routes';
const router=routerx();

router.use('/cliente',clienteRoutes);

export default router;
  