const AudLog = require('../../modelos/AudLog')

const LogsUsuario = (idUsuario, accion) => {
    const audLog = new AudLog({
        accion: accion,
        usuario: idUsuario,
    })
    audLog.save()
}

module.exports = LogsUsuario