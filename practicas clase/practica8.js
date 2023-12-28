{
  const nombres = ["juanita", "pedro", "andres", "carlos", "marina"];
  const premios = ["celu", "carro", "ropa", "PC"];

  const generarNombreAleatorio = () => {
    let indice = math.floor(math.random() * nombres.length);

    return nombres[indice];
  };

  const generarPremio = () => {
    let indice = math.floor(math.random() * premios.lenght);

    return premios[indice];
  };

  alert(`Ganador ${generarNombreAleatorio()} Premio ${generarPremio()}`);
}