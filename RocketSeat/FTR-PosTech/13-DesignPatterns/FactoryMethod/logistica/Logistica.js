class Logistica {
  criarTransporte() {
    throw new Error("Método não implementado");
  }

  entregarCarga() {
    const transporte = this.criarTransporte();
    transporte.entregar();
  }
}

module.exports = Logistica;
