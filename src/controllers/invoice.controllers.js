//import { addInvoiceTable, allRowTable, rowTableForId, rowTableForIdUser } from "../config/factory.mysql2.js";
import { addInvoiceTable, allRowTable, rowTableForId, rowTableForIdUser } from "../config/factory.postgres.js";


export async function invoiceForId(req, res){
    try {
        let {id} = req.params
        let results = await rowTableForId(id, 'invoice')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}

export async function invoiceForUser(req, res){
    try {
        let {id_user} = req.params
        let results = await rowTableForIdUser(id_user, 'invoice')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}
export async function allInvoice(req, res){
    try {
        let results = await allRowTable('invoice')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}

export async function createInvoice(req, res){
    try {
        let {car,id_user, totalList,date } = req.body 
        let result = await addInvoiceTable({car,id_user, totalList,date}, 'invoice')
        // @ts-ignore
        res.json({msg:result})
    } catch (error) {
        res.json({msg:error})
    }
}