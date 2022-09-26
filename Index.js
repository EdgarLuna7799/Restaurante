const express = require('express');
const cors = require('cors');
const morgan = require ('morgan');
const path = require ('path');

//importar multer
const multer = require ('multer');
const uuid = require ('uuid');


//importar las rutas 
import router from './routes';

//importar mongoose
const mongoose = require ('mongoose');  

//conexxion a la bd en mongoDB
mongoose.Promise=global.Promise;


//const dbURL= 'mongodb://localhost:27017/restaurante';  
//const dbURL= 'mongodb+srv://edgarluna:sistemas97@cluster0.vdvs0lb.mongodb.net/restaurante?retryWrites=true&w=majority';

mongoose.connect('mongodb+srv://edgarluna:sistemas97@cluster0.vdvs0lb.mongodb.net/restaurante?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true})
.then(mongoose=>console.log('Conectado al servidor de BD'))
.catch(err=>console.log(err));

//Heredando de las clase express
const app=express();

//Definicion de puerto
app.set('port', process.env.PORT  || 4000);

//Midlewares de conexion HTTP
app.use(morgan("dev"));
app.use(cors());

//Validacion de datos
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

//carga de archivos

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/imagenes')
    },
    filename:(req,file,cb)=>{
        cb(null,uuid()+path.extname(file.originalname))
    }
})

app.use(multer({storage:storage}).single('image'));
   
//Defincion de rutas
app.use('/api',router);

app.listen(app.get('port'),()=>{
    console.log('Servidor se ejecuta en el puerto' +" " +app.get('port'));
});