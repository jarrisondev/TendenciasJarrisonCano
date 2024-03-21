from utils import log
from models import model
from utils import search


# create user
def selectRole():
    newRole = model.Roles.administrative

    while True:
        log.printInfo(
            "1. Administrativo\n2. Soporte de informacion\n3. Enfermero\n4. Doctor \n5. Recursos Humanos"
        )
        role = log.inputQuestion("Ingrese el rol: ")
        if role == "1":
            newRole = model.Roles.administrative
            break
        elif role == "2":
            newRole = model.Roles.informationSupport
            break
        elif role == "3":
            newRole = model.Roles.nurse
            break
        elif role == "4":
            newRole = model.Roles.doctor
            break
        elif role == "5":
            newRole = model.Roles.humanResources
            break
        else:
            log.printError("Opcion no valida")

    return newRole


def createUser(user: model.HumanResources, hospital: model.Hospital):
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
        newUser: model.Person = user.createPerson(
            id, name, role, username, password, email, phone, birthDate, address
        )
    except Exception as error:
        log.printError(error)
        return None

    if newUser.role == model.Roles.administrative:
        hospital.administratives.append(newUser)
    elif newUser.role == model.Roles.informationSupport:
        hospital.informationSupports.append(newUser)
    elif newUser.role == model.Roles.nurse:
        hospital.nurses.append(newUser)
    elif newUser.role == model.Roles.doctor:
        hospital.doctors.append(newUser)
    elif newUser.role == model.Roles.humanResources:
        hospital.humanResources.append(newUser)

    log.printSuccess("Usuario creado con exito")


# view employees
def printEmployees(user: model.HumanResources, hospital: model.Hospital):
    user.printEmployees(hospital)
