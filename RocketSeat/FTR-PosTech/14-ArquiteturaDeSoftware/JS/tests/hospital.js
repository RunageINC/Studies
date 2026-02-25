const Paciente = require("../entities/Paciente");
const Doctor = require("../entities/Doctor");
const Consulta = require("../entities/Consulta");
const Exame = require("../entities/Exame");
const Prontuario = require("../entities/Prontuario");

const Address = require("../value-objects/Address");
const EmergencyContact = require("../value-objects/EmergencyContact");

const address1 = new Address(
  "Rua das Flores",
  123,
  "São Paulo",
  "SP",
  "04101-300",
);

const emergencyContact1 = new EmergencyContact("Maria da Silva", "11999999999");

const paciente1 = new Paciente(
  1,
  "12345678901",
  "João da Silva",
  "1990-01-01",
  "M",
  "O+",
  ["Penicilina"],
  address1,
  "11999999999",
  "joao@example.com",
  emergencyContact1,
  [],
);

const medico1 = new Doctor(
  1,
  "CRM/SP 123456",
  "Dr. João da Silva",
  ["Cardiologista"],
  "11999999999",
);

const consulta1 = new Consulta(
  1,
  "2026-02-25",
  "10:00",
  medico1,
  paciente1,
  "Consulta de rotina",
  "Agendada",
  "Consulta de rotina",
);

const exame1 = new Exame(
  1,
  "Hemograma",
  "Normal",
  "2026-02-25",
  "Lab XYZ",
  medico1,
  paciente1,
);

const prontuario1 = new Prontuario(1, paciente1);

medico1.addWorkingHours("Segunda-feira", "08:00-18:00");
medico1.addWorkingHours("Quarta-feira", "08:00-18:00");
medico1.addWorkingHours("Sexta-feira", "08:00-18:00");

prontuario1.addDiagnosis("Hipertensão arterial");
prontuario1.addTreatment("Medicamento para hipertensão arterial");
prontuario1.addMedication("Metformina");

console.log(paciente1);
console.log(medico1);
console.log(consulta1);
console.log(exame1);
console.log(prontuario1);
