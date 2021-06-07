require('dotenv').config()
const { SubModulo, moduloPrincipal } = require('./modelos/Modulo')
const { submodulos, modulosPrincipales } = require('./data/Modulos')
const Formulario = require('./modelos/Formulario')
const formulariosData = require('./data/Formularios')
const Accion = require('./modelos/Acciones')
const connectDB = require('./config/db')
const accionesData = require('./data/acciones')

connectDB()

const importData = async () => {
    try{
        await moduloPrincipal.deleteMany({})
        await moduloPrincipal.insertMany(modulosPrincipales)
        console.log("Data import success")
        process.exit()
        
    } catch (err) {
        console.error("Data import failed")
        process.exit(1)
    }

}

importData()