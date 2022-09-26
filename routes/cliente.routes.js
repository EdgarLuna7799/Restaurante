import routerx from 'express-promise-router';
import clienteController from '../controllers/cliente.controller';

const router=routerx();

router.post('/guardarCliente',clienteController.addCliente);
router.get('/consultarCliente',clienteController.consultarClientes);
router.get('/consultarUnCliente/:id',clienteController.cosultarUnCliente);
router.delete('/eliminarCliente/:id', clienteController.deleteCliente);
router.put('/updateCliente/:id', clienteController.updateCliente);

export default router;