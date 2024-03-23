from utils import log
from models import Hospital, HumanResources
from service import humanResources


def HumanResourcesRoute(
    user: HumanResources.HumanResources, hospital: Hospital.Hospital
):

    while True:
        option = log.inputQuestion(
            "1. Registrar Empleado \n2. Ver Empleados \n3. Salir \n"
        )

        if option == "1":
            humanResources.createUser(user, hospital)
        elif option == "2":
            humanResources.printEmployees(user, hospital)
        elif option == "3":
            break
        else:
            log.printError("Opcion no valida")
