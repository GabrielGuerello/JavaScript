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

    console.log(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
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
      console.log(
        `Se eliminó una unidad de ${item.producto.nombre} del carrito.`
      );
    } else {
      console.log(`Producto con ID ${idProducto} no encontrado en el carrito.`);
    }
  }

  // Método para calcular el total de la compra
  calcularTotal() {
    let total = 0;

    this.items.forEach((item) => {
      total += item.producto.precio * item.cantidad;
    });

    return total;
  }

  // Método para mostrar el contenido del carrito
  mostrarCarrito() {
    console.log("Contenido del carrito:");
    this.items.forEach((item) => {
      console.log(
        `${item.cantidad} ${item.producto.nombre}(s) - $${(
          item.producto.precio * item.cantidad
        ).toFixed(2)}`
      );
    });

    // Mostrar el total de la compra
    console.log(`Total de la compra: $${this.calcularTotal().toFixed(2)}`);
  }
}

// Crear algunos productos
const producto1 = new Producto(1, "Camiseta", 3500);
const producto2 = new Producto(2, "Zapatos", 8200);
const producto3 = new Producto(3, "Pantalones", 6300);

// Crear un carrito de compras
const carrito = new Carrito();

// Agregar productos al carrito
carrito.agregarProducto(producto1, 5);
carrito.agregarProducto(producto2, 3);
carrito.agregarProducto(producto3, 2);

// Mostrar el carrito actual
carrito.mostrarCarrito();

// Eliminar un producto del carrito
carrito.eliminarProducto(1);

// Mostrar el carrito después de la eliminación
carrito.mostrarCarrito();

// Eliminar otro producto del carrito
carrito.eliminarProducto(2);

// Mostrar el carrito después de la eliminación
carrito.mostrarCarrito();

// Calcular el total de la compra
const totalCompra = carrito.calcularTotal();
console.log(`Total de la compra: $${totalCompra.toFixed(2)}`);
