//Prueba de crear y exportar un módulo
exports.caraOCruz = function () {
    return "Tiraste y salio: " + (Math.round(Math.random()) == 1 ? 'Cara' : 'cruz');
}