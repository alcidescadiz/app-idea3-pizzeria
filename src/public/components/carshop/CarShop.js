export function CarShop([fn, messageForm]){
    let {status, car, user} = fn()
    if (status !== true) {
        window.location.hash= '#login'
        return
    }
    let mainCarShop = document.createElement('main')
    mainCarShop.classList.add('car-shop', "pb-5", "container")
    let totalList = ()=> car.reduce((a,e) => a +(e.price * e.quantity),0)
    let listCardShop = ()=>{
        let gererateListCardShop =  car.map((e,i)=>{
            return `<tr>
                        <td>${i+1}</td>
                        <td>${e.id}</td>
                        <td>${e.name}</td>
                        <td>${e.price}</td>
                        <td>${e.quantity}</td>
                        <td>${e.price * e.quantity}</td>
                        <td>
                            <button id="${i}" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>`
        }).join('')
        let totalListCardShop = `
            <tr class="table-group-divider">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><b>Total</b></td>
                <td>${totalList() || 0}</td>
            </tr>
        `
        // @ts-ignore
        document.getElementById("tableCarShop").innerHTML = gererateListCardShop + totalListCardShop
    }
    
    let contentCarShop = `
    <div class="text-center text-white display-5">Pedido a realizar: </div>
    <br>
    <div class="text-center text-white h5">${new Intl.DateTimeFormat('es').format(new Date())} </div>
    <br>
    <!--- Tabla Pedido --->  
    <div>
        <table class="table bg-light table-responsive">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id Producto</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Accions</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" id="tableCarShop">
                
            </tbody>
        </table> 
    </div> 
    <buttom class="btn btn-primary" id="addBuyToConfirm"> Realizar pedido </buttom>
    `
    
    setTimeout(()=>{
        listCardShop()
        document.getElementById("tableCarShop")?.addEventListener("click", e=>{
            // @ts-ignore
            if(e.target.innerHTML === "Delete"){
                // @ts-ignore
                car.splice(e.target.id,1)
                listCardShop()
                setTimeout(()=>{
                    messageForm(['Modificación realizada'], "alert-info")
                },100)
            }
            e.stopImmediatePropagation()
        })
        document.getElementById("addBuyToConfirm")?.addEventListener("click", e =>{
            let dataToConfirm = {
                car, totalList: totalList(),
                id_user: user.id,
                date: new Intl.DateTimeFormat('es').format(new Date())
            }
            if (dataToConfirm.totalList === 0){
                setTimeout(()=>{
                    messageForm(['No tiene pedidos a realizar'], "alert-info")
                },100)
                return
            }
            fetch(window.location.origin + "/v1-api/invoice",{
                body: JSON.stringify(dataToConfirm),
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                }
            }) 
            .then((res) => res.json())
            .then((json) => {
              if(json.msg === 1){
                fn({car:[]})
                window.location.hash= '#'
                setTimeout(()=>{
                    messageForm(['En minutos su pedido será procesado para confirmarse'])
                  },100)
              }
            });
        })
    },10)

    mainCarShop.innerHTML = contentCarShop
    return mainCarShop
}