let keyApiDefault = "";
const promt = "Eres guía turístico, desarrolla un itinerario de viaje, indica el hotel y las actividades precisas a realizar como restaurantes, lugares famosos, etc. en cada día de la semana. No incluyas saludos, despedidas ni comentarios finales en tu respuesta. Destino:";

function validar() {
    document.getElementById("botonPlanear").disabled = true;

    let keyApiTemp = document.getElementById("keyAPI").value;
    if (keyApiTemp == "") {
        if (keyApiDefault == "") {
            document.getElementById("botonPlanear").disabled = false;
            document.getElementById("contenedorErrorKey").hidden = false;
        } else {
            planear();
        }
    } else {
        keyApiDefault = keyApiTemp;
        planear();
    }
}

async function planear() {
    let destino = document.getElementById("inputDestino").value;

    if (destino == "") {
        document.getElementById("contenedorPerdido").hidden = false;
        document.getElementById("botonPlanear").disabled = false;
    } else {
        document.getElementById("contenedorCarga").hidden = false;
        let respuesta = await peticionAChatGPT(destino);

        let htmlAgregar = procesarResultado(respuesta);
        document.getElementById("contenedorPlan").hidden = false;
        let contenedorHTML = document.getElementById("contenedorPlan");
        contenedorHTML.innerHTML = htmlAgregar;

        document.getElementById("botonPlanear").disabled = false;
        document.getElementById("contenedorCarga").hidden = true;
    }
}

async function peticionAChatGPT(destino) {
    const bodyRequest = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promt + destino }],
        temperature: 0.7,
        // max_tokens: 250
    }


    const solicitud = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${keyApiDefault}`
        },
        body: JSON.stringify(bodyRequest),

    }

    const respuesta = await fetch("https://api.openai.com/v1/chat/completions", solicitud);
    const jsonRespuesta = await respuesta.json();
    return jsonRespuesta.choices[0].message.content;
}


function continuar() {
    document.getElementById("contenedorPerdido").hidden = true;
    document.getElementById("contenedorAclaracion").hidden = true;
    document.getElementById("contenedorErrorKey").hidden = true;
}

function aclaracion() {
    document.getElementById("contenedorAclaracion").hidden = false;
}

function procesarResultado(texto) {
    let temp = texto.split("Día 1:");
    texto = temp[1];
    let temp1 = texto.split("Día 2:");
    let dia1 = "<div class='tarjetas'><div class='logos' id='logoDia1'></div><h1>Día 1</h1>" + temp1[0] + "</div>";

    let temp2 = temp1[1];
    temp2 = texto.split("Día 3:");
    let dia2 = "<div class='tarjetas espaciado'><div class='logos' id='logoDia2'></div><h1>Día 2</h1>" + temp2[1] + "</div>";


    let temp3 = temp2[1];
    temp3 = texto.split("Día 4:");
    let dia3 = "<div class='tarjetas espaciado'><div class='logos' id='logoDia3'></div><h1>Día 3</h1>" + temp3[1] + "</div>";


    let temp4 = temp3[1];
    temp4 = texto.split("Día 5:");
    let dia4 = "<div class='tarjetas espaciado'><div class='logos' id='logoDia4'></div><h1>Día 4</h1>" + temp4[1] + "</div>";


    let temp5 = temp4[1];
    temp5 = texto.split("Día 6:");
    let dia5 = "<div class='tarjetas espaciado'><div class='logos' id='logoDia5'></div><h1>Día 5</h1>" + temp5[1] + "</div>";


    let temp6 = temp5[1];
    temp6 = texto.split("Día 7:");
    let dia6 = "<div class='tarjetas espaciado'><div class='logos' id='logoDia6'></div><h1>Día 6</h1>" + temp6[1] + "</div>";


    let temp7 = temp6[1];
    let dia7 = "<div class='tarjetas espaciado'><div class='logos' id='logoDia7'></div><h1>Día 7</h1>" + temp7 + "</div>";

    let htmlAcomodado = dia1 + dia2 + dia3 + dia4 + dia5 + dia6 + dia7;
    return htmlAcomodado;
}