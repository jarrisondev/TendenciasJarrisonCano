import datetime
from utils import validators


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

    def getAge(self):
        return datetime.date.today().year - int(self.birthDate[6:])
