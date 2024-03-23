from models import Enums
from models import HumanResources, Administrative, Patient, Hospital
from service import login
from routes import router
from utils import log

hospital = Hospital.Hospital()
humanResources1 = HumanResources.HumanResources(
    id=1,
    name="Jarrison Cano",
    username="jarrison",
    address="calle 123",
    birthDate="28/01/2003",
    email="jarrison@correo.com",
    password="Jarrison123",
    phone="1234567890",
)
administrative1 = Administrative.Administrative(
    id=2,
    name="Juan Perez",
    username="juan",
    address="calle 123",
    birthDate="28/01/2003",
    email="juan@correo.com",
    password="JuanPerez123",
    phone="1234567890",
)
patient1 = Patient.Patient(
    id=3,
    name="Camilo",
    address="calle 123",
    birthDate="28/01/2003",
    email="camilo@correo.com",
    phone="1234567890",
    gender=Enums.Gender.male,
    emergencyContactName="Maria",
    emergencyContactPhone="1234567890",
    emergencyContactRelationship="Madre",
    medicalInsuranceName="Sura",
    medicalInsuranceNumber=123456,
    medicalInsuranceStatus=True,
    medicalInsuranceExpirationDate="28/01/2026",
)

hospital.humanResources.append(humanResources1)
hospital.administratives.append(administrative1)
hospital.patients.append(patient1)


while True:
    option = log.inputQuestion("1. iniciar sesion\n2. salir\n")

    if option == "1":
        username = log.inputOption("Ingrese su usuario: ")
        password = log.inputOption("Ingrese su contraseña: ")

        user = login.loginService(hospital, username, password)
        if user == None:
            continue
        else:
            router.Router(user, hospital)

    elif option == "2":
        break
    else:
        log.printError("Opcion no valida")
        continue
