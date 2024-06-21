document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const productoForm = document.getElementById('productoForm');
    const productoContainer = document.querySelector('.container');
    const productoFormContainer = document.getElementById('productoFormContainer');
    const productosTable = document.getElementById('productosTable').querySelector('tbody');
    const nuevoProductoButton = document.getElementById('nuevoProductoButton');
    const cancelarButton = document.getElementById('cancelarButton');
    const formTitle = document.getElementById('formTitle');
    const productoId = document.getElementById('productoId');
    const loginError = document.getElementById('loginError');
    const productoError = document.getElementById('productoError');
    const logoutButton = document.getElementById('logoutButton');

    // Verificar si el usuario ya ha iniciado sesión
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        showProductForm();
        cargarProductos();
    } else {
        showLoginForm();
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
                // Si el login es exitoso, ocultar formulario de login y mostrar formulario de productos
                loginError.textContent = '';
                localStorage.setItem('isLoggedIn', 'true');
                showProductForm();
                cargarProductos();
            } else {
                throw new Error('Acceso no autorizado');
            }
        } catch (error) {
            console.error('Error en el login:', error.message);
            mostrarError(error.message, loginError);
        }
    });

    // Evento para el formulario de agregar/modificar producto
    productoForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const id = productoId.value;
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const habilitado = document.getElementById('habilitado').value;
        const imagen = document.getElementById('imagen').value;

        try {
            const response = await fetch(id ? `https://backgutzy3d.onrender.com/api/productos/${id}` : 'https://backgutzy3d.onrender.com/api/productos', {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, nombre, descripcion, precio, cantidad, habilitado, imagen })
            });

            if (response.ok) {
                alert('Producto guardado correctamente');
                productoFormContainer.style.display = 'none';
                cargarProductos();
            } else {
                const errorData = await response.json();
                mostrarError(`Error: ${errorData.message}`, productoError);
            }
        } catch (error) {
            console.error('Error al guardar producto:', error);
            mostrarError('Error al guardar producto', productoError);
        }
    });

    // Evento para el botón de nuevo producto
    nuevoProductoButton.addEventListener('click', function() {
        formTitle.textContent = 'Agregar Producto';
        productoForm.reset();
        productoId.value = '';
        productoFormContainer.style.display = 'block';
    });

    // Evento para el botón de cancelar
    cancelarButton.addEventListener('click', function() {
        productoFormContainer.style.display = 'none';
    });

    // Evento para cerrar sesión
    logoutButton.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        showLoginForm();
    });

    async function cargarProductos() {
        try {
            const response = await fetch('https://backgutzy3d.onrender.com/api/productos');
            if (response.ok) {
                const productos = await response.json();
                productosTable.innerHTML = '';
                productos.forEach(producto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.habilitado}</td>
                        <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
                        <td>
                            <button onclick="editarProducto(${producto.id})">Editar</button>
                        </td>
                    `;
                    productosTable.appendChild(row);
                });
            } else {
                mostrarError('Error al cargar productos', productoError);
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
            mostrarError('Error al cargar productos', productoError);
        }
    }

    function editarProducto(id) {
        formTitle.textContent = 'Modificar Producto';
        // Llenar el formulario con los datos del producto a modificar
        const producto = productos.find(p => p.id === id);
        productoId.value = producto.id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('cantidad').value = producto.cantidad;
        document.getElementById('habilitado').value = producto.habilitado;
        document.getElementById('imagen').value = producto.imagen;
        productoFormContainer.style.display = 'block';
    }

    function showLoginForm() {
        loginContainer.style.display = 'block';
        productoContainer.style.display = 'none';
        logoutButton.style.display = 'none';
    }

    function showProductForm() {
        loginContainer.style.display = 'none';
        productoContainer.style.display = 'block';
        logoutButton.style.display = 'block';
    }

    function mostrarError(mensaje, elemento) {
        elemento.textContent = mensaje;
    }
});