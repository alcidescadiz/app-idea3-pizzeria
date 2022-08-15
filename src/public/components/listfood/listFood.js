export function ListFood([fn]) {
    let divList = document.createElement('div')
    let contentList = `
        listado de productos
    `
    divList.innerHTML = contentList
    return divList
}