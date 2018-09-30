console.log('soy el cliente de mongo')
const mongoose = require('mongoose');
const url='mongodb://luisabaunza:master01@ds211143.mlab.com:11143/polonia_api';
mongoose.connect(url,{
    useNewUrlParser: true,
    },()=>{
    console.log("conexion exitosa con la base de datos ")
});


const Schema= mongoose.Schema
const ObjectId=mongoose.Schema.ObjectId

const alumnoSchema= Schema({
    alumno : ObjectId,
    nombre: String,
    apellidos: String,
    edad:{type: Number}, //Number
    sexo: String,
    curso: {
        type:ObjectId,
        ref: 'Curso'
        }
})

const cursoSchema= Schema({
    curso: ObjectId,
    nombre: String,
    descripcion: String,
    precio: Number


})

const Alumno = mongoose.model('Alumno',alumnoSchema)

const Curso = mongoose.model('Curso',cursoSchema)

module.exports={Alumno,Curso}



//module.exports= "Soy el objeto module exports!!";