/*==================================================
                PEDIDOS.JS
==================================================*/

let pedidos = JSON.parse(

    localStorage.getItem("pedidos")

) || [];

/*==================================================
                INICIAR
==================================================*/

window.addEventListener("DOMContentLoaded", () => {

    mostrarPedidos();

});

/*==================================================
            MOSTRAR PEDIDOS
==================================================*/

function mostrarPedidos() {

    const contenedor = document.getElementById("listaPedidos");

    if (!contenedor) return;

    if (pedidos.length === 0) {

        contenedor.innerHTML = `

        <div class="text-center py-5">

            <img
            src="img/logo/logo.png"
            width="120"
            class="mb-4">

            <h3>

                Aún no tienes pedidos

            </h3>

            <p class="text-muted">

                Cuando realices una compra aparecerá aquí.

            </p>

            <a
            href="tienda.html"
            class="btn-primary-custom">

                Ir a comprar

            </a>

        </div>

        `;

        return;

    }

    let html = "";

    pedidos
    .slice()
    .reverse()
    .forEach(pedido => {

        html += `

        <div class="card shadow-sm border-0 mb-4">

            <div class="card-body">

                <div class="d-flex justify-content-between align-items-center">

                    <div>

                        <h5>

                            📦 Pedido ${pedido.numero}

                        </h5>

                        <small class="text-muted">

                            ${pedido.fecha}

                        </small>

                    </div>

                    <span class="badge bg-success">

                        Preparando

                    </span>

                </div>

                <hr>

                ${productosPedido(pedido)}

                <hr>

                <div class="d-flex justify-content-between">

                    <strong>

                        Método de pago

                    </strong>

                    <span>

                        ${pedido.metodoPago}

                    </span>

                </div>

                <div class="d-flex justify-content-between mt-2">

                    <strong>

                        Total

                    </strong>

                    <strong>

                        S/${pedido.total.toFixed(2)}

                    </strong>

                </div>

            </div>

        </div>

        `;

    });

    contenedor.innerHTML = html;

}

/*==================================================
        PRODUCTOS DEL PEDIDO
==================================================*/

function productosPedido(pedido) {

    let html = "";

    pedido.productos.forEach(item => {

        if (item.tipo === "giftbox") {

            html += `

            <div class="mb-2">

                🎁

                <strong>

                    Gift Box Personalizada

                </strong>

                <br>

                <small>

                    ${item.productos.length} productos

                </small>

            </div>

            `;

        }

        else {

            const producto = buscarProducto(item.id);

            if (!producto) return;

            html += `

            <div class="d-flex justify-content-between mb-2">

                <span>

                    ${producto.nombre}

                    x${item.cantidad}

                </span>

                <strong>

                    S/${(producto.precio * item.cantidad).toFixed(2)}

                </strong>

            </div>

            `;

        }

    });

    return html;

}