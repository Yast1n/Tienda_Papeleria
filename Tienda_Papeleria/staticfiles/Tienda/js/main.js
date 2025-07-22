document.addEventListener('DOMContentLoaded', function() {
    // ========== BURGER MENU ANIMADO ==========
    const burgerBtn = document.getElementById('burgerBtn');
    const mainNav = document.getElementById('mainNav');
    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', function() {
            burgerBtn.classList.toggle('open');
            mainNav.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
                    burgerBtn.classList.remove('open');
                    mainNav.classList.remove('open');
                }
            }
        });
        document.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }

    // ===== CARRITO LOCALSTORAGE CON CANTIDAD =====
    function getCart() {
        return JSON.parse(localStorage.getItem('carrito_papeleria')) || [];
    }
    function setCart(cart) {
        localStorage.setItem('carrito_papeleria', JSON.stringify(cart));
    }
    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((acc, prod) => acc + Number(prod.cantidad), 0);
        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.innerText = count;
    }

    // ========== MODAL DE CARRITO ==========
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSendBtn = document.getElementById('cartSendBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    // Abrir carrito
    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', openCartModal);
    }

    // Cerrar carrito
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCartModal);
    }
    if (cartModal) {
        cartModal.addEventListener('click', function(e){
            if(e.target === this) closeCartModal();
        });
        // Escape para cerrar modal carrito
        document.addEventListener('keydown', function(e){
            if(cartModal.classList.contains('active') && e.key === "Escape") closeCartModal();
        });
    }

    function openCartModal() {
        const cart = getCart();
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = "<div style='padding:18px 0;'>El carrito está vacío</div>";
        } else {
            cart.forEach((item, idx) => {
                cartItemsList.innerHTML += `
                  <div class="cart-item">
                    <span>${item.nombre} <b>x${item.cantidad}</b></span>
                    <button class="cart-remove-btn" data-idx="${idx}">❌</button>
                  </div>
                `;
            });
            // Listeners para eliminar items del carrito
            cartItemsList.querySelectorAll('.cart-remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    removeFromCart(this.dataset.idx);
                });
            });
        }
        cartModal.classList.add('active');
    }
    function closeCartModal() {
        cartModal.classList.remove('active');
    }
    function removeFromCart(idx) {
        let cart = getCart();
        cart.splice(idx, 1);
        setCart(cart);
        updateCartCount();
        openCartModal();
    }

    // ====== ENVÍO POR WHATSAPP ======
    if (cartSendBtn) {
        cartSendBtn.addEventListener('click', function(){
            const cart = getCart();
            if (!cart.length) return alert('El carrito está vacío');
            let mensaje = "Hola! Quiero cotizar estos productos:%0A";
            cart.forEach(prod => {
                mensaje += `- ${prod.nombre} (x${prod.cantidad})%0A`;
            });
            window.open('https://wa.me/56945657563?text=' + mensaje, '_blank');
        });
    }

    // ========== MODAL DE CANTIDAD (AÑADIR AL CARRITO) ==========
    let prodSeleccionado = null;
    const cantidadModal = document.getElementById('cantidadModal');
    const inputCantidad = document.getElementById('inputCantidad');
    const cantidadProdName = document.getElementById('cantidadProdName');
    const btnCantidadAgregar = document.getElementById('btnCantidadAgregar');
    const btnCantidadCancelar = document.getElementById('btnCantidadCancelar');
    if (cantidadModal) {
        cantidadModal.addEventListener('click', function(e){
            if(e.target === this) closeCantidadModal();
        });
        document.addEventListener('keydown', function(e){
            if(cantidadModal.classList.contains('active') && e.key === "Escape") closeCantidadModal();
        });
    }
    function openCantidadModal(productoId, productoNombre) {
        prodSeleccionado = { id: productoId, nombre: productoNombre };
        if (inputCantidad) inputCantidad.value = 1;
        if (cantidadProdName) cantidadProdName.innerText = 'Agregar: ' + productoNombre;
        if (cantidadModal) cantidadModal.classList.add('active');
    }
    function closeCantidadModal() {
        if (cantidadModal) cantidadModal.classList.remove('active');
        prodSeleccionado = null;
    }
    if (btnCantidadAgregar) {
        btnCantidadAgregar.onclick = function() {
            const cantidad = parseInt(inputCantidad.value) || 1;
            if (!prodSeleccionado) return closeCantidadModal();
            let cart = getCart();
            let idx = cart.findIndex(p => p.id == prodSeleccionado.id);
            if (idx > -1) {
                cart[idx].cantidad += cantidad;
            } else {
                cart.push({id: prodSeleccionado.id, nombre: prodSeleccionado.nombre, cantidad: cantidad});
            }
            setCart(cart);
            updateCartCount();
            closeCantidadModal();
        };
    }
    if (btnCantidadCancelar) {
        btnCantidadCancelar.onclick = closeCantidadModal;
    }

    // Listener para todos los botones .btn-add-cart
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            openCantidadModal(this.dataset.id, this.dataset.nombre);
        });
    });

    // Inicializa contador carrito
    updateCartCount();
});
