/*==================================================
                FAVORITOS.JS
==================================================*/

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

/*==================================================
            AGREGAR / QUITAR FAVORITO
==================================================*/

function toggleFavorito(id) {

    if (!requiereLogin()) return;

    const indice = favoritos.findIndex(producto => producto.id === id);

    if (indice >= 0) {

        favoritos.splice(indice, 1);

        alertaToast(

            "info",

            "Eliminado de favoritos 💔"

        );

    } else {

        const producto = buscarProducto(id);

        if (producto) {

            favoritos.push(producto);

            alertaToast(

                "success",

                `${producto.nombre} añadido a favoritos ❤️`

            );

        }

    }

    guardarFavoritos();

    actualizarFavoritos();

}

/*==================================================
            ACTUALIZAR TODO
==================================================*/

function actualizarFavoritos() {

    actualizarContadorFavoritos();

    mostrarFavoritos();

    actualizarBotonesFavoritos();

}

/*==================================================
            CONTADOR
==================================================*/

function actualizarContadorFavoritos() {

    const contador = document.getElementById("contador-favoritos");

    if (contador) {

        contador.textContent = favoritos.length;

    }

}

/*==================================================
            MOSTRAR FAVORITOS
==================================================*/

function mostrarFavoritos() {

    const contenedor = document.getElementById("contenido-favoritos");

    if (!contenedor) {

        return;

    }

    if (favoritos.length === 0) {

        contenedor.innerHTML = `

        <div class="text-center py-5">

            <i
            class="bi bi-heart"
            style="font-size:70px;color:#f7bfd1;"></i>

            <h5 class="mt-3">

                No tienes favoritos

            </h5>

            <p class="text-muted">

                Agrega productos presionando el corazón.

            </p>

        </div>

        `;

        return;

    }

    let html = "";

    favoritos.forEach(producto => {

        html += `

        <div class="card mb-3 border-0 shadow-sm">

            <div class="card-body d-flex align-items-center">

                <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                style="
                width:80px;
                height:80px;
                object-fit:cover;
                border-radius:15px;">

                <div class="ms-3 flex-grow-1">

                    <h6 class="mb-1">

                        ${producto.nombre}

                    </h6>

                    <strong>

                        S/${producto.precio.toFixed(2)}

                    </strong>

                </div>

                <div class="d-flex flex-column gap-2">

                    <button
                    class="btn btn-success btn-sm"
                    onclick="agregarCarrito(${producto.id})">

                        <i class="bi bi-bag-plus"></i>

                    </button>

                    <button
                    class="btn btn-outline-danger btn-sm"
                    onclick="eliminarFavorito(${producto.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    contenedor.innerHTML = html;

}

/*==================================================
            ELIMINAR FAVORITO
==================================================*/

function eliminarFavorito(id) {

    favoritos = favoritos.filter(producto => producto.id !== id);

    guardarFavoritos();

    actualizarFavoritos();

}

/*==================================================
        PINTAR CORAZONES
==================================================*/

function actualizarBotonesFavoritos() {

    document.querySelectorAll(".btn-favorito").forEach(boton => {

        const texto = boton.getAttribute("onclick");

        const id = Number(texto.match(/\d+/)[0]);

        const existe = favoritos.some(producto => producto.id === id);

        boton.classList.toggle("activo", existe);

    });

}

/*==================================================
            GUARDAR
==================================================*/

function guardarFavoritos() {

    localStorage.setItem(

        "favoritos",

        JSON.stringify(favoritos)

    );

}

/*==================================================
            VACIAR FAVORITOS
==================================================*/

function vaciarFavoritos() {

    favoritos = [];

    guardarFavoritos();

    actualizarFavoritos();

}

/*==================================================
            INICIAR
==================================================*/

window.addEventListener("DOMContentLoaded", () => {

    actualizarFavoritos();

});

