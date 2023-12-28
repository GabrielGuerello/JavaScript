class Producto {
    constructor(id, nombre, precio) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
    }
  }

  class Carrito {
    constructor() {
      this.items = [];
      this.container = document.getElementById('carrito-container');
    }

    agregarProducto(producto, cantidad = 1) {
      const itemExistente = this.items.find(item => item.producto.id === producto.id);

      if (itemExistente) {
        itemExistente.cantidad += cantidad;
      } else {
        this.items.push({ producto, cantidad });
      }

      this.mostrarCarritoEnDOM();
    }

    eliminarProducto(idProducto) {
      const index = this.items.findIndex(item => item.producto.id === idProducto);

      if (index !== -1) {
        const item = this.items[index];
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          this.items.splice(index, 1);
        }
      }

      this.mostrarCarritoEnDOM();
    }

    calcularTotal() {
      return this.items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
    }

    mostrarCarritoEnDOM() {
      this.container.innerHTML = '';

      this.items.forEach(item => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-item');
        
        const cantidadDiv = document.createElement('div');
        cantidadDiv.textContent = `${item.cantidad} ${item.producto.nombre}(s)`;

        const precioDiv = document.createElement('div');
        precioDiv.textContent = `$${(item.producto.precio * item.cantidad).toFixed(2)}`;

        const eliminarBtn = document.createElement('span');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.classList.add('eliminar-btn');
        eliminarBtn.addEventListener('click', () => this.eliminarProducto(item.producto.id));

        productoDiv.appendChild(cantidadDiv);
        productoDiv.appendChild(precioDiv);
        productoDiv.appendChild(eliminarBtn);

        this.container.appendChild(productoDiv);
      });

      const totalDiv = document.createElement('div');
      totalDiv.textContent = `Total de la compra: $${this.calcularTotal().toFixed(2)}`;

      this.container.appendChild(totalDiv);
    }
  }

  const producto1 = new Producto(1, "Camiseta", 3500);
  const producto2 = new Producto(2, "Zapatos", 8200);
  const producto3 = new Producto(3, "Pantalones", 6300);

  const carrito = new Carrito();

  function agregarAlCarrito(producto) {
    carrito.agregarProducto(producto, 1);
  }

  carrito.mostrarCarritoEnDOM();