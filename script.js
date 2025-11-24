// 1. DEFINICIÓN DE PRODUCTOS Y PRECIOS
const productData = {
    // CRUCIAL: Los ID y precios deben coincidir exactamente con el HTML
    'prod01': { name: 'Auriculares Gamer TWS RGB', price: 25.00 },
    'prod02': { name: 'InPods Macaron Colors', price: 28.90 },
    'prod03': { name: 'TWS Display Digital', price: 20.99 },
    'prod04': { name: 'Crystal Air Wireless', price: 10.00 },
    'prod05': { name: 'Smartwatch Deportivo X1', price: 45.00 },
    'prod06': { name: 'Teclado Mecánico Pro', price: 60.00 }
};

let cart = []; 

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const buyButtons = document.querySelectorAll('.buy-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Cargar carrito de la memoria local (localStorage) al iniciar
    loadCart(); 

    // ------------------------------------------
    // AÑADIR PRODUCTO AL CARRITO
    // ------------------------------------------
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const product = productData[productId];

            if (product) {
                // Generamos un ID único para poder eliminar este ítem específico más tarde
                cart.push({ ...product, id: Date.now() }); 
                saveCart(); 
                renderCart(); 
                // Opcional: mostrar una notificación más sutil que el alert()
                console.log(`Añadido: ${product.name}`); 
            }
        });
    });

    // ------------------------------------------
    // FUNCIONALIDAD DE PAGO (CHECKOUT)
    // ------------------------------------------
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        const total = calculateTotal();
        const totalCentavos = Math.round(total * 100); // Para pasarelas de pago

        // *******************************************************************
        // 🚨 AQUÍ ES DONDE DEBES INTEGRAR TU CÓDIGO DE PAGO REAL 🚨
        // *******************************************************************
        
        // --- EJEMPLO 1: INTEGRACIÓN CON PAYPAL (Link simple) ---
        // if (total > 0) {
        //     window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_cart&business=TU_EMAIL_PAYPAL&item_name=Productos&amount=${total.toFixed(2)}&currency_code=USD`;
        // }


        // --- EJEMPLO 2: MENSAJE SIMULADO ---
        alert(`💲 Redirigiendo a la pasarela de pago... Total: $${total.toFixed(2)}`);
        
        // Limpiamos el carrito después de la simulación de compra
        cart = [];
        saveCart();
        renderCart();
    });

    // ------------------------------------------
    // FUNCIONES DEL CARRITO
    // ------------------------------------------

    function calculateTotal() {
        return cart.reduce((sum, item) => sum + item.price, 0);
    }

    function renderCart() {
        cartItemsContainer.innerHTML = ''; 

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
            cartTotalElement.textContent = '$0.00';
            checkoutButton.disabled = true;
            return;
        }

        // Muestra cada ítem en la lista
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            
            const itemPriceFormatted = item.price.toFixed(2);
            
            itemElement.innerHTML = `
                <span class="item-info">${item.name}</span>
                <span class="item-info">$${itemPriceFormatted}</span>
                <button class="item-remove" data-id="${item.id}">❌</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        const total = calculateTotal();
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        checkoutButton.disabled = false;

        // Añadir funcionalidad para eliminar ítems
        document.querySelectorAll('.item-remove').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    function removeItem(event) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        renderCart();
    }

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            // Aseguramos que los IDs sean números (importante para removeItem)
            cart = JSON.parse(savedCart).map(item => ({
                ...item,
                id: parseInt(item.id)
            }));
        }
        renderCart();
    }
});
