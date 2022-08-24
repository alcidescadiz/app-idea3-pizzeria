import jwt from "jsonwebtoken";
import "dotenv/config";
//import bcrypt from 'bcrypt'
/**@type {any|string} */
const KEY = process.env.KEY;
//import { addUserTable, rowTableForId, rowTableForTwoWhere } from "../config/factory.mysql2.js"
import { addUserTable, rowTableForId, rowTableForTwoWhere } from "../config/factory.postgres.js"


export async function allUsers(req, res){
    try {
        let results = await rowTableForId('users')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}

export async function createUser(req, res){
    try {
        let {name,email,password } = req.body 
        let result = await addUserTable({name,email,password }, 'users')
        // @ts-ignore
        res.json({msg:result})
    } catch (error) {
        res.json({error:[error.message]})
    }
}

export async function verifyLogin(req, res){
    try {
        let {email, password} =req.body
        let results = await rowTableForTwoWhere('*','email', email, 'password', password,'users')
        if (results.length >= 1) {
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