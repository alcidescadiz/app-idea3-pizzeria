export function User([fn]){
    let {status, user:{id,name, email, role}} = fn()
    if (status !== true) {
        window.location.hash= '#login'
        return
    }
    let mainUser = document.createElement('main')
    mainUser.classList.add("container", "pb-5")

    let listInvoiceForUser = ``
    fetch(window.location.origin + `/v1-api/invoice/${id}`)
     .then(res => res.json())
     .then(json => {
        json.msg.map((e,i) => {
            listInvoiceForUser+= `
            <tr>
                <td scope="col">${i+1}</td>
                <td scope="col">${e.date}</td>
                <td scope="col">${e.total}</td>
                <td scope="col"><button id="${e.id}" class="btn btn-sm btn-info">View</button></td>
                <td scope="col">...in process</td>
            </tr>
            `
        })
        // @ts-ignore
        document.getElementById("listInvoiceForUser").innerHTML=  listInvoiceForUser
     })
    let contentUser = `
        <!--- DATOS PERSONALES --->
    <div class="container text-center h2 my-1">
        <div>Nombre: ${name}</div>
        <div>Email: ${email}</div>
        <div>Role: ${role}</div>
    </div>
    <hr>
        <!--- PEDIDOS REALIZADOS --->
    <div>
        <table class="table bg-light table-responsive">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Details</th>
                    <th scope="col">Confirmed</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" id="listInvoiceForUser">
            </tbody>
        </table> 
    </div>
    `
    mainUser.innerHTML = contentUser

    return mainUser
}