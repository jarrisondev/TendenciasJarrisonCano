from models import Patient, Person
from typing import List


def userExists(users: List[Person.Person], username, id):
    for user in users:
        if user.username == username or user.id == id:
            return user
    return None


def patientExists(patients: List[Patient.Patient], id):
    for patient in patients:
        if patient.id == id:
            return patient
    return None
