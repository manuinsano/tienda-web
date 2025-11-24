// 1. DEFINICIÓN DE PRODUCTOS Y PRECIOS
// Es CRUCIAL que estos precios coincidan con los de tu index.html
const productData = {
    // Usamos el mismo ID que pusimos en el HTML (prod01, prod02, etc.)
    'prod01': { name: 'Auriculares Gamer TWS RGB', price: 25.00 },
    'prod02': { name: 'InPods Macaron Colors', price: 28.90 },
    'prod03': { name: 'TWS Display Digital', price: 20.99 },
    'prod04': { name: 'Crystal Air Wireless', price: 10.00 },
    'prod05': { name: 'Smartwatch Deportivo', price: 45.00 },
    'prod06': { name: 'Teclado Mecánico 60%', price: 60.00 }
};

let cart = []; // El arreglo donde guardaremos los productos del carrito

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const buyButtons = document.querySelectorAll('.buy-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Cargar carrito de la memoria local al iniciar
    loadCart(); 

    // ------------------------------------------
    // AÑADIR PRODUCTO AL CARRITO
    // ------------------------------------------
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtenemos el ID de producto de nuestro botón HTML
            const productId = button.closest('.product-card').querySelector('.buy-button').getAttribute('data-product-id');
            const product = productData[productId];

            if (product) {
                // Añadimos el producto al arreglo
                cart.push({ ...product, id: Date.now() }); 
                saveCart(); // Guardamos en la memoria del navegador
                renderCart(); // Actualizamos la vista del carrito
                alert(`✅ Añadido: ${product.name}`);
            }
        });
    });

    // ------------------------------------------
    // FINALIZAR PAGO (CHECKOUT)
    // ------------------------------------------
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("El carrito está vacío. ¡Añade un producto!");
            return;
        }
        
        const total = calculateTotal();
        const formattedTotal = total.toFixed(2);
        
        // ** INTEGRACIÓN DE PAGO REAL **
        // Aquí debes reemplazar el texto con el código de tu plataforma de pago.
        // Ejemplo para PayPal: Puedes redirigir a una URL de pago pre-configurada.
        
        alert(`💲 Redirigiendo a la pasarela de pago... Total a pagar: $${formattedTotal}`);
        
        // Limpiamos el carrito después de la compra (simulado)
        cart = [];
        saveCart();
        renderCart();
    });

    // ------------------------------------------
    // FUNCIONES INTERNAS
    // ------------------------------------------

    function calculateTotal() {
        return cart.reduce((sum, item) => sum + item.price, 0);
    }

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Limpiamos la lista

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
            cartTotalElement.textContent = '$0.00';
            checkoutButton.disabled = true;
            return;
        }

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
        // Filtramos el carrito para quitar el ítem con ese ID
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        renderCart();
    }

    function saveCart() {
        // Guardar el carrito en la memoria local (se mantiene al recargar)
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        renderCart();
    }

});
