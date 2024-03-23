from models import Enums
from utils import log
from models import Person, Administrative, Hospital
from utils import search


def selectGender():
    newGender = Enums.Gender.male

    while True:
        log.printInfo("1. Másculino\n2. Femenino")
        role = log.inputQuestion("Ingrese el genero: ")
        if role == "1":
            newGender = Enums.Gender.male
            break
        elif role == "2":
            newGender = Enums.Gender.female
            break

        else:
            log.printError("Opcion no valida")

    return newGender


def selectInsuranceStatus():
    newStatus = False

    while True:
        log.printInfo("1. Activo\n2. Inactivo")
        role = log.inputQuestion("Ingrese el estado de la póliza: ")
        if role == "1":
            newStatus = True
            break
        elif role == "2":
            newStatus = False
            break

        else:
            log.printError("Opcion no valida")

    return newStatus


def createPatient(user: Administrative.Administrative, hospital: Hospital.Hospital):
    id: int = int(log.inputOption("Ingrese la cedula: "))
    name: str = log.inputOption("Ingrese el nombre: ")
    birthDate: str = log.inputOption("Ingrese la fecha de nacimiento(dd/mm/yyyy): ")
    address: str = log.inputOption("Ingrese la direccion: ")
    phone: str = log.inputOption("Ingrese el telefono: ")
    email: str = log.inputOption("Ingrese el correo: ")
    gender: str = selectGender()
    emergencyContactName: str = log.inputOption(
        "Ingrese el nombre del contacto de emergencia: "
    )
    emergencyContactPhone: str = log.inputOption(
        "Ingrese el telefono del contacto de emergencia: "
    )
    emergencyContactRelationship: str = log.inputOption(
        "Ingrese la relacion con el contacto de emergencia: "
    )
    medicalInsuranceName: str = log.inputOption(
        "Ingrese el nombre de la compañia de seguros: "
    )
    medicalInsuranceNumber: int = int(log.inputOption("Número de póliza: "))
    medicalInsuranceStatus: bool = selectInsuranceStatus()
    medicalInsuranceExpirationDate: str = log.inputOption(
        "Ingrese la fecha de finalización de la póliza(dd/mm/yyyy): "
    )

    patients = hospital.getPatients()
    extist = search.patientExists(patients, id)

    if extist != None:
        log.printError("El paciente ya existe")
        return None

    try:
        newPatient: Person.Person = user.createPatient(
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
    except Exception as error:
        log.printError(error)
        return None

    hospital.patients.append(newPatient)
    log.printSuccess("Usuario creado con exito")


def printPatients(user: Administrative.Administrative, hospital: Hospital.Hospital):
    user.printPatients(hospital)
