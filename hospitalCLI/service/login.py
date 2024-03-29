from models import Hospital
from utils import log


def loginService(hospital: Hospital.Hospital, username, password):
    user = None
    employees = hospital.getEmployees()

    for person in employees:
        if person.username == username and person.password == password:
            user = person
            log.printSuccess(f"Bienvenido {user.name}")
            break
    if user == None:
        log.printError("Usuario o contraseña incorrectos")

    return user
