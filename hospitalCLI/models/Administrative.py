from models import Enums
from utils import log
from models import Person, Hospital


class Administrative(Person.Person):
    def __init__(
        self,
        id,
        name,
        username,
        password,
        email,
        phone,
        birthDate,
        address,
    ):
        super().__init__(
            id,
            name,
            Enums.Roles.administrative,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def createPatient(
        self,
        id,
        name,
        birthDate,
        gender,
        address,
        phone,
        email,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelationship,
        medicalInsuranceName,
        medicalInsuranceNumber,
        medicalInsuranceStatus,
        medicalInsuranceExpirationDate,
    ):
        return Enums.Patient(
            id,
            name,
            birthDate,
            gender,
            address,
            phone,
            email,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactRelationship,
            medicalInsuranceName,
            medicalInsuranceNumber,
            medicalInsuranceStatus,
            medicalInsuranceExpirationDate,
        )

    def printPatients(self, hospital: Hospital.Hospital):
        patients = hospital.getPatients()
        for patient in patients:
            log.printInfo(f"Nombre: {patient.name}")
