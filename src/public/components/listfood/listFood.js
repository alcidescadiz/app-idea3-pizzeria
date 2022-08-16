export function ListFood([fn]) {
    let divList = document.createElement('div')
    let contentList = `
    <!--- categorias --->

    <!--- listado de productos --->
    `
    divList.innerHTML = contentList
    return divList
}