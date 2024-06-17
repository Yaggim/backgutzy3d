document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const errorContainer = document.getElementById('errorContainer');
    const productoForm = document.getElementById('productoForm');
    const agregarProductoContainer = document.getElementById('agregarProductoContainer');

    if (!loginForm || !agregarProductoContainer) {
        console.error('Elemento no encontrado en el DOM.');
        return;
    }

    // Evento para el formulario de login
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://backgutzy3d.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const data = await response.json();
            if (data.redirectUrl) {
                // Si el login es exitoso, ocultar formulario de login y mostrar formulario de agregar productos
                loginForm.style.display = 'none';
                agregarProductoContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error en el login:', error.message);
            mostrarError(error.message);
        }
    });

    // Evento para el formulario de agregar producto
    productoForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const habilitado = document.getElementById('habilitado').value;
        const imagen = document.getElementById('imagen').value;

        try {
            const response = await fetch('https://backgutzy3d.onrender.com/api/productos', {
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

    function mostrarError(mensaje) {
        errorContainer.textContent = mensaje;
    }
});