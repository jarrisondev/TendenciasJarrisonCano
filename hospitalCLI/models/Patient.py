import datetime
from models import Medicine, Doctor
from utils import validators, log
import uuid


class Patient:
    def __init__(
        self,
        id,
        name,
        birthDate,
        gender,
        address,
        phone,
        email,
        # emergency Contact,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelationship,
        # medacal Insurance,
        medicalInsuranceName,
        medicalInsuranceNumber,
        medicalInsuranceStatus,
        medicalInsuranceExpirationDate,
    ):
        self.id: int = id
        self.name: str = validators.stringValidator(name)
        self.birthDate: str = validators.birthDateValidator(birthDate)
        self.address: str = validators.addressValidator(address)
        self.phone: str = validators.phoneValidator(phone)
        self.email: str = validators.emailValidator(email)
        self.gender: str = validators.genderValidator(gender)
        self.emergencyContactName: str = validators.stringValidator(
            emergencyContactName
        )
        self.emergencyContactPhone: str = validators.phoneValidator(
            emergencyContactPhone
        )
        self.emergencyContactRelationship: str = validators.stringValidator(
            emergencyContactRelationship
        )
        self.medicalInsuranceName: str = validators.stringValidator(
            medicalInsuranceName
        )
        self.medicalInsuranceNumber: int = validators.integerValidator(
            medicalInsuranceNumber
        )
        self.medicalInsuranceStatus: bool = validators.booleanValidator(
            medicalInsuranceStatus
        )
        self.medicalInsuranceExpirationDate: str = validators.dateValidator(
            medicalInsuranceExpirationDate
        )

        self.clinicHistory = {
            "medicines": [],
            "consultations": [],
            "treatments": [],
        }

    def getAge(self):
        return datetime.date.today().year - int(self.birthDate[6:])

    def addMedicine(self, medicine: Medicine.Medicine, doctor: Doctor.Doctor):
        dose = log.inputOption("Ingrese la dosis del medicamento: ")
        duration = log.inputOption("Ingrese la duracion del tratamiento: ")

        newMedicine = {
            "id": medicine.id,
            "doctorId": doctor.id,
            "dose": dose,
            "duration": duration,
        }

        self.clinicHistory["medicines"].append(newMedicine)

    def addConsultation(self, doctor: Doctor.Doctor):

        reason = log.inputOption("Ingrese la razon de la consulta: ")
        diagnosis = log.inputOption("Ingrese el diagnostico: ")
        treatment = log.inputOption("Ingrese el tratamiento: ")

        newConsultation = {
            "id": uuid.uuid4(),
            "date": datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            "doctorId": doctor.id,
            "reason": reason,
            "diagnosis": diagnosis,
            "treatment": treatment,
        }

        self.clinicHistory["consultations"].append(newConsultation)
