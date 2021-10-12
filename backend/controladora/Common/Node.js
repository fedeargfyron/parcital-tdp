let Node = function(nombre, _id, tipo){
    this.nombre = nombre
    this._id = _id
    this.tipo = tipo
    this.children = []
}

Node.prototype = {
    add: function(childs){
        this.children.push(...childs)
    }
}

module.exports = Node