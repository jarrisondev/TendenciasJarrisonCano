from routes import administrativeRoute
from routes import humanResourcesRoute
from models import Enums


def Router(user, hospital):

    if user.role == Enums.Roles.humanResources:
        humanResourcesRoute.HumanResourcesRoute(user, hospital)
    elif user.role == Enums.Roles.administrative:
        administrativeRoute.AdministrativeRoute(user, hospital)
    elif user.role == Enums.Roles.informationSupport:
        print("Bienvenido")
    elif user.role == Enums.Roles.nurse:
        print("Bienvenido")
    elif user.role == Enums.Roles.doctor:
        print("Bienvenido")

    else:
        raise Exception("Rol no valido")
