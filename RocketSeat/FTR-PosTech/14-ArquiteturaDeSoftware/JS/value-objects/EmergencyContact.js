class EmergencyContact {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
  }

  equals(otherEmergencyContact) {
    return (
      this.name === otherEmergencyContact.name &&
      this.phone === otherEmergencyContact.phone
    );
  }
}

module.exports = EmergencyContact;
