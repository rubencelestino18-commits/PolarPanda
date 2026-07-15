/*==================================================
        FAVORITOSCOMPONENT.JS
==================================================*/

const FavoritosComponent = {

    cargar() {

        const contenedor = document.getElementById("favoritos");

        if (!contenedor) return;

        contenedor.innerHTML = `

<div
class="offcanvas offcanvas-end"
tabindex="-1"
id="favoritosCanvas">

    <div class="offcanvas-header">

        <h4 class="fw-bold">

            ❤️ Mis Favoritos

        </h4>

        <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas">
        </button>

    </div>

    <div
    class="offcanvas-body"
    id="contenido-favoritos">

        <div class="text-center py-5">

            <img
            src="img/logo/logo.png"
            width="90"
            class="mb-3">

            <h5>

                No tienes favoritos

            </h5>

            <p class="text-muted">

                Agrega productos presionando el corazón.

            </p>

        </div>

    </div>

</div>

`;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    FavoritosComponent.cargar();

});