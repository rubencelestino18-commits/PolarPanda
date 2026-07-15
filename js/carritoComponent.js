/*==================================================
            CARRITOCOMPONENT.JS
==================================================*/

const CarritoComponent = {

    cargar() {

        const contenedor = document.getElementById("carrito");

        if (!contenedor) return;

        contenedor.innerHTML = `

<div
class="offcanvas offcanvas-end"
tabindex="-1"
id="carritoCanvas">

    <div class="offcanvas-header">

        <h4 class="fw-bold">

            🛍 Mi carrito

        </h4>

        <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas">
        </button>

    </div>

    <div
    class="offcanvas-body"
    id="contenido-carrito">

        <div class="text-center py-5">

            <img
            src="img/logo/logo.png"
            width="90"
            class="mb-3">

            <h5>

                Tu carrito está vacío

            </h5>

            <p class="text-muted">

                Agrega un producto para comenzar.

            </p>

        </div>

    </div>

    <div class="border-top p-4">

        <div
        class="d-flex justify-content-between mb-3">

            <strong>

                Total

            </strong>

            <strong id="total-carrito">

                S/0.00

            </strong>

        </div>

        <button
class="btn-primary-custom w-100"
onclick="finalizarCompra()">

    Finalizar compra

</button>

    </div>

</div>

`;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    CarritoComponent.cargar();

});