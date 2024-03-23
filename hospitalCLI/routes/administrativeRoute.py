from utils import log
from models import Administrative, Hospital
from service import administrative


def AdministrativeRoute(
    user: Administrative.Administrative, hospital: Hospital.Hospital
):

    while True:
        option = log.inputQuestion(
            "1. Registrar Paciente \n2. Ver pacientes \n3. Salir"
        )

        if option == "1":
            administrative.createPatient(user, hospital)
        elif option == "2":
            administrative.printPatients(user, hospital)
        elif option == "3":
            break
        else:
            log.printError("Opcion no valida")
