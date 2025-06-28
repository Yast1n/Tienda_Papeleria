document.addEventListener('DOMContentLoaded', function() {
    // Burger menu animado
    const burgerBtn = document.getElementById('burgerBtn');
    const mainNav = document.getElementById('mainNav');
    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.toggle('open');
        mainNav.classList.toggle('open');
    });

    // Al hacer click fuera del menú, ciérralo en móvil
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('open');
                mainNav.classList.remove('open');
            }
        }
    });

    // Opcional: cerrar menú al navegar
    document.querySelectorAll('.main-nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            burgerBtn.classList.remove('open');
            mainNav.classList.remove('open');
        });
    });
});




