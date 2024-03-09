import datetime
from typing import List
from utils import validators

Roles = {
    "administrative": 1,
    "informationSupport": 2,
    "nurse": 3,
    "doctor": 4,
    "humanResources": 5,
}


class Person:
    def __init__(
        self, id, name, role, username, password, email, phone, birthDate, address
    ):
        self.name: str = validators.stringValidator(name)
        self.id: int = id
        self.email: str = validators.emailValidator(email)
        self.phone: int = validators.phoneValidator(phone)
        self.birthDate: str = validators.birthvalidators.DateValidator(birthDate)
        self.address: str = validators.addressValidator(address)
        self.role: str = validators.roleValidator(role)
        self.username: str = validators.usernameValidator(username)
        self.password: str = validators.passwordValidator(password)


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
        self.birthDate: str = validators.birthvalidators.DateValidator(birthDate)
        self.address: str = validators.addressValidator(address)
        self.phone: int = validators.phoneValidator(phone)
        self.email: str = validators.emailValidator(email)
        self.emergencyContactName: str = validators.stringValidator(
            emergencyContactName
        )
        self.emergencyContactPhone: int = validators.phoneValidator(
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


class HumanResources(Person):
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
            Roles["humanResources"],
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def createPerson(
        id, name, role, username, password, email, phone, birthDate, address
    ):
        return Person(
            id, name, role, username, password, email, phone, birthDate, address
        )


class Administrative(Person):
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
            Roles["administrative"],
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def createPatient(
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
    ):
        return Patient(
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
        )


class InformationSupport(Person):
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
            Roles["informationSupport"],
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )


class Medicine:
    pass


class Hospital:
    def __init__(self):
        self.patients: List[Patient] = []
        self.humanResources: List[HumanResources] = []
        self.administratives: List[Administrative] = []
        self.informationSupports: List[InformationSupport] = []
        self.nurses = []
        self.doctors = []
        self.medicines: List[Medicine] = []

    def getEmployees(self):
        employees: Person = []
        employees.append(self.administratives)
        employees.append(self.humanResources)
        employees.append(self.informationSupports)
        employees.append(self.nurses)
        employees.append(self.doctors)

        return employees
