document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones de compra
    const buyButtons = document.querySelectorAll('.buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Previene el envío del formulario si hubiera uno
            event.preventDefault(); 
            
            // Obtiene el nombre del producto de la tarjeta
            const card = button.closest('.product-card');
            const productName = card.querySelector('.product-title').textContent;
            
            // Simulación de acción (aquí iría la integración con PayPal/Stripe)
            console.log(`Producto seleccionado: ${productName}`);
            
            // Muestra una alerta simple al usuario
            alert(`✅ ¡"${productName}" listo para comprar! (Aquí iría la ventana de pago)`);

            // Nota: Para una tienda real, aquí redirigirías al usuario a la URL de pago de PayPal.
        });
    });
});
