//Autenticación & control de acceso
//Token: Código alfanumérico. Digitos que cambian cada cierto tiempo/expira. 2do factor de auth. Se genera con una nueva sesión
//Si no paso el token a lso endpoints privados, no voy a poder seguir trabajando
const jwt = require('jsonwebtoken')

const verify = (req, res, next) => { //Uso lo pasado mediante el endpoint. Si coincide, paso el next. Sino devuelvo res con error

    try {
        const decode = jwt.verify(req.headers.Authorization, 'secret-key');
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send('No autorizado')
    }
}

module.exports = { verify }