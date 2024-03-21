from models import model
from service import login
from routes import routes
from utils import log

hospital = model.Hospital()
humanResources1 = model.HumanResources(
    id=1,
    name="Jarrison Cano",
    username="jarrison",
    address="calle 123",
    birthDate="28/01/2003",
    email="jarrison@correo.com",
    password="Jarrison123",
    phone="1234567890",
)
administrative1 = model.Administrative(
    id=2,
    name="Juan Perez",
    username="juan",
    address="calle 123",
    birthDate="28/01/2003",
    email="juan@correo.com",
    password="JuanPerez123",
    phone="1234567890",
)

patient1 = model.Patient(
    id=3,
    name="Camilo",
    address="calle 123",
    birthDate="28/01/2003",
    email="camilo@correo.com",
    phone="1234567890",
    gender=model.Gender.male,
    emergencyContactName="Magdali",
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
            routes.Router(user, hospital)

    elif option == "2":
        break
    else:
        log.printError("Opcion no valida")
        continue
