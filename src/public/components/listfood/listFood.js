'use strict'
// @ts-check
let products = [
  {
    id:1,
    name: "agua",
    type:"bebidas",
    price:1,
    img:"./images/agua.jpg"
  },
  {
    id:2,
    name: "almendrado",
    type:"postres",
    price:6,
    img:"./images/almendrado.jpg"
  },
  {
    id:3,
    name: "bombones",
    type:"postres",
    price:1.5,
    img:"./images/bombones.jpg"
  },
  {
    id:4,
    name: "cerveza",
    type:"bebidas",
    price:5,
    img:"./images/cerveza.jpg"
  },
  {
    id:5,
    name: "empanada de atun",
    type:"empanadas",
    price:4,
    img:"./images/empanada_atun.jpg"
  },
  {
    id:6,
    name: "empanada de carne",
    type:"empanadas",
    price:3,
    img:"./images/empanada_carne.jpg"
  },
  {
    id:7,
    name: "empanada de jamon y queso",
    type:"empanadas",
    price:3,
    img:"./images/empanada_jamonyqueso.jpg"
  },
  {
    id:8,
    name: "gaseosa",
    type:"bebidas",
    price:2,
    img:"./images/gaseosa.jpg"
  },
  {
    id:9,
    name: "helado",
    type:"postres",
    price:3,
    img:"./images/helado.jpg"
  },
  {
    id:10,
    name: "jamon y morron",
    type:"pizzas",
    price:9,
    img:"./images/jamonymorron.jpg"
  },
  {
    id:11,
    name: "pizza muzzarella",
    type:"pizzas",
    price:9,
    img:"./images/muzzarella.jpg"
  },
  {
    id:12,
    name: "pizza napolitana",
    type:"pizzas",
    price:9,
    img:"./images/napolitana.jpg"
  },

]

let typeProducts = [
  {
    id:1,
    type: "bebidas"
  },
  {
    id:2,
    type:"empanadas"
  },
  {
    id:3,
    type:"pizzas"
  },
  {
    id:4,
    type:"postres"
  },
  {
    id:5,
    type:"all"
  }
]


export function ListFood([fn,messageForm]) {
    let mainList = document.createElement('main')
    mainList.classList.add('categories', "pb-5", "container")
    
    let CardProducts = (products)=> {
      let cardsHtml = products.map(e =>{
      return `<div class="col">
                <div class="card m-1 p-1 text-black" id="product-${e.id}}">
                  <img src="${e.img}" class="img-thumbnail " alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${e.name.toLocaleUpperCase()}</h5>
                    <p class="card-text">Type: ${e.type}</p>
                    <p class="card-text"><small class="text-muted">Price: ${e.price}</small></p>
                  </div>
                  <button type="button" 
                    class="btn btn-success" 
                    id="id=${e.id};name=${e.name};price=${e.price}"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalAddToCar">
                     Add to car 🛒
                  </button>
                </div>
              </div>`

    }).join('')
    return cardsHtml
  }
  let bottonTypesProducts = (types) => {
    let typeHTML = types.map(e => {
      return `
      <div class="col">
        <div class="p-3 rounded border border-5 bg-light">${e.type.toLocaleUpperCase()}</div>
      </div>
      `
    }).join('')
    return typeHTML
  }

    let contentList = `
    <div class="text-white text-center display-3">
      ¿Qué desea solicitar?
    </div>
      <!--- categorias --->
          <div class="text-black text-center">
            <div class="row  g-3 g-sm-3 m-auto" id="categorias">
             ${bottonTypesProducts(typeProducts)}
            </div>
          </div>
      
      <!--- listado de productos --->
      <hr>
        <div  class="my2">
          <div class="row row-cols-sm-3 " id="listProducts">
            ${CardProducts(products)}
          </div>
        </div>
      
    <!-- Modal -->
    <div class="modal fade text-black" id="modalAddToCar" tabindex="-1" aria-labelledby="modalAddToCarLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAddToCarLabel">Determine la cantidad que desea:</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-black" id="addQuantityToCar">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="inputAddToCarShop" data-bs-dismiss="modal">Add to CarShop</button>
          </div>
        </div>
      </div>
    </div>
    `
    setTimeout(function(){
      // @ts-ignore ---> ADD TO CARSHOP
      document.getElementById("inputAddToCarShop").addEventListener("click", e => {
        if(fn().status !== true){
          window.location.hash= '#login'
          setTimeout(()=>{
            messageForm(['Debe estar registrado para realizar pedidos'], "alert-danger")
          },100)
          return
        }
        let data = {
          id: document.getElementById("modal-id-producto")?.innerHTML ,
          name:document.getElementById("modal-name-producto")?.innerHTML ,
          price:document.getElementById("modal-price-producto")?.innerHTML,
          // @ts-ignore
          quantity: document.getElementById("quantity").value
         }
        if (data.quantity <= 0) {
          setTimeout(()=>{
            messageForm(['Debe indicar la cantidad del producto'], "alert-danger")
          },100)
          return
        }
        fn().car.push(data)
        setTimeout(()=>{
          messageForm([`Añadido el producto: ${data.name}, la cantidad de: ${data.quantity}`])
        },100)
        e.stopImmediatePropagation()
      })
      // @ts-ignore ---> MODAL
      document.getElementById("listProducts").addEventListener("click", e =>{
        // @ts-ignore
        if(e.target.innerHTML.trim() ==="Add to car 🛒"){
          let dataCard={}; 
          // @ts-ignore
          e.target.id.split(';').map(i=> i.split("=")).map(e=>{
            return dataCard[e[0]] = e[1]
          })
          let addQuantutyToModal = `
          <p>Codigo producto: <b id="modal-id-producto">${dataCard.id} </b></p>
          <p>Nombre del producto: <b id="modal-name-producto">${dataCard.name.toUpperCase()}</b> </p>
          <p>Precio: <b id="modal-price-producto">${Number(dataCard.price).toFixed(2)}</b> </p>
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="quantity" class="col-form-label">Cantidad</label>
            </div>
            <div class="col-auto">
              <input type="number" id="quantity" class="form-control" aria-describedby="Indique la cantidad">
            </div>
          </div>
          `
          // @ts-ignore
          document.getElementById("addQuantityToCar").innerHTML=addQuantutyToModal
        }
        e.stopImmediatePropagation()
      })
      // @ts-ignore ---> FILTRO POR CATEGORIAS
      document.getElementById("categorias").addEventListener("click", e => {
        // @ts-ignore
        let selector = e.target.innerHTML.toLowerCase()
        if (selector.length > 15) return
        if (selector === "all"){
          // @ts-ignore
          document.getElementById("listProducts").innerHTML = CardProducts(products)
          return
        }
        let cardFilter = products.filter(e => e.type === selector)
        // @ts-ignore
        document.getElementById("listProducts").innerHTML = CardProducts(cardFilter)
      })
    }, 100)
    mainList.innerHTML = contentList
    return mainList
}
