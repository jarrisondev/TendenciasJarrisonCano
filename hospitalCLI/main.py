from models import Enums
from models import HumanResources, Administrative, Patient, Hospital
from service import login
from routes import router
from utils import log, createHospital

hospital = createHospital.createHospital()

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
