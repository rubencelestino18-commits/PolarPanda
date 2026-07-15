/*==================================================
                FOOTER.JS
==================================================*/

const Footer = {

    cargar() {

        const contenedor = document.getElementById("footer");

        if (!contenedor) return;

        contenedor.innerHTML = `

<footer class="footer">

    <div class="container text-center">

        <a href="index.html" class="footer-logo">

            Polar & Panda

        </a>

        <p class="footer-slogan">

            Regalos que abrazan el corazón 🐼

        </p>

        <p class="footer-message">

            🐻‍❄️ Nunu y 🐼 Pandi te esperan para ayudarte a crear
            el regalo perfecto para esa persona especial.

        </p>

        <div class="footer-social">

            <a
            href="https://www.instagram.com/polarpanda.pe"
            target="_blank">

                <i class="bi bi-instagram"></i>

            </a>

            <a
            href="https://www.tiktok.com/@polarpanda.pe"
            target="_blank">

                <i class="bi bi-tiktok"></i>

            </a>

            <a
            href="https://www.facebook.com/polarpanda.pe"
            target="_blank">

                <i class="bi bi-facebook"></i>

            </a>

            <a
            href="https://wa.me/51931745179"
            target="_blank">

                <i class="bi bi-whatsapp"></i>

            </a>

        </div>

        <hr>

        <p class="footer-copy">

            © 2026 Polar & Panda · Todos los derechos reservados.

        </p>

        <small class="footer-made">

            Hecho con 🤍 para crear sonrisas inolvidables.

        </small>

    </div>

</footer>

`;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Footer.cargar();

});