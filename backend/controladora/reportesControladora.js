const ClientStrategy = require("./Common/ClientStrategy")
const IngresosStrategy = require("./Strategies/IngresosStrategy")
const ActividadServiciosStrategy = require('./Strategies/ActividadServiciosStrategy')
const DuracionServiciosStrategy = require('./Strategies/DuracionServiciosStrategy')
const IngresoPropiedadesStrategy = require('./Strategies/IngresoPropiedadesStrategy')
const moment = require('moment')
moment().format()

const getIngresos = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())
        let strategy = new IngresosStrategy()
        let reporteDto = await setStrategyInClient(strategy, req.query.filtros)
        
        let reporte = []
        if(!reporteDto.datos[0].ventas){
            return res.json(reporte)
        }
        reporte = sortDates(reporteDto.datos[0].ventas, reporteDto.datos[1].sueldo)
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

const sortDates = (ventas, sueldos) => {
    let currentDate = moment(ventas[0].fecha)
    let lastDate = {
        ingreso: 0
    }
    let endDate = moment(ventas[ventas.length - 1].fecha).add(1, 'month')
    let reporte = []

    while (currentDate.isBefore(endDate)) {
        let dateNowObject = {
            fecha: currentDate.format("YYYY-MM"),
            ingreso: lastDate.ingreso - sueldos
        }
        let fechasCoincidentes = ventas.filter(x => x.fecha == currentDate.format("YYYY-MM") && x.ingreso)
        if(fechasCoincidentes.length > 0){
            fechasCoincidentes.forEach(x => {
                dateNowObject.ingreso += x.ingreso
            })
        }
        reporte.push(dateNowObject)
        lastDate = dateNowObject
        currentDate.add(1, 'month');
    }

    return reporte
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
        let strategy = new IngresoPropiedadesStrategy()
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

const getDuracionServicios = async (req, res) => {
    try {
        if(!req.user)
            return res.send(noUserMsg())

        let strategy = new DuracionServiciosStrategy()
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