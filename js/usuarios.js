/*==================================================
                USUARIOS.JS
==================================================*/

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

/*==================================================
                GUARDAR
==================================================*/

function guardarUsuarios() {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}

function guardarSesion() {

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioActivo)
    );

}

/*==================================================
            REGISTRAR USUARIO
==================================================*/

function registrarUsuario(nombre, correo, password) {

    correo = correo.toLowerCase();

    const existe = usuarios.find(usuario =>

        usuario.correo === correo

    );

    if (existe) {

        Swal.fire({
            icon: "error",
            title: "Correo registrado",
            text: "Este correo ya existe.",
            confirmButtonColor: "#ff7ba9"
        });
        return false;

    }

    const nuevoUsuario = {

        id: Date.now(),

        nombre,
        correo,
        password

    };

    usuarios.push(nuevoUsuario);

    guardarUsuarios();

    usuarioActivo = nuevoUsuario;

    guardarSesion();

    actualizarNavbarUsuario();

    alertaExito(

        "¡Bienvenido! 🐼",

        "Tu cuenta fue creada correctamente."

    );

    return true;
}

/*==================================================
            INICIAR SESIÓN
==================================================*/

function iniciarSesion(correo, password) {

    correo = correo.toLowerCase();

    const usuario = usuarios.find(u =>

        u.correo === correo &&
        u.password === password

    );

    if (!usuario) {

        alertaError(

            "Oops...",

            "Correo o contraseña incorrectos."

        );
        return false;

    }

    usuarioActivo = usuario;

    guardarSesion();

    actualizarNavbarUsuario();

    Swal.fire({

        icon: "success",

        title: `¡Hola ${usuario.nombre}! 🐼`,

        text: "Has iniciado sesión correctamente.",

        confirmButtonColor: "#ff7ba9"

    });

    return true;

}

/*==================================================
            CERRAR SESIÓN
==================================================*/

function cerrarSesion() {

    usuarioActivo = null;

    localStorage.removeItem("usuarioActivo");

    actualizarNavbarUsuario();

    Swal.fire({

        icon: "success",

        title: "Hasta pronto 👋",

        text: "Sesión cerrada correctamente.",

        confirmButtonText: "Aceptar",

        confirmButtonColor: "#ff7ba9"

    }).then(() => {

        location.reload();

    });

}
/*==================================================
            USUARIO ACTUAL
==================================================*/

function obtenerUsuario() {

    return usuarioActivo;

}

/*==================================================
        ACTUALIZAR NAVBAR
==================================================*/
/*==================================================
        ACTUALIZAR NAVBAR
==================================================*/

function actualizarNavbarUsuario() {

    const dropdown = document.querySelector(".dropdown-menu");

    if (!dropdown) return;

    if (usuarioActivo) {

        dropdown.innerHTML = `

            <li>

                <h6 class="dropdown-header">

                    Hola, ${usuarioActivo.nombre} 🐼

                </h6>

            </li>

            <li>

             <a
                class="dropdown-item"
                href="pedidos.html">

            <i class="bi bi-bag me-2"></i>

                  Mis pedidos

             </a>

            </li>

            <li>

                <hr class="dropdown-divider">

            </li>

            <li>

                <a
                class="dropdown-item text-danger"
                href="#"
                onclick="cerrarSesion()">

                    <i class="bi bi-box-arrow-right me-2"></i>

                    Cerrar sesión

                </a>

            </li>

        `;

    } else {

        dropdown.innerHTML = `

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

        `;

    }

}

/*==================================================
            ABRIR LOGIN
==================================================*/

function abrirLogin() {

    document.getElementById("tituloModal").innerHTML =
        "Iniciar sesión 🐼";

    document.getElementById("contenidoModal").innerHTML = `

        <form id="formLogin">

            <div class="mb-3">

                <label class="form-label">
                    Correo
                </label>

                <input
                type="email"
                id="loginCorreo"
                class="form-control"
                required>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Contraseña
                </label>

                <input
                type="password"
                id="loginPassword"
                class="form-control"
                required>

            </div>

            <button
            class="btn-primary-custom w-100 border-0">

                Iniciar sesión

            </button>

        </form>

    `;

    const modal = new bootstrap.Modal(
        document.getElementById("usuarioModal")
    );

    modal.show();

    document
        .getElementById("formLogin")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const ok = iniciarSesion(

                document.getElementById("loginCorreo").value,

                document.getElementById("loginPassword").value

            );

            if (ok) {

                modal.hide();

            }

        });

}


/*==================================================
            ABRIR REGISTRO
==================================================*/

function abrirRegistro() {

    document.getElementById("tituloModal").innerHTML =
        "Crear cuenta 🐻‍❄️";

    document.getElementById("contenidoModal").innerHTML = `

        <form id="formRegistro">

            <div class="mb-3">

                <label class="form-label">

                    Nombre

                </label>

                <input
                type="text"
                id="registroNombre"
                class="form-control"
                required>

            </div>

            <div class="mb-3">

                <label class="form-label">

                    Correo

                </label>

                <input
                type="email"
                id="registroCorreo"
                class="form-control"
                required>

            </div>

            <div class="mb-3">

                <label class="form-label">

                    Contraseña

                </label>

                <input
                type="password"
                id="registroPassword"
                class="form-control"
                required>

            </div>

            <button
            class="btn-primary-custom w-100 border-0">

                Crear cuenta

            </button>

        </form>

    `;

    const modal = new bootstrap.Modal(
        document.getElementById("usuarioModal")
    );

    modal.show();

    document
        .getElementById("formRegistro")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const ok = registrarUsuario(

                document.getElementById("registroNombre").value,

                document.getElementById("registroCorreo").value,

                document.getElementById("registroPassword").value

            );

            if (ok) {

                modal.hide();

            }

        });

}

/*==================================================
                INICIAR
==================================================*/

window.addEventListener("DOMContentLoaded", () => {

    actualizarNavbarUsuario();

});

/*==================================================
        VERIFICAR SESIÓN
==================================================*/

function requiereLogin() {

    if (usuarioActivo) {

        return true;

    }

    Swal.fire({

        icon: "warning",

        title: "Inicia sesión",

        html: `

            Debes iniciar sesión para utilizar esta función.

        `,

        showCancelButton: true,

        confirmButtonText: "Iniciar sesión",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#ff7ba9"

    }).then((resultado)=>{

        if(resultado.isConfirmed){

            abrirLogin();

        }

    });

    return false;

}

function abrirPedidos(){

    if(!requiereLogin()) return;

    window.location.href="pedidos.html";

}