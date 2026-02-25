const WorkingHours = require("../value-objects/Workinghours");

class Doctor {
  constructor(id, rcm, name, specialties, phone) {
    this.id = id;
    this.rcm = rcm;
    this.name = name;
    this.specialties = specialties;
    this.phone = phone;
    this.workingHours = new WorkingHours();
  }

  addWorkingHours(day, timeSlot) {
    this.workingHours.addHours(day, timeSlot);
  }

  removeWorkingHours(day, timeSlot) {
    this.workingHours.removeHours(day, timeSlot);
  }

  listWorkingHours() {
    return this.workingHours.listHours();
  }
}

module.exports = Doctor;
