//Autenticación & control de acceso
//Token: Código alfanumérico. Digitos que cambian cada cierto tiempo/expira. 2do factor de auth. Se genera con una nueva sesión
//Si no paso el token a lso endpoints privados, no voy a poder seguir trabajando
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const verify = (req, res, next) => { //Usar token pasado mediante el endpoint /auth/login . Si coincide, pasa el next. Sino devuelvo res con error

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.TOKEN_KEY);
        next();
    } catch (err) {
        res.status(401).send({ message: 'No autorizado' })
    }
}

module.exports = { verify }