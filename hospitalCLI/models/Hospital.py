from typing import List
from models import (
    Patient,
    HumanResources,
    Administrative,
    InformationSupport,
    Medicine,
    Person,
)


class Hospital:
    def __init__(self):
        self.patients: List[Patient.Patient] = []
        self.humanResources: List[HumanResources.HumanResources] = []
        self.administratives: List[Administrative.Administrative] = []
        self.informationSupports: List[InformationSupport.InformationSupport] = []
        self.nurses = []
        self.doctors = []
        self.medicines: List[Medicine.Medicine] = []

    def getEmployees(self):
        employees: Person.Person = [
            *self.humanResources,
            *self.administratives,
            *self.informationSupports,
            *self.nurses,
            *self.doctors,
        ]
        return employees

    def getPatients(self):
        return self.patients

    def getMedicines(self):
        return self.medicines

    def getMedicineByName(self, name):
        for medicine in self.medicines:
            if medicine.name == name:
                return medicine
        return None
