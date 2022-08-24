import {ValidarEsquema} from 'validaresquema'
import { UserSchema } from '../model/user.schema.js'

export async function validateDataUserCreate(req, res, next){
    try {
        let {name,email,password } = req.body 
        const result = ValidarEsquema(UserSchema(name,email,password))
        if (result.Result === 'Errors') throw result.Response
        next()
        return
    } catch (error) {
        res.json({error})
    }
}