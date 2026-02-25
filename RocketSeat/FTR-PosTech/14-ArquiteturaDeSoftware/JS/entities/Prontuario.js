class Prontuario {
  constructor(id, patient) {
    this.id = id;
    this.patient = patient;
    this.diagnosis = [];
    this.treatment = [];
    this.medications = [];
  }

  addDiagnosis(diagnosis) {
    this.diagnosis.push(diagnosis);
    console.log(`Diagnóstico adicionado ao prontuário: ${diagnosis}`);
  }

  addTreatment(treatment) {
    this.treatment.push(treatment);
    console.log(`Tratamento adicionado ao prontuário: ${treatment}`);
  }

  addMedication(medication) {
    this.medications.push(medication);
    console.log(`Medicamento adicionado ao prontuário: ${medication}`);
  }
}

module.exports = Prontuario;
