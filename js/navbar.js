/*==================================================
                NAVBAR.JS
==================================================*/

const Navbar = {

    cargar() {

        const pagina = window.location.pathname.split("/").pop() || "index.html";

        document.getElementById("navbar").innerHTML = `

<nav class="navbar navbar-expand-lg fixed-top">

    <div class="container">

        <a class="navbar-brand" href="index.html">

            <img
            src="img/logo/logo.png"
            alt="Polar Panda Logo">

            <span>
                Polar & Panda
            </span>

        </a>

        <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu">

            <i class="bi bi-list"></i>

        </button>

        <div class="collapse navbar-collapse" id="menu">

            <ul class="navbar-nav mx-auto">

                <li class="nav-item">

                    <a
                    href="index.html"
                    class="nav-link ${pagina === "index.html" ? "active" : ""}">

                        Inicio

                    </a>

                </li>

                <li class="nav-item">

                    <a
                    href="tienda.html"
                    class="nav-link ${pagina === "tienda.html" ? "active" : ""}">

                        Tienda

                    </a>

                </li>

                <li class="nav-item">

                    <a
                    href="giftbox.html"
                    class="nav-link ${pagina === "giftbox.html" ? "active" : ""}">

                        Gift Box

                    </a>

                </li>

                <li class="nav-item">

                    <a
                    href="nosotros.html"
                    class="nav-link ${pagina === "nosotros.html" ? "active" : ""}">

                        Nosotros

                    </a>

                </li>

                <li class="nav-item">

                    <a
                    href="contacto.html"
                    class="nav-link ${pagina === "contacto.html" ? "active" : ""}">

                        Contacto

                    </a>

                </li>

            </ul>

            <div class="nav-icons">

                <a href="#" id="btnBuscar">

                    <i class="bi bi-search"></i>

                </a>

                <a
                href="#"
                class="cart-icon"
                data-bs-toggle="offcanvas"
                data-bs-target="#favoritosCanvas">

                    <i class="bi bi-heart"></i>

                    <span id="contador-favoritos">

                        0

                    </span>

                </a>

                <a
                href="#"
                class="cart-icon"
                data-bs-toggle="offcanvas"
                data-bs-target="#carritoCanvas">

                    <i class="bi bi-bag"></i>

                    <span id="contador-carrito">

                        0

                    </span>

                </a>

                <div class="dropdown">

                    <a
                    href="#"
                    data-bs-toggle="dropdown">

                        <i class="bi bi-person-circle"></i>

                    </a>

                    <ul class="dropdown-menu dropdown-menu-end">

                        <li>

                           <a
                            class="dropdown-item"
                            href="#"
                            onclick="abrirLogin()">

                            Iniciar sesión

                            </a>

                        </li>

                        <li>

                            <a
                             class="dropdown-item"
                             href="#"
                             onclick="abrirRegistro()">

                            Registrarse
 
                            </a>

                        </li>

                        <li>

                            <a
                            class="dropdown-item"
                            href="#">

                                Mis pedidos

                            </a>

                        </li>

                        <li>

                            <hr class="dropdown-divider">

                        </li>

                        <li>

                            <a
                            class="dropdown-item"
                            href="#">

                                Cerrar sesión

                            </a>

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    </div>

</nav>

<!--====================================
        MODAL USUARIOS
=====================================-->

<div
class="modal fade"
id="usuarioModal"
tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content border-0 shadow-lg rounded-4">

            <div class="modal-header border-0">

                <h4
                class="fw-bold"
                id="tituloModal">

                    Bienvenido 🐼

                </h4>

                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
                </button>

            </div>

            <div
            class="modal-body"
            id="contenidoModal">

            </div>

        </div>

    </div>

</div>

<!--====================================
        MODAL BUSCADOR
=====================================-->

<div
class="modal fade"
id="buscarModal"
tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="fw-bold">
                    🔍 Buscar productos
                </h5>

                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                <input
                type="text"
                id="buscarInput"
                class="form-control"
                placeholder="Buscar productos...">

                <div
                id="resultadosBusqueda"
                class="mt-3">
                </div>

            </div>

        </div>

    </div>

</div>
`;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Navbar.cargar();

});

/*==================================================
                BUSCADOR
==================================================*/

document.addEventListener("click", function (e) {

    if (e.target.closest("#btnBuscar")) {

        e.preventDefault();

        const modal = new bootstrap.Modal(
            document.getElementById("buscarModal")
        );

        modal.show();

        setTimeout(() => {

            document.getElementById("buscarInput").focus();

        }, 300);

    }

});


/*==================================================
            BUSCAR PRODUCTOS
==================================================*/

document.addEventListener("input", function (e) {

    if (e.target.id !== "buscarInput") return;

    const texto = e.target.value.toLowerCase();

    const resultados = document.getElementById("resultadosBusqueda");

    if (!texto) {

        resultados.innerHTML = "";

        return;

    }

    const encontrados = productos.filter(producto =>

        producto.nombre.toLowerCase().includes(texto)

    );

    if (encontrados.length === 0) {

        resultados.innerHTML = `

            <p class="text-center text-muted py-3">

                No se encontraron productos.

            </p>

        `;

        return;

    }

    let html = "";

    encontrados.forEach(producto => {

        html += `

        <div class="card mb-2 border-0 shadow-sm">

            <div class="card-body d-flex align-items-center">

                <img
                src="${producto.imagen}"
                style="
                    width:70px;
                    height:70px;
                    object-fit:cover;
                    border-radius:12px;">

                <div class="ms-3 flex-grow-1">

                    <h6 class="mb-1">

                        ${producto.nombre}

                    </h6>

                    <strong>

                        S/${producto.precio.toFixed(2)}

                    </strong>

                </div>

                <button
                class="btn btn-success btn-sm"
                onclick="agregarCarrito(${producto.id})">

                    <i class="bi bi-bag-plus"></i>

                </button>

            </div>

        </div>

        `;

    });

    resultados.innerHTML = html;

});

/*==================================================
        PROTEGER CARRITO
==================================================*/

document.addEventListener("click", function (e) {

    const boton = e.target.closest('[data-bs-target="#carritoCanvas"]');

    if (!boton) return;

    if (!requiereLogin()) {

        e.preventDefault();

    }

});

/*==================================================
        PROTEGER FAVORITOS
==================================================*/

document.addEventListener("click", function (e) {

    const boton = e.target.closest('[data-bs-target="#favoritosCanvas"]');

    if (!boton) return;

    if (!requiereLogin()) {

        e.preventDefault();

    }

});