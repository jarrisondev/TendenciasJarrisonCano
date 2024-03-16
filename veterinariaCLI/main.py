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

hospital.humanResources.append(humanResources1)


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
