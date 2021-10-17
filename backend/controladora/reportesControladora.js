const ClientStrategy = require("./Common/ClientStrategy")
const IngresosStrategy = require("./Strategies/IngresosStrategy")

const getIngresos = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())
        let strategy = new IngresosStrategy()
        let reporte = await setStrategyInClient(strategy)
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

const setStrategyInClient = async (strategy) => {
    let reporte
    let client = new ClientStrategy()
    client.setStrategy(strategy)
    client.pipelineCreator(req.query.filtros)
    const aggCursor = await client.execute()
    aggCursor.forEach(prop => reporte = prop)
    return reporte
}

module.exports = {
    getIngresos,
    getActividadServicios,
    getIngresoPropiedades,
    getDuracionServicios,
}