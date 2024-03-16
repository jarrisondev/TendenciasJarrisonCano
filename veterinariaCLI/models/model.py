import datetime
from typing import List
from utils import validators, log


class Roles:
    administrative = "Administrativo"
    informationSupport = "Soporte de informacion"
    nurse = "Enfermero"
    doctor = "Doctor"
    humanResources = "Recursos Humanos"


class Gender:
    female = "Femenino"
    male = "Masculino"


class Person:
    def __init__(
        self, id, name, role, username, password, email, phone, birthDate, address
    ):

        self.name: str = validators.stringValidator(name)
        self.id: int = id
        self.email: str = validators.emailValidator(email)
        self.phone: str = validators.phoneValidator(phone)
        self.birthDate: str = validators.birthDateValidator(birthDate)
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
            Roles.humanResources,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def createPerson(
        self,
        id,
        name,
        role,
        username,
        password,
        email,
        phone,
        birthDate,
        address,
    ):

        return Person(
            id,
            name,
            role,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def printEmployees(self, hospital):
        employees = hospital.getEmployees()
        for employee in employees:
            log.printInfo(f"Nombre: {employee.name} - Rol: {employee.role}")


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
            Roles.administrative,
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
        return Patient(
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
            Roles.informationSupport,
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
        employees: Person = [
            *self.humanResources,
            *self.administratives,
            *self.informationSupports,
            *self.nurses,
            *self.doctors,
        ]
        return employees

    def getPatients(self):
        return self.patients
