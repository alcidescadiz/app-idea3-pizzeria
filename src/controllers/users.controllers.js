import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import "dotenv/config";
//import bcrypt from 'bcrypt'
/**@type {any|string} */
const KEY = process.env.KEY;

import Service from "../config/services.js"


export async function allUsers(req, res){
    try {
        let results = await Service.rowTableForId('users')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}

export async function createUser(req, res){
    try {
        let {name,email,password } = req.body 
        const salt = await bcrypt.genSalt(8);
        const passwordCode= await bcrypt.hash(password, salt);
        let result = await Service.addUserTable({name,email,password:passwordCode }, 'users')
        // @ts-ignore
        res.json({msg:result})
    } catch (error) {
        res.json({error:[error.message]})
    }
}

export async function verifyLogin(req, res){
    try {
        let {email, password} =req.body
        let results = await Service.rowTableForOneWhere('*','email', email,'users')
        if (results.length >= 1 && results[0].email === email) {
            const passwordCompare = await bcrypt.compare(password, results[0].password)
            if (!passwordCompare) throw "Clave no valida"
            const token = jwt.sign(results[0], KEY, { expiresIn: "48h" });
            const [{id,name, email, role}] = results
            res.cookie("app-pizzeria-token", token, {expires: new Date(Date.now() + 60 * 60 * 60 * 24 * 2)})
               .status(200)
               .json({msg:[{id,name, email, role}]})
            return
        } else {
            throw "Error en los datos";
        }
    } catch (error) {
        res.json({error:[error]})
    }
}