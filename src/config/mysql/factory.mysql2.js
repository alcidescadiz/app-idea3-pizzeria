import {cnx} from './connect-mysql.js'


async function allRowTable(table){
    let [rows,fields] = await cnx.promise().query(`SELECT * FROM ${table}`);
    return rows
}

async function rowTableForIdUser(id_user, table){
    let [rows,fields] = await cnx.promise().query(`SELECT * FROM ${table} WHERE id_user=?`,[id_user]);
    return rows
}
async function rowTableForId(id, table){
    let [rows,fields] = await cnx.promise().query(`SELECT * FROM ${table} WHERE id=?`,[id]);
    return rows
}
async function rowTableForOneWhere(filds, field1, value1, table){
    try {
        let [rows,fields] = await cnx.promise().query(`SELECT ${filds} FROM ${table} WHERE ${field1}=?`,[value1])
        return rows
    } catch (error) {
        return error
    }
}
async function rowTableForTwoWhere(filds, field1, value1, field2, value2, table){
    let [rows,fields] = await cnx.promise().query(`SELECT ${filds} FROM ${table} WHERE ${field1}=? AND ${field2}=?`,[value1, value2]);
    return rows
}

async function addInvoiceTable({car,id_user,totalList,date},table){
    let [rows,fields] = await cnx.promise().query(`INSERT INTO ${table} (id, id_user, total, date, details) VALUES (NULL, ${id_user}, '${totalList}', '${date}','${JSON.stringify(car)}')`);
    // @ts-ignore
    return rows.affectedRows
}

async function addUserTable({name,email,password },table){
    let [rows,fields] = await cnx.promise().query(`INSERT INTO ${table} (id, name, email, password, role) VALUES (NULL, '${name}', '${email}','${password}','client')`);
    // @ts-ignore
    return rows.affectedRows
}

export default  {
    allRowTable,
    rowTableForIdUser,
    rowTableForId,
    rowTableForOneWhere,
    rowTableForTwoWhere,
    addInvoiceTable,
    addUserTable
}