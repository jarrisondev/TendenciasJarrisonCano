from utils import log
from models import InformationSupport, Hospital
from service import informationSupport


def InformationSupportRoute(
    user: InformationSupport.InformationSupport, hospital: Hospital.Hospital
):

    while True:
        option = log.inputQuestion(
            "1. Registrar medicamento \n2. Ver medicamentos \n3. Actualizar medicamento \n4. Salir"
        )

        if option == "1":
            informationSupport.createMedicine(user, hospital)
        elif option == "2":
            informationSupport.printMedicines(user, hospital)
        elif option == "3":
            print("Actualizar medicamento")
            informationSupport.uptadeMedicine(user, hospital)
        elif option == "4":
            break
        else:
            log.printError("Opcion no valida")
