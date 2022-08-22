//import { addUserTable, allRowTable,  rowTableForTwoWhere } from "../config/factory.mysql2.js"
import { addUserTable, allRowTable,  rowTableForTwoWhere } from "../config/factory.postgres.js"


export async function allUsers(req, res){
    try {
        let results = await allRowTable('users')
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
        res.json({msg:error})
    }
}

export async function verifyLogin(req, res){
    try {
        let {email, password} =req.body
        let results = await rowTableForTwoWhere('id, name, email, role','email', email, 'password', password,'users')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}