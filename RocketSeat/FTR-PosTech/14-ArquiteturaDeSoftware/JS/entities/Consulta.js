class Consulta {
  constructor(id, date, time, doctor, patient, reason, status, notes) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.doctor = doctor;
    this.patient = patient;
    this.reason = reason;
    this.status = status;
    this.notes = notes;
  }
}

module.exports = Consulta;
