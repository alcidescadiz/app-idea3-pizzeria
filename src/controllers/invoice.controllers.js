import Service from "../config/services.js"

export async function invoiceForId(req, res){
    try {
        let {id} = req.params
        let results = await Service.rowTableForId(id, 'invoice')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}

export async function invoiceForUser(req, res){
    try {
        let {id_user} = req.params
        let results = await Service.rowTableForIdUser(id_user, 'invoice')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}
export async function allInvoice(req, res){
    try {
        let results = await Service.allRowTable('invoice')
        res.json({msg:results})
    } catch (error) {
        res.json({error:error})
    }
}

export async function createInvoice(req, res){
    try {
        let {id_user, totalList,date,details } = req.body 
        let result = await Service.addInvoiceTable({id_user, totalList,date, details}, 'invoice')
        // @ts-ignore
        res.json({msg:result})
    } catch (error) {
        res.json({error:[error.message]})
    }
}