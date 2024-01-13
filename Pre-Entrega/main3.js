// Clase constructora para productos
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase constructora para el carrito de compras
class Carrito {
  constructor() {
    this.items = [];
  }

  // Método para agregar un producto al carrito
  agregarProducto(producto, cantidad = 1) {
    const itemExistente = this.items.find(
      (item) => item.producto.id === producto.id
    );

    if (itemExistente) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      itemExistente.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo como un nuevo item
      this.items.push({ producto, cantidad });
    }

    // Actualizar la interfaz de usuario y almacenar en localStorage
    this.mostrarEnDOM();
    this.guardarEnLocalStorage();
  }

  // Método para eliminar un producto del carrito
  eliminarProducto(idProducto) {
    const index = this.items.findIndex(
      (item) => item.producto.id === idProducto
    );

    if (index !== -1) {
      const item = this.items[index];
      if (item.cantidad > 1) {
        // Si hay más de una unidad del producto, reducir la cantidad
        item.cantidad -= 1;
      } else {
        // Si solo hay una unidad, eliminar el elemento del array
        this.items.splice(index, 1);
      }

      // Actualizar la interfaz de usuario y almacenar en localStorage
      this.mostrarEnDOM();
      this.guardarEnLocalStorage();
    }
  }

  // Método para calcular el total de la compra
  calcularTotal() {
    return this.items.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  }

  // Método para mostrar el contenido del carrito en el DOM
  mostrarEnDOM() {
    const carritoContainer = document.getElementById("carrito-container");

    // Limpiar el contenido del carritoContainer
    carritoContainer.innerHTML = "";

    // Crear elementos para cada producto en el carrito
    this.items.forEach((item) => {
      const itemElement = document.createElement("p");
      itemElement.textContent = `${item.cantidad} ${
        item.producto.nombre
      }(s) - $${(item.producto.precio * item.cantidad).toFixed(2)}`;

      // Agregar el elemento al carritoContainer
      carritoContainer.appendChild(itemElement);
    });

    // Crear elemento para el total de la compra
    const totalElement = document.createElement("p");
    totalElement.textContent = `Total de la compra: $${this.calcularTotal().toFixed(
      2
    )}`;

    // Agregar el elemento del total al carritoContainer
    carritoContainer.appendChild(totalElement);
  }

  // Método para guardar el carrito en el almacenamiento local
  guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify([...this.items]));
  }

  // Método para cargar el carrito desde el almacenamiento local
  cargarDesdeLocalStorage() {
    const carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
      this.items = JSON.parse(carritoJSON);
      this.mostrarEnDOM();
    }
  }
}

// Crear algunos productos
const producto1 = new Producto(1, "Camiseta", 3500);
const producto2 = new Producto(2, "Zapatos", 8200);
const producto3 = new Producto(3, "Pantalones", 6300);

// Crear un carrito de compras
const carrito = new Carrito();

// Cargar el carrito desde el almacenamiento local
carrito.cargarDesdeLocalStorage();

// Agregar eventos de forma más dinámica
document
  .getElementById("agregar-btn-camiseta")
  .addEventListener("click", function () {
    agregarAlCarrito(producto1);
  });

document
  .getElementById("agregar-btn-zapatos")
  .addEventListener("click", function () {
    agregarAlCarrito(producto2);
  });

document
  .getElementById("agregar-btn-pantalones")
  .addEventListener("click", function () {
    agregarAlCarrito(producto3);
  });

document
  .getElementById("eliminar-btn-camiseta")
  .addEventListener("click", function () {
    eliminarDelCarrito(producto1);
  });

document
  .getElementById("eliminar-btn-zapatos")
  .addEventListener("click", function () {
    eliminarDelCarrito(producto2);
  });

document
  .getElementById("eliminar-btn-pantalones")
  .addEventListener("click", function () {
    eliminarDelCarrito(producto3);
  });

// Funciones para eventos del usuario
function agregarAlCarrito(producto) {
  carrito.agregarProducto(producto, 1);
  console.log(`Agregando ${producto.nombre} al carrito...`);
}

function eliminarDelCarrito(producto) {
  carrito.eliminarProducto(producto.id);
  console.log(`Eliminando ${producto.nombre} del carrito...`);
}

// Mostrar el carrito actual en el DOM
carrito.mostrarEnDOM();
