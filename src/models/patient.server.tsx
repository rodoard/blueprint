import config from "config"

export class Patient {
  id: string
  constructor(id: string) {
    this.id = id
  }
}

const defaultPatient = new Patient(config.DEFAULT_PATIENT_ID)
const PATIENTS = {
  [config.DEFAULT_PATIENT_ID]: defaultPatient
}

export function getPatient(patientId: string): Patient | null {
  return PATIENTS[patientId]
}