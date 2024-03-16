import datetime
from models import model


def stringValidator(value: str):
    if value != "" and value != None:
        return value
    else:
        raise Exception("El valor ingresado no es una cadena de texto")


def integerValidator(value: int):
    if value != None and isinstance(value, int):
        return value
    else:
        raise Exception("El valor ingresado no es un numero")


def booleanValidator(value: bool):
    if value == True or value == False:
        return value
    else:
        raise Exception("El valor ingresado no es un booleano")


def dateValidator(date: str):
    if (
        len(date) == 10
        and date[2] == "/"
        and date[5] == "/"
        and int(date[0:2]) < 32
        and int(date[3:5]) < 13
        and date[6:].isdigit()
        and len(date[6:]) == 4
    ):
        return date
    else:
        raise Exception("La fecha no es valida")


def birthDateValidator(birthDate: str):
    today = datetime.date.today()
    if dateValidator(birthDate) and today.year - int(birthDate[6:]) <= 150:
        return birthDate
    else:
        raise Exception("La fecha de nacimiento no es valida")


def phoneValidator(phone: str):
    if len(phone) <= 10 and len(phone) >= 1 and phone.isdigit():
        return phone
    else:
        raise Exception("El numero de telefono no es valido")


def emailValidator(email: str):
    if "@" in email and "." in email:
        return email
    else:
        raise Exception("El correo no es valido")


def usernameValidator(username: str):
    if len(username) > 0 and len(username) <= 15:
        return username
    else:
        raise Exception("El username no es valido")


def passwordValidator(password: str):
    if (
        len(password) > 7
        and any(char.isdigit() for char in password)
        and any(char.isupper() for char in password)
    ):
        return password
    else:
        raise Exception("La contraseña no es valida")


def genderValidator(gender: str):
    if gender == "M" or gender == "F":
        return gender
    else:
        raise Exception("El genero no es valido")


def addressValidator(address: str):
    if len(address) <= 30:
        return address
    else:
        raise Exception("La direccion es muy larga")


def roleValidator(role: str):
    if (
        role == model.Roles.administrative
        or role == model.Roles.informationSupport
        or role == model.Roles.nurse
        or role == model.Roles.doctor
        or role == model.Roles.humanResources
    ):
        return role
    else:
        raise Exception("El rol no es valido")


def genderValidator(gender: str):
    if gender == model.Gender.male or gender == model.Gender.female:
        return gender
    else:
        raise Exception("El genero no es valido")
