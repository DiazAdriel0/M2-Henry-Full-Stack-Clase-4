let mostrarAmigos = (data) => {
    //let ul = document.getElementById("lista")
    //ul.innerHTML = ""
    let ul = $("#lista")
    ul.empty()
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li")
        li.innerText = `Amigo: ${data[i].name}`
        ul.append(li)
    };
}

$("#boton").on("click", function(){
    $.get("http://localhost:5000/amigos", mostrarAmigos)
})

$("#search").on("click", function(){
    //let input = document.getElementById("input")
    //let inputValue = input.value
    let inputValue = $("#input").val()
    //let span = document.getElementById("amigo")
    input.value = ""
    if(inputValue > 0 && inputValue <= 6){
        $.get(`http://localhost:5000/amigos/${inputValue}`, function(data){
            $("#amigo").html(`El id buscado corresponde a: ${data.name}`)
            //span.innerText = `El id buscado corresponde a: ${data.name}`

        })
    }else{
        //span.innerHTML = "No existe un amigo con ese id" 
        $("#amigo").html("No existe un amigo con ese id")
    }
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
    inputDel.value = ""
    
    $.get(`http://localhost:5000/amigos/${inputValue}`, amigoEliminado)
    $.ajax({
        type: "DELETE",
        url: `http://localhost:5000/amigos/${inputValue}`,
        success: (response) => mostrarAmigos(response),
    });
})