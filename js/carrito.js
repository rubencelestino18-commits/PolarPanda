/*==================================================
                CARRITO.JS
==================================================*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


/*==================================================
                GUARDAR
==================================================*/

function guardarCarrito() {

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

}


/*==================================================
                BUSCAR PRODUCTO
==================================================*/

function buscarProducto(id) {

    return productos.find(

        producto => producto.id === id

    );

}


/*==================================================
            AGREGAR PRODUCTO
==================================================*/

function agregarCarrito(id) {

    if (!requiereLogin()) return;

    const producto = buscarProducto(id);

    if (!producto) {

        return;

    }

    const existe = carrito.find(

        item => item.id === id && item.tipo !== "giftbox"

    );

    if (existe) {

        existe.cantidad++;

    }

    else {

        carrito.push({

            id: producto.id,

            cantidad: 1

        });

    }

    guardarCarrito();

    actualizarContador();

    renderizarCarrito();

    alertaToast(

        "success",

        `${producto.nombre} agregado al carrito 🛍`

    );

}
/*==================================================
            AGREGAR GIFT BOX
==================================================*/

function agregarGiftBoxCarrito(giftBox) {

    if (!requiereLogin()) return;

    carrito.push(giftBox);

    guardarCarrito();

    actualizarContador();

    renderizarCarrito();

    alertaToast(

        "success",

        "Gift Box agregada al carrito 🎁"

    );

}
/*==================================================
                ELIMINAR PRODUCTO
==================================================*/

function eliminarProducto(id) {
 if (!requiereLogin()) return;
    carrito = carrito.filter(item => {

        return !(item.id === id && item.tipo !== "giftbox");

    });

    guardarCarrito();

    actualizarContador();

    renderizarCarrito();

    alertaToast(

    "info",

    "Producto eliminado del carrito 🗑️"

);

}


/*==================================================
                ELIMINAR GIFT BOX
==================================================*/

function eliminarGiftBox(id) {

    if (!requiereLogin()) return;

    carrito = carrito.filter(item => {

        return item.id !== id;

    });

    guardarCarrito();

    actualizarContador();

    renderizarCarrito();

alertaToast(
    "info",
    "Gift Box eliminada 🗑️"
);

}

/*==================================================
            CANTIDAD DEL CARRITO
==================================================*/

function cantidadCarrito() {

    return carrito.reduce((total, item) => {

        return total + (item.cantidad || 1);

    }, 0);

}


/*==================================================
            CONTADOR
==================================================*/

function actualizarContador() {

    const contador = document.getElementById("contador-carrito");

    if (!contador) {

        return;

    }

    contador.textContent = cantidadCarrito();

}


/*==================================================
                TOTAL
==================================================*/

function totalCarrito() {

    let total = 0;

    carrito.forEach(item => {

        if (item.tipo === "giftbox") {

            total += item.precio;

        }

        else {

            const producto = buscarProducto(item.id);

            if (producto) {

                total += producto.precio * item.cantidad;

            }

        }

    });

    return total;

}
/*==================================================
            RENDERIZAR CARRITO
==================================================*/

function renderizarCarrito() {

    const contenedor = document.getElementById("contenido-carrito");
    const total = document.getElementById("total-carrito");

    if (!contenedor) return;

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="text-center py-5">

                <img src="img/logo/logo.png" width="90">

                <h5 class="mt-3">
                    Tu carrito está vacío
                </h5>

                <p class="text-muted">
                    Agrega un producto para comenzar.
                </p>

            </div>

        `;

        total.textContent = "S/0.00";

        return;

    }

    let html = "";

    carrito.forEach(item => {

        /*=========================================
                    GIFT BOX
        =========================================*/

        if (item.tipo === "giftbox") {

            html += `

            <div class="card mb-4 shadow-sm border-0">

                <div class="card-body">

                    <div class="d-flex">

                        <div class="gift-preview">

    ${item.productos
                    .slice(0, 4)
                    .map(producto => `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                title="${producto.nombre}">

        `).join("")}

</div>

                        <div class="ms-3 flex-grow-1">

                            <h5 class="mb-2">
                                🎁 ${item.nombre}
                            </h5>

                            <p class="mb-1">
                                <strong>🎉 Ocasión:</strong>
                                ${item.ocasion}
                            </p>

                            <p class="mb-2">
                                <strong>🧸 Productos:</strong>
                            </p>

                            <ul class="list-unstyled mb-2">

    ${item.productos.map(producto => `

        <li class="d-flex justify-content-between">

            <span>${producto.nombre}</span>

            <span class="text-success">
                S/${producto.precio.toFixed(2)}
            </span>

        </li>

    `).join("")}

</ul>

                            <p class="mb-2">

                                <strong>💌 Dedicatoria:</strong><br>

                                ${item.mensaje
                    ?
                    item.mensaje
                    :
                    "<span class='text-muted'>Sin dedicatoria</span>"
                }

                            </p>

                            <h6 class="text-success">

                                Total:
                                S/${item.precio.toFixed(2)}

                            </h6>

                        </div>

                        <button

                            class="btn btn-outline-danger btn-sm h-25"

                            onclick="eliminarGiftBox(${item.id})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

            `;

            return;

        }

        /*=========================================
                PRODUCTO NORMAL
        =========================================*/

        const producto = buscarProducto(item.id);

        if (!producto) return;

        html += `

        <div class="d-flex mb-4 align-items-center">

            <img

                src="${producto.imagen}"

                width="70"

                class="rounded">

            <div class="ms-3 flex-grow-1">

                <h6 class="mb-1">

                    ${producto.nombre}

                </h6>

                <small>

                    S/${producto.precio.toFixed(2)}

                </small>

                <div class="mt-2">

                    Cantidad:
                    ${item.cantidad}

                </div>

            </div>

            <button

                class="btn btn-outline-danger btn-sm"

                onclick="eliminarProducto(${producto.id})">

                <i class="bi bi-trash"></i>

            </button>

        </div>

        `;

    });

    contenedor.innerHTML = html;

    total.textContent = "S/" + totalCarrito().toFixed(2);

}

/*==================================================
                NOTIFICACIÓN
==================================================*/

function mostrarNotificacion(nombre) {

    console.log(`${nombre} agregado al carrito.`);

}

/*==================================================
                VACIAR CARRITO
==================================================*/

async function vaciarCarrito(){

    if(!requiereLogin()) return;

    if(carrito.length===0) return;

    const respuesta=await Swal.fire({

        icon:"warning",

        title:"¿Vaciar carrito?",

        text:"Se eliminarán todos los productos.",

        showCancelButton:true,

        confirmButtonText:"Sí",

        cancelButtonText:"Cancelar",

        confirmButtonColor:"#ff7ba9"

    });

    if(!respuesta.isConfirmed) return;

    carrito=[];

    guardarCarrito();

    actualizarContador();

    renderizarCarrito();

    alertaToast(

        "success",

        "Carrito vaciado"

    );

}


/*==================================================
                INICIAR
==================================================*/

window.addEventListener("DOMContentLoaded", () => {

    actualizarContador();

    renderizarCarrito();

});

/*==================================================
            FINALIZAR COMPRA
==================================================*/

function finalizarCompra() {

    if (!requiereLogin()) return;

    if (carrito.length === 0) {

        alertaInfo(
            "Carrito vacío",
            "Agrega productos antes de finalizar la compra."
        );

        return;

    }

    window.location.href = "checkout.html";

}