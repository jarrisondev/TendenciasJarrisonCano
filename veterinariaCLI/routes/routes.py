from models import model
from utils import log
from service import humanResources


def HumanResourcesRoute(user: model.HumanResources, hospital: model.Hospital):

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


def AdministrativeRoute(user: model.HumanResources, hospital: model.Hospital):

    while True:
        option = log.inputQuestion("1. Registrar Paciente \n2. Salir \n")

        if option == "1":
            humanResources.createUser(user, hospital)
        elif option == "2":
            break
        else:
            log.printError("Opcion no valida")


def Router(user, hospital):

    if user.role == model.Roles.humanResources:
        HumanResourcesRoute(user, hospital)
    elif user.role == model.Roles.administrative:
        print("Bienvenido")
    elif user.role == model.Roles.informationSupport:
        print("Bienvenido")
    elif user.role == model.Roles.nurse:
        print("Bienvenido")
    elif user.role == model.Roles.doctor:
        print("Bienvenido")

    else:
        raise Exception("Rol no valido")
