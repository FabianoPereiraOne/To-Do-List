var nameButtons = JSON.parse(localStorage.getItem("buttons") || "[]")
const asideLeft = document.querySelector(".list-group")
const asideRight = document.querySelector(".tab-content")
const newList = document.getElementById("new")
const website = document.getElementById("website-header")
const removeList = document.getElementById("remove")
const adicionar = document.getElementById("add")
var nota = []
var c = 0
var pagesFromPainel

createPainel = () =>{
    pagesFromPainel = []

    // criar os paneis de texto
    pagesFromPainel[c] = document.createElement("div")
    pagesFromPainel[c].classList.add("tab-pane")
    pagesFromPainel[c].classList.add("fade")
    pagesFromPainel[c].id = `page-link${c}`
    if(c == 0){
        pagesFromPainel[c].classList.add("show")
        pagesFromPainel[c].classList.add("active")
    }

    // adicionar os botoes criados na tela
    asideRight.appendChild(pagesFromPainel[c])
    console.log("Painel criado")
    getAddItens()
}
createButtons = () =>{
    let grupoButtons = []

    // criar os botoes com os nomes adicionados no nameButtons
    grupoButtons[c] = document.createElement("a")
    grupoButtons[c].classList.add("list-group-item")
    grupoButtons[c].classList.add("bg-info")
    grupoButtons[c].classList.add("list-group-item-action")
    grupoButtons[c].classList.add("mb-2")
    grupoButtons[c].classList.add("rounded")
    grupoButtons[c].href = `#page-link${c}`
    grupoButtons[c].setAttribute("data-toggle","list")
    grupoButtons[c].classList.add("text-white")
    grupoButtons[c].innerHTML = nameButtons[c]
    grupoButtons[c].style.width = "90%"
    grupoButtons[c].id = `btn${c}`
    grupoButtons[c].setAttribute("data-nome",nameButtons[c])
    grupoButtons[c].setAttribute("data-number",c)

    grupoButtons[c].onclick = () =>{
        let nome = event.target.dataset.nome
        let num = event.target.dataset.number

        localStorage.setItem("ListaAtiva",nome)
        localStorage.setItem("NumListaAtiva",num)
    }
    if(c == 0){
        grupoButtons[c].classList.add("active")
    }

    // adicionar os botoes criados na tela
    asideLeft.appendChild(grupoButtons[c])
    createPainel()
    c++
}
getAddItens = () =>{
    console.log("Função adicionar ativa")
    adicionar.onclick = () =>{
        let item = document.getElementById("text")

        if(item.value == 0 || item.value == null){
            alert("[erro] Não foi possivel adicionar esse item!")
        }else{
            let pos = localStorage.getItem("NumListaAtiva")

            localStorage.setItem(nameButtons[pos],item)
            addItemToList()
        }
    }
}
addItemToList = () =>{

    for(let c = 0; c < nameButtons.length; c++) {
        let ItensButton = []
        ItensButton = localStorage.getItem("buttons")

        console.log(ItensButton[c])

        /*for (let i = 0; i < obj.value.length; i++) {
            pagesFromPainel[c].innerHTML =`
                <p>${ItensButton[i]}<p>
            `
        }*/
        
    }
     
}
deleteButton = () =>{
    var obj = prompt("Qual lista deseja remover?")

    if(obj == ""){
        alert("Não é possivel excluir uma lista sem nome!")
    }else{
        if(nameButtons.indexOf(obj) == -1){
            alert("Essa lista ainda não foi criada!")
        }else{
            // Delete elemento do localStorage
            let pos = nameButtons.indexOf(obj)
            nameButtons.splice(pos,1)

            localStorage.setItem("buttons",JSON.stringify(nameButtons))

            document.getElementById(`btn${pos}`).remove()

            window.location.reload()
        }
    }
}
getNameButtons  = () =>{
    // Verificação do nome da lista e salva no locaStorage
    let name = prompt("Qual o nome da lista que deseja adicionar?")

    if(name != null){
        if(name.length == 0){
            alert("[erro] Nao foi possivel criar uma lista com nome vazio!")
        }else{
            if(name.length > 20){
                alert("[erro] maximo de caracteres 20!")
            }else{
                if(nameButtons.indexOf(name) != -1){
                    alert("[erro] Já existe uma lista com esse nome!")
                }else{
                    nameButtons.push(name)
                    localStorage.setItem("buttons", JSON.stringify(nameButtons))
                    createButtons()
                }
            } 
        }
    }else{

    }
}

iniciar = () =>{
    if(nameButtons != ""){
        while (c < nameButtons.length) {
            createButtons()
        }
        newList.onclick = () => getNameButtons()
        removeList.onclick = ()=> deleteButton()
        adicionar.onclick = () => addItemToList()
    }else{
        newList.onclick = () => getNameButtons()
        removeList.onclick = ()=> deleteButton()
    }
}
iniciar()