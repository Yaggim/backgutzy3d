document.getElementById('productoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const habilitado = document.getElementById('habilitado').value;
    const imagen = document.getElementById('imagen').value;

    try {
        const response = await fetch('http://localhost:3000/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, precio, cantidad, habilitado, imagen })
        });

        if (response.ok) {
            alert('Producto agregado correctamente');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
        alert('Error al agregar producto');
    }
});