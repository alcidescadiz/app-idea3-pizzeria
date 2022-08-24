import jwt from "jsonwebtoken";
import "dotenv/config";
import Service from "../config/services.js"

/**@type {string|any} */
const KEY = process.env.KEY

export async function Auth(req, res, next){
    const {cookie}= req.headers
    if(cookie){
        const variable ={}
        //@ts-ignore: Object is possibly 'null'.
        cookie.split(';').map((e,i)=> {
            if (e.includes("app-pizzeria-token")){
                variable.key = e.split('=')[0],
                variable.token = e.split('=')[1]
            }
        })
        // @ts-ignore
        const {email, password} = jwt.verify(variable.token, KEY);
        const user = await Service.rowTableForTwoWhere('*','email', email, 'password', password, 'users')
        if(email === user[0].email && password === user[0].password) next()
        return
    }
    res.json({error: 'Datos erroneos o no esta registrado'})
}