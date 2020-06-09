const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//Poderia usar o toggle em uma única vez para add ou remover ao click
buttonSearch.addEventListener("click", () => { 
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})