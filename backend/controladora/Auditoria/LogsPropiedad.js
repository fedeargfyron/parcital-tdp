const AudPropiedad = require('../../modelos/AudPropiedad')

const LogsPropiedad = (propiedad, tipoPropiedad, usuario, accion) => {
    const audProp = new AudPropiedad({
        propiedad: propiedad._id,
        usuario: usuario,
        accion: accion,
        ubicacion: propiedad.ubicacion,
        dueño: propiedad.dueño,
        tipo: tipoPropiedad.tipo,
        estado: propiedad.estado,
        estado_propiedad: propiedad.estado_propiedad,
        servicios: propiedad.servicios,
        descripcion: propiedad.descripcion,
        entorno: propiedad.entorno,
        imagenes: propiedad.imagenes,
        precio: propiedad.precio,
        superficie: propiedad.superficie,
        latitud: propiedad.latitud,
        longitud: propiedad.longitud,
        cantidad_habitaciones: tipoPropiedad.cantidad_habitaciones,
        piso: tipoPropiedad.piso,
        acceso: tipoPropiedad.acceso,
        cochera: tipoPropiedad.cochera,
        cantidad_baños: tipoPropiedad.cantidad_baños,
        restricciones: tipoPropiedad.restricciones,
        cantidad_pisos: tipoPropiedad.cantidad_pisos,
        antiguedad: tipoPropiedad.antiguedad
    })
    audProp.save()
}

module.exports = LogsPropiedad