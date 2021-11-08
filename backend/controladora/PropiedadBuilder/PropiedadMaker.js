function PropiedadMaker(body){
    this.body = body
    this.construct = function(builder){
        builder.step1()
        builder.step2(this.body)
        return builder.get()
    }
}

module.exports = PropiedadMaker
