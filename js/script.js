/* ==================================================
   POLAR & PANDA
   SCRIPT.JS
   Funciones e interacciones
================================================== */



// ================================================
// NAVBAR CAMBIO AL HACER SCROLL
// ================================================


const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {


    if (window.scrollY > 50) {


        navbar.classList.add("navbar-scroll");


    } else {


        navbar.classList.remove("navbar-scroll");


    }


});





// ================================================
// SCROLL SUAVE EN LINKS DEL MENU
// ================================================


document.querySelectorAll('a[href^="#"]').forEach(link => {


    link.addEventListener("click", function (e) {


        const destino = document.querySelector(this.getAttribute("href"));


        if (destino) {


            e.preventDefault();


            destino.scrollIntoView({

                behavior: "smooth"

            });


        }


    });


});







// ================================================
// ANIMACIONES AL HACER SCROLL
// ================================================


const elementosAnimados = document.querySelectorAll(

    ".category-card, .product-card, .section-title, .giftbox"

);



const observer = new IntersectionObserver((entradas) => {


    entradas.forEach(entrada => {


        if (entrada.isIntersecting) {


            entrada.target.classList.add("mostrar");


        }


    });


}, {

    threshold: 0.15

});




elementosAnimados.forEach(elemento => {


    observer.observe(elemento);


});









// ================================================
// FAVORITOS
// ================================================


const botonesFavoritos = document.querySelectorAll(".favorite-btn");


botonesFavoritos.forEach(boton => {


    boton.addEventListener("click", () => {


        boton.classList.toggle("activo");


        const icono = boton.querySelector("i");


        if (boton.classList.contains("activo")) {


            icono.classList.remove("bi-heart");


            icono.classList.add("bi-heart-fill");


        } else {


            icono.classList.remove("bi-heart-fill");


            icono.classList.add("bi-heart");


        }


    });


});









// ================================================
// BOTONES COMPRAR
// ================================================


const botonesComprar = document.querySelectorAll(

    ".product-content button"

);



botonesComprar.forEach(boton => {


    boton.addEventListener("click", () => {


        boton.innerHTML = "✓ Agregado";


        boton.style.background = "#F7B8C8";



        setTimeout(() => {


            boton.innerHTML = "Comprar";


            boton.style.background = "";


        }, 2000);



    });



});









// ================================================
// EFECTO HOVER PRODUCTOS
// ================================================


const productos = document.querySelectorAll(".product-card");



productos.forEach(producto => {


    producto.addEventListener("mouseenter", () => {


        producto.style.transform = "translateY(-12px) scale(1.02)";


    });



    producto.addEventListener("mouseleave", () => {


        producto.style.transform = "translateY(0) scale(1)";


    });



});








// ================================================
// CARGA INICIAL
// ================================================


window.addEventListener("load", () => {


    document.body.classList.add("cargado");


});