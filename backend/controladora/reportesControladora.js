const ClientStrategy = require("./Common/ClientStrategy")
const IngresosStrategy = require("./Strategies/IngresosStrategy")
const ActividadServiciosStrategy = require('./Strategies/ActividadServiciosStrategy')
const MongoClientCreator = require('./Common/client')

const getIngresos = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())
        let strategy = new IngresosStrategy()
        let reporte = await setStrategyInClient(strategy, req.query.filtros)
        res.json(reporte)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Reportes',
            message: 'Server error'
        })
    }
}

const getActividadServicios = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())
        let strategy = new ActividadServiciosStrategy()
        let reporte = await setStrategyInClient(strategy, req.query.filtros)
        res.json(reporte)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Reportes',
            message: 'Server error'
        })
    }
}

const getIngresoPropiedades = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())
        //Crear strategy acá y pasarla
        //let reporte = await setStrategyInClient()
        res.json({})
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Reportes',
            message: 'Server error'
        })
    }
}

const getDuracionServicios = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())
        //Crear strategy acá y pasarla
        //let reporte = await setStrategyInClient()
        res.json({})
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Reportes',
            message: 'Server error'
        })
    }
}

const noUserMsg = () => {
    return {
        type: 'danger',
        title: 'Reportes',
        message: 'Inicie sesión'
    }
}

const setStrategyInClient = async (strategy, filtros) => {
    let reporte
    let client = new ClientStrategy()
    client.setStrategy(strategy)
    client.pipelineCreator(filtros)
    const aggCursor = await client.execute()
    await aggCursor.forEach(reporteDto => reporte = reporteDto)
    return reporte
}

module.exports = {
    getIngresos,
    getActividadServicios,
    getIngresoPropiedades,
    getDuracionServicios,
}