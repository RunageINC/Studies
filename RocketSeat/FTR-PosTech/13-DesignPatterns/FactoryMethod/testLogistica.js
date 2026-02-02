const LogisticaMaritima = require("./logistica/LogisticaMaritima");
const LogisticaTerrestre = require("./logistica/LogisticaTerrestre");

const tipoDeTransporte = "maritimo";

let transporte;

if (tipoDeTransporte === "maritimo") {
  transporte = new LogisticaMaritima();
} else if (tipoDeTransporte === "terrestre") {
  transporte = new LogisticaTerrestre();
}

transporte.entregarCarga();
