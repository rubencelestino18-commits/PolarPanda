/*==================================================
                ALERTAS.JS
==================================================*/

/*==================================================
            ÉXITO
==================================================*/

function alertaExito(titulo, texto = "") {

    Swal.fire({

        icon: "success",

        title: titulo,

        text: texto,

        confirmButtonColor: "#ff7ba9"

    });

}

/*==================================================
            ERROR
==================================================*/

function alertaError(titulo, texto = "") {

    Swal.fire({

        icon: "error",

        title: titulo,

        text: texto,

        confirmButtonColor: "#ff4d6d"

    });

}

/*==================================================
            INFORMACIÓN
==================================================*/

function alertaInfo(titulo, texto = "") {

    Swal.fire({

        icon: "info",

        title: titulo,

        text: texto,

        confirmButtonColor: "#7fb3ff"

    });

}

/*==================================================
            PREGUNTA
==================================================*/

function alertaPregunta(titulo, texto, callback) {

    Swal.fire({

        title: titulo,

        text: texto,

        icon: "question",

        showCancelButton: true,

        confirmButtonColor: "#ff7ba9",

        cancelButtonColor: "#999",

        confirmButtonText: "Sí",

        cancelButtonText: "Cancelar"

    }).then((resultado)=>{

        if(resultado.isConfirmed){

            callback();

        }

    });

}

/*==================================================
            TOAST
==================================================*/

function alertaToast(icono, titulo) {

    Swal.fire({

        toast: true,

        position: "top-end",

        icon: icono,

        title: titulo,

        showConfirmButton: false,

        timer: 1800,

        timerProgressBar: true

    });

}