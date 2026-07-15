const pagina = window.location.pathname.split("/").pop();

document.getElementById("navbar-container").innerHTML = `
<nav class="navbar navbar-expand-lg fixed-top">

...

</nav>
`;

Componentes.navbar();

Componentes.footer();

Componentes.carrito();

Componentes.favoritos();