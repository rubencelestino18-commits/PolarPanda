/*==================================================
                TIENDA.JS
==================================================*/


/*==================================================
                MOSTRAR PRODUCTOS
==================================================*/

function mostrarProductos(lista) {

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    if (lista.length === 0) {

        contenedor.innerHTML = `

        <div class="col-12 text-center py-5">

            <i
            class="bi bi-box-seam"
            style="font-size:60px;color:#f7bfd1;"></i>

            <h3 class="mt-4">

                No hay productos disponibles

            </h3>

            <p>

                Muy pronto agregaremos nuevos productos.

            </p>

        </div>

        `;

        return;

    }

    lista.forEach(producto => {

        contenedor.innerHTML += `

        <div class="col-lg-3 col-md-6 mb-4">

            <div class="product-card h-100">

                <button
                class="btn-favorito"
                onclick="toggleFavorito(${producto.id})">

                    <i class="bi bi-heart"></i>

                </button>

                ${producto.oferta
                ?
                `<span class="badge-sale">
                        Oferta
                    </span>`
                :
                ""
            }

                <img
                src="${producto.imagen}"
                alt="${producto.nombre}">

                <div class="product-content">

                    <h4>

                        ${producto.nombre}

                    </h4>

                    <div class="stars">

                        ${"★".repeat(producto.estrellas)}

                    </div>

                    <h3>

                        S/${producto.precio.toFixed(2)}

                    </h3>

                    <button
                    class="btn-primary-custom"
                    onclick="agregarCarrito(${producto.id})">

                        <i class="bi bi-bag-plus"></i>

                        Agregar

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    /*==================================
        PINTAR FAVORITOS
    ==================================*/

    if (typeof actualizarBotonesFavoritos === "function") {

        actualizarBotonesFavoritos();

    }

}


/*==================================================
                FILTRAR
==================================================*/

function filtrarProductos(categoria, boton) {

    document
        .querySelectorAll(".category-filters button")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    if (boton) {

        boton.classList.add("active");

    }

    if (categoria === "todos") {

        mostrarProductos(productos);

        return;

    }

    const filtrados = productos.filter(producto => {

        return producto.categoria === categoria;

    });

    mostrarProductos(filtrados);

}


/*==================================================
                CARGA INICIAL
==================================================*/

window.addEventListener("DOMContentLoaded", () => {

    mostrarProductos(productos);

});