import models from "../models";

export default{
    addCliente:async(req, res, next)=>{
        try{
            const {nombre,personas,fecha,hora,categoria}=req.body;

            const agregarCliente=new models.Clientes({
                nombre,personas,fecha,hora,categoria
            });
            agregarCliente.filename=req.file.filename;
            agregarCliente.path='public/imagenes/'+req.file.filename;
            
            const guardarCliente=await agregarCliente.save();
            res.status(200).json(guardarCliente);
            console.log(req.body);
        }catch (e){
            res.status(500).send({
                message: "No se encuentra el servidor de BD"
            });
            next(e)
        }
    },

    consultarClientes:async(req, res, next)=>{
        try {
            const consultaCliente=await models.Clientes.find();
            res.json(consultaCliente);
            console.log(consultaCliente);
        } catch (error) {
            res.status(500).send ({
                message:"ocurrio un error al conectar"
            });
            next(error);
        }
    },

    cosultarUnCliente:async(req, res, next)=>{
        try {
            const consultarOneCliente=await models.Clientes.findById(req.params.id);
            if(!consultarOneCliente){
                res.status(404).send({
                    message:"El registro no existe"
                });
            }else{
                res.status(200).json(consultarOneCliente);
            }
        } catch (error) {
            res.status(500).send({
                message:"Ocurrio un error al consultar"
            });
            next(error);
        }
    },

    deleteCliente:async(req, res,next)=>{
        try {
            const eliminar=await models.Clientes.findByIdAndDelete(req.params.id);
            res.status(200).json(eliminar);
        } catch (error) {
            res.status(500).send({
                message:"No se pudo eliminar el dato"
            });
            next(error);
        }
    },
    updateCliente:async(req, res, next)=>{
        try {
            const {nombre,personas,fecha,hora,categoria}=req.body;

            const updateUnCliente={
                nombre,personas,fecha,hora,categoria
            }

            const update=await models.Clientes.findByIdAndUpdate(req.params.id, updateUnCliente);
            res.json({
                message:"datos actualizados correctamente"
            });
            console.log(update);
        } catch (error) {
            res.status(500).send({
                message:"No se pudo actualizar la informacion"
            })
            next(error);
        }
    }
}