from models import Enums
from utils import log
from models import Person, Hospital, Patient


class Doctor(Person.Person):
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
            Enums.Roles.doctor,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def addMedicineToPatient(
        self, patient: Patient.Patient, medicine: Hospital.Medicine
    ):
        patient.addMedicine(medicine)
