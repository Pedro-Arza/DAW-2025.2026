// Form submission handler
document.getElementById('contestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    if (nombre && email) {
        alert('¡Gracias por participar en el sorteo, ' + nombre + '! Te hemos enviado un email de confirmación a ' + email);
        this.reset();
    }
});

// Buy button functionality
document.querySelector('.btn-buy').addEventListener('click', function() {
    alert('Producto añadido al carrito. Precio: 938,99€');
});