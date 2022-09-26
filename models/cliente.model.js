import mongoose, {Schema} from "mongoose";

const clientes=new Schema({
    nombre:String,
    personas:Number,
    fecha:String,
    hora:String,
    categoria:String,
    filename:String,
    path:String,
    crearAc: {type:Date, default: Date.now}
});

const Clientes=mongoose.model('clientes',clientes);
export default Clientes;