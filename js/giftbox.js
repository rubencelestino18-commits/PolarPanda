/*==================================================
                GIFTBOX.JS
==================================================*/

let ocasionSeleccionada = "";
let productosGift = [];

/*==================================================
                INICIAR
==================================================*/

window.addEventListener("DOMContentLoaded", () => {

    actualizarContador();

    iniciarGiftBox();

    actualizarResumenGift();

    actualizarProgreso();

});


/*==================================================
            CONFIGURAR EVENTOS
==================================================*/

function iniciarGiftBox() {

    /* Ocasiones */

    const tarjetas = document.querySelectorAll(".category-card");

    tarjetas.forEach(tarjeta => {

        tarjeta.addEventListener("click", () => {

            tarjetas.forEach(item => item.classList.remove("activa"));

            tarjeta.classList.add("activa");

            ocasionSeleccionada = tarjeta.dataset.ocasion;

            actualizarResumenGift();

            actualizarProgreso();

        });

    });

    /* Productos */

    document.querySelectorAll(".btn-agregar").forEach(boton => {

        boton.addEventListener("click", () => {

            agregarProductoGift(Number(boton.dataset.id));

        });

    });

    /* Dedicatoria */

    const mensaje = document.getElementById("mensajeGift");

    if (mensaje) {

        mensaje.addEventListener("input", () => {

            actualizarResumenGift();

            actualizarProgreso();

        });

    }

}


/*==================================================
            AGREGAR PRODUCTO
==================================================*/

function agregarProductoGift(id) {
    if (!requiereLogin()) return;
    const producto = buscarProducto(id);

    if (!producto) return;

    const existe = productosGift.find(item => item.id === id);

    if (existe) {

        alertaInfo(

            "Producto repetido",

            "Este producto ya está en tu Gift Box 🎁"

        );

        return;

    }

    productosGift.push(producto);

    actualizarResumenGift();

    actualizarProgreso();

}


/*==================================================
            ELIMINAR PRODUCTO
==================================================*/

function eliminarGift(index) {
if (!requiereLogin()) return;
    productosGift.splice(index, 1);

    actualizarResumenGift();

    actualizarProgreso();

}


/*==================================================
            RESUMEN
==================================================*/

function actualizarResumenGift() {

    const lista = document.getElementById("resumen");

    const total = document.getElementById("giftbox-total");

    if (!lista || !total) return;

    const mensaje = document
        .getElementById("mensajeGift")
        .value
        .trim();

    let suma = 0;

    let html = "";

    html += `

        <li class="mb-3">

            <strong>🎉 Ocasión:</strong><br>

            ${ocasionSeleccionada || "<span class='text-muted'>No seleccionada</span>"}

        </li>

    `;

    html += `

        <li class="mb-3">

            <strong>🧸 Productos</strong>

        </li>

    `;

    if (productosGift.length === 0) {

        html += `

            <li class="text-muted">

                Aún no agregas productos.

            </li>

        `;

    }

    productosGift.forEach((producto, index) => {

        suma += producto.precio;

        html += `

        <li class="mb-3">

            <div class="d-flex justify-content-between align-items-center">

                <div>

                    <strong>${producto.nombre}</strong>

                    <br>

                    <small>

                        S/${producto.precio.toFixed(2)}

                    </small>

                </div>

                <button

                    class="btn btn-danger btn-sm"

                    onclick="eliminarGift(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        </li>

        `;

    });

    html += `

        <li class="mt-4">

            <strong>💌 Dedicatoria</strong>

            <p class="mb-0 mt-2">

                ${mensaje || "<span class='text-muted'>Sin dedicatoria</span>"}

            </p>

        </li>

    `;

    lista.innerHTML = html;

    total.innerHTML = `

        <strong>

            ${productosGift.length} producto(s)

        </strong>

        <br>

        Total: S/${suma.toFixed(2)}

    `;

}


/*==================================================
            PROGRESO
==================================================*/

function actualizarProgreso() {

    let progreso = 25;

    if (ocasionSeleccionada !== "") {

        progreso = 50;

    }

    if (productosGift.length > 0) {

        progreso = 75;

    }

    const mensaje = document.getElementById("mensajeGift");

    if (mensaje && mensaje.value.trim() !== "") {

        progreso = 100;

    }

    document.getElementById("barraProgreso").style.width = progreso + "%";

}


/*==================================================
            GUARDAR GIFTBOX
==================================================*/

function guardarGiftBox() {
    if (!requiereLogin()) return;

    if (ocasionSeleccionada === "") {

        alertaError(

            "Falta un paso",

            "Selecciona una ocasión para continuar."

        );

    }

    if (productosGift.length === 0) {

        alertaError(

            "Gift Box vacía",

            "Agrega al menos un producto."

        );

    }

    const mensaje = document
        .getElementById("mensajeGift")
        .value
        .trim();

    const total = productosGift.reduce(

        (suma, producto) => suma + producto.precio,

        0

    );

    const giftBox = {

        id: Date.now(),

        tipo: "giftbox",

        cantidad: 1,

        nombre: "🎁 Gift Box Personalizada",

        ocasion: ocasionSeleccionada,

        mensaje: mensaje,

        productos: [...productosGift],

        precio: total

    };

    agregarGiftBoxCarrito(giftBox);

    alertaExito(

        "🎁 ¡Gift Box creada!",

        "Tu Gift Box personalizada fue agregada al carrito."

    );

    limpiarGiftBox();

}


/*==================================================
            LIMPIAR
==================================================*/

function limpiarGiftBox() {
 if (!requiereLogin()) return;
    productosGift = [];

    ocasionSeleccionada = "";

    document.getElementById("mensajeGift").value = "";

    document

        .querySelectorAll(".category-card")

        .forEach(card => card.classList.remove("activa"));

    actualizarResumenGift();

    actualizarProgreso();

}