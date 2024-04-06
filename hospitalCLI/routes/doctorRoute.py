from utils import log
from models import Administrative, Hospital
from service import administrative


def doctorRoute(user: Administrative.Administrative, hospital: Hospital.Hospital):

    while True:
        option = log.inputQuestion(
            "1.Crear historia clinica\n2.Ver historias clinicas\n"
        )

        if option == "1":
            administrative.createPatient(user, hospital)
        elif option == "2":
            administrative.printPatients(user, hospital)
        elif option == "3":
            break
        else:
            log.printError("Opcion no valida")
