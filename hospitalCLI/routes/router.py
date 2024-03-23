from routes import administrativeRoute, informationSupportRoute, humanResourcesRoute
from models import Enums


def Router(user, hospital):

    if user.role == Enums.Roles.humanResources:
        humanResourcesRoute.HumanResourcesRoute(user, hospital)
    elif user.role == Enums.Roles.administrative:
        administrativeRoute.AdministrativeRoute(user, hospital)
    elif user.role == Enums.Roles.informationSupport:
        informationSupportRoute.InformationSupportRoute(user, hospital)
    elif user.role == Enums.Roles.nurse:
        print("Bienvenido enfermera")
    elif user.role == Enums.Roles.doctor:
        print("Bienvenido doctor")

    else:
        raise Exception("Rol no valido")
