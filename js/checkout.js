/*==================================================
                CHECKOUT.JS
==================================================*/

let carritoCheckout = [];
let totalCompra = 0;

/*==================================================
                INICIAR
==================================================*/

window.addEventListener("DOMContentLoaded", iniciarCheckout);

function iniciarCheckout() {

    if (!requiereLogin()) {

        window.location.href = "index.html";

        return;

    }

    carritoCheckout =
        JSON.parse(localStorage.getItem("carrito")) || [];

    cargarResumen();

    cargarFormularioPago();

    cargarDatosUsuario();

    configurarEventos();

}

/*==================================================
            CONFIGURAR EVENTOS
==================================================*/

function configurarEventos() {

    const selector = document.getElementById("tipoPago");

    if (selector) {

        selector.addEventListener("change", () => {

            mostrarFormularioPago(selector.value);

        });

    }

    const boton = document.getElementById("btnConfirmarCompra");

    if (boton) {

        boton.addEventListener("click", confirmarCompra);

    }

}

/*==================================================
        CARGAR DATOS DEL USUARIO
==================================================*/

function cargarDatosUsuario() {

    if (typeof obtenerUsuario !== "function") return;

    const usuario = obtenerUsuario();

    if (!usuario) return;

    document.getElementById("nombreCliente").value =
        usuario.nombre || "";

    document.getElementById("correoCliente").value =
        usuario.correo || "";

}

/*==================================================
            CARGAR RESUMEN
==================================================*/

function cargarResumen() {

    const resumen = document.getElementById("resumenCheckout");
    const total = document.getElementById("totalCheckout");

    if (!resumen || !total) return;

    if (carritoCheckout.length === 0) {

        resumen.innerHTML = `

            <div class="text-center py-4">

                <img
                src="img/logo/logo.png"
                width="70"
                class="mb-3">

                <p class="text-muted">

                    Tu carrito está vacío.

                </p>

            </div>

        `;

        total.innerHTML = "S/0.00";

        return;

    }

    totalCompra = 0;

    let html = "";

    carritoCheckout.forEach(item => {

        /*==============================
                GIFT BOX
        ==============================*/

        if (item.tipo === "giftbox") {

            totalCompra += item.precio;

            html += `

            <div class="card border-0 shadow-sm mb-3">

                <div class="card-body">

                    <h6 class="fw-bold">

                        🎁 Gift Box Personalizada

                    </h6>

                    <small class="text-muted">

                        Ocasión:
                        ${item.ocasion}

                    </small>

                    <br>

                    <strong>

                        S/${item.precio.toFixed(2)}

                    </strong>

                </div>

            </div>

            `;

            return;

        }

        /*==============================
                PRODUCTOS
        ==============================*/

        const producto = buscarProducto(item.id);

        if (!producto) return;

        const subtotal =
            producto.precio * item.cantidad;

        totalCompra += subtotal;

        html += `

        <div class="card border-0 shadow-sm mb-3">

            <div class="card-body d-flex align-items-center">

                <img
                src="${producto.imagen}"
                width="70"
                height="70"

                style="
                    object-fit:cover;
                    border-radius:14px;">

                <div class="ms-3 flex-grow-1">

                    <strong>

                        ${producto.nombre}

                    </strong>

                    <br>

                    <small>

                        Cantidad:
                        ${item.cantidad}

                    </small>

                </div>

                <strong>

                    S/${subtotal.toFixed(2)}

                </strong>

            </div>

        </div>

        `;

    });

    resumen.innerHTML = html;

    total.innerHTML = `

        S/${totalCompra.toFixed(2)}

    `;

}

/*==================================================
        FORMULARIOS DE PAGO
==================================================*/

function cargarFormularioPago() {

    const selector = document.getElementById("tipoPago");

    if (!selector) return;

    mostrarFormularioPago(selector.value);

}

function mostrarFormularioPago(tipo) {

    const contenedor = document.getElementById("contenidoPago");

    if (!contenedor) return;

    switch (tipo) {

        case "tarjeta":

            contenedor.innerHTML = `

            <div class="mb-3">

                <label class="form-label">

                    Número de tarjeta

                </label>

                <input

                id="numeroTarjeta"

                class="form-control"

                maxlength="19"

                placeholder="1234 5678 9012 3456">

            </div>

            <div class="row">

                <div class="col-6">

                    <label class="form-label">

                        Vence

                    </label>

                    <input

                    id="fechaTarjeta"

                    class="form-control"

                    maxlength="5"

                    placeholder="08/29">

                </div>

                <div class="col-6">

                    <label class="form-label">

                        CVV

                    </label>

                    <input

                    id="cvvTarjeta"

                    class="form-control"

                    maxlength="3"

                    placeholder="123">

                </div>

            </div>

            `;

        break;

        case "yape":

            contenedor.innerHTML = `

            <div class="text-center">

                <img

                src="img/pago/yape.jpg"

                class="img-fluid rounded"

                style="max-width:220px;">

                <p class="mt-3">

                    Escanea el QR desde Yape.

                </p>

            </div>

            `;

        break;

        case "plin":

            contenedor.innerHTML = `

            <div class="text-center">

                <img

                src="img/pago/plin.jpg"

                class="img-fluid rounded"

                style="max-width:220px;">

                <p class="mt-3">

                    Escanea el QR desde Plin.

                </p>

            </div>

            `;

        break;

        case "contra":

            contenedor.innerHTML = `

            <div class="alert alert-success">

                <h6>

                    🚚 Pago contra entrega

                </h6>

                <p class="mb-0">

                    Cancelarás cuando recibas tu pedido.

                </p>

            </div>

            `;

        break;

    }

    activarFormatoTarjeta();

}

/*==================================================
        FORMATO TARJETA
==================================================*/

function activarFormatoTarjeta() {

    const numero = document.getElementById("numeroTarjeta");

    if (numero) {

        numero.addEventListener("input", function () {

            this.value = this.value

                .replace(/\D/g, "")

                .replace(/(.{4})/g, "$1 ")

                .trim();

        });

    }

    const fecha = document.getElementById("fechaTarjeta");

    if (fecha) {

        fecha.addEventListener("input", function () {

            this.value = this.value

                .replace(/\D/g, "")

                .replace(/^(\d{2})(\d)/, "$1/$2")

                .substring(0,5);

        });

    }

    const cvv = document.getElementById("cvvTarjeta");

    if (cvv) {

        cvv.addEventListener("input", function () {

            this.value = this.value.replace(/\D/g,"");

        });

    }

}

/*==================================================
            CONFIRMAR COMPRA
==================================================*/

function confirmarCompra() {

    /*==============================
            DATOS CLIENTE
    ==============================*/

    const nombre =
        document.getElementById("nombreCliente").value.trim();

    const correo =
        document.getElementById("correoCliente").value.trim();

    const telefono =
        document.getElementById("telefonoCliente").value.trim();

    const dni =
        document.getElementById("dniCliente").value.trim();

    const direccion =
        document.getElementById("direccionCliente").value.trim();

    const departamento =
        document.getElementById("departamento").value.trim();

    const provincia =
        document.getElementById("provincia").value.trim();

    const distrito =
        document.getElementById("distrito").value.trim();

    if (

        !nombre ||

        !correo ||

        !telefono ||

        !dni ||

        !direccion ||

        !departamento ||

        !provincia ||

        !distrito

    ){

        alertaError(

            "Faltan datos",

            "Completa toda la información del envío."

        );

        return;

    }

    /*==============================
            VALIDAR PAGO
    ==============================*/

    const metodo =
        document.getElementById("tipoPago").value;

    if (metodo === "tarjeta") {

        const numero =
            document.getElementById("numeroTarjeta").value;

        const fecha =
            document.getElementById("fechaTarjeta").value;

        const cvv =
            document.getElementById("cvvTarjeta").value;

        if (

            numero.length < 19 ||

            fecha.length < 5 ||

            cvv.length < 3

        ){

            alertaError(

                "Tarjeta inválida",

                "Completa correctamente los datos de la tarjeta."

            );

            return;

        }

    }

    registrarPedido(

        nombre,
        correo,
        telefono,
        direccion,
        metodo

    );

}

/*==================================================
            REGISTRAR PEDIDO
==================================================*/

function registrarPedido(

    nombre,
    correo,
    telefono,
    direccion,
    metodo

){

    let pedidos = JSON.parse(

        localStorage.getItem("pedidos")

    ) || [];

    const pedido = {

        numero:

            "PP-" +

            Math.floor(

                Math.random()*900000+100000

            ),

        fecha:

            new Date().toLocaleString(),

        cliente: nombre,

        correo,

        telefono,

        direccion,

        metodo,

        productos: carritoCheckout,

        total: totalCompra

    };

    pedidos.push(pedido);

    localStorage.setItem(

        "pedidos",

        JSON.stringify(pedidos)

    );

    localStorage.removeItem("carrito");
    Swal.fire({

        icon: "success",

        title: "¡Compra realizada! 🎉",

        html: `

            <b>N° Pedido:</b>

            ${pedido.numero}

            <br><br>

            Gracias por comprar en

            <b>Polar & Panda</b>

        `,

        confirmButtonColor:"#ff7ba9"

    }).then(()=>{

        location.href="index.html";

    });

}