class Exame {
  constructor(id, type, result, date, location, responsibleDoctor, patient) {
    this.id = id;
    this.type = type;
    this.result = result;
    this.date = date;
    this.location = location;
    this.responsibleDoctor = responsibleDoctor;
    this.patient = patient;
  }
}

module.exports = Exame;
