class Caminhao {
  entregar() {
    console.log("Entregando por caminhão");
  }
}

class Navio {
  entregar() {
    console.log("Entregando por navio");
  }
}

const tipoDeTransporte = "caminhao";

let transporte;

if (tipoDeTransporte === "caminhao") {
  transporte = new Caminhao();
} else if (tipoDeTransporte === "navio") {
  transporte = new Navio();
}

transporte.entregar();
