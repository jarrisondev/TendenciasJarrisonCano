from models import model
from typing import List


def userExists(users: List[model.Person], username, id):
    for user in users:
        if user.username == username or user.id == id:
            return user
    return None


def patientExists(patients: List[model.Patient], id):
    for patient in patients:
        if patient.id == id:
            return patient
    return None
