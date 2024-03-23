from models import Enums
from utils import log
from models import Hospital, HumanResources
from utils import search


# create user
def selectRole():
    newRole = Enums.Roles.administrative

    while True:
        log.printInfo(
            "1. Administrativo\n2. Soporte de informacion\n3. Enfermero\n4. Doctor \n5. Recursos Humanos"
        )
        role = log.inputQuestion("Ingrese el rol: ")
        if role == "1":
            newRole = Enums.Roles.administrative
            break
        elif role == "2":
            newRole = Enums.Roles.informationSupport
            break
        elif role == "3":
            newRole = Enums.Roles.nurse
            break
        elif role == "4":
            newRole = Enums.Roles.doctor
            break
        elif role == "5":
            newRole = Enums.Roles.humanResources
            break
        else:
            log.printError("Opcion no valida")

    return newRole


def createUser(user: HumanResources.HumanResources, hospital: Hospital.Hospital):
    id = int(log.inputOption("Ingrese la cedula: "))
    name = log.inputOption("Ingrese el nombre: ")
    username = log.inputOption("Ingrese el nombre de usuario: ")
    password = log.inputOption("Ingrese la contraseña: ")
    email = log.inputOption("Ingrese el correo: ")
    phone = log.inputOption("Ingrese el telefono: ")
    birthDate = log.inputOption("Ingrese la fecha de nacimiento(dd/mm/yyyy): ")
    address = log.inputOption("Ingrese la direccion: ")
    role = selectRole()

    users = hospital.getEmployees()

    extist = search.userExists(users, username, id)

    if extist != None:
        log.printError("El usuario ya existe")
        return None

    try:
        newUser: Enums.Person = user.createPerson(
            id, name, role, username, password, email, phone, birthDate, address
        )
    except Exception as error:
        log.printError(error)
        return None

    if newUser.role == Enums.Roles.administrative:
        hospital.administratives.append(newUser)
    elif newUser.role == Enums.Roles.informationSupport:
        hospital.informationSupports.append(newUser)
    elif newUser.role == Enums.Roles.nurse:
        hospital.nurses.append(newUser)
    elif newUser.role == Enums.Roles.doctor:
        hospital.doctors.append(newUser)
    elif newUser.role == Enums.Roles.humanResources:
        hospital.humanResources.append(newUser)

    log.printSuccess("Usuario creado con exito")


# view employees
def printEmployees(user: HumanResources.HumanResources, hospital: Hospital.Hospital):
    user.printEmployees(hospital)
