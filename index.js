let mostrarAmigos = (data) => {
    let ul = document.getElementById("lista")
    ul.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `Amigo: ${data[i].name}`
        $("#lista").append(li)
    };
}

$("#boton").on("click", function(){
    $.get("http://localhost:5000/amigos", mostrarAmigos)
})

$("#search").on("click", function(){
    let input = document.getElementById("input")
    let inputValue = input.value
    let span = document.getElementById("amigo")
    if(inputValue > 0 && inputValue <= 6){
        $.get(`http://localhost:5000/amigos/${inputValue}`, function(data){
            span.innerHTML = `El id buscado corresponde a: ${data.name}`

        })
    }else{
        span.innerHTML = "No existe un amigo con ese id"
    }
    input.value = ""
})

let amigoEliminado = data => {
    let span = document.getElementById("success")
    span.innerHTML = `Se elimino con exito al amigo: ${data.name}`
    /* setTimeout(function(){
        span.innerHTML = "a"
    },2000) */
}

$("#delete").on("click", function(){
    let inputDel = document.getElementById("inputDelete")
    let inputValue = inputDel.value
    
    $.get(`http://localhost:5000/amigos/${inputValue}`, amigoEliminado)
    $.ajax({
        type: "DELETE",
        url: `http://localhost:5000/amigos/${inputValue}`,
        success: (response) => mostrarAmigos(response),
    });
    inputDel.value = ""
})