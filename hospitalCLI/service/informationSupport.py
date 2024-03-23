from utils import log
from models import Person, InformationSupport, Hospital


def createMedicine(
    user: InformationSupport.InformationSupport, hospital: Hospital.Hospital
):
    name: str = log.inputOption("Ingrese el nombre: ")
    quantity: int = int(log.inputOption("Ingrese cantidad disponible: "))
    price: int = int(log.inputOption("Ingrese el precio:"))

    try:
        newMedicine: Person.Person = user.createMedicine(
            name=name,
            price=price,
            quantity=quantity,
        )
    except Exception as error:
        log.printError(error)
        return None

    hospital.medicines.append(newMedicine)
    log.printSuccess("Medicina creada con exito")


def printMedicines(
    user: InformationSupport.InformationSupport, hospital: Hospital.Hospital
):
    if len(hospital.medicines) == 0:
        log.printError("No hay medicamentos registrados")
        return
    user.printMedicines(hospital.getMedicines())


def uptadeMedicine(
    user: InformationSupport.InformationSupport, hospital: Hospital.Hospital
):
    if len(hospital.medicines) == 0:
        log.printError("No hay medicamentos registrados")
        return

    while True:
        medicineName = log.inputOption("Ingrese el nombre del medicamento:")
        medicine = hospital.getMedicineByName(medicineName)

        if medicine == None:
            log.printError("Medicamento no encontrado")
            continue
        else:
            break

    while True:
        option = log.inputQuestion("Que desea actualizar? (1. Cantidad, 2. Precio)")
        if option == "1":
            break
        elif option == "2":
            break
        else:
            log.printError("Opcion no valida")
            continue

    if option == "1":
        newQuantity = int(log.inputOption("Ingrese la nueva cantidad: "))
        user.updateMedicine(medicine, newQuantity, medicine.price)
    elif option == "2":
        newPrice = int(log.inputOption("Ingrese el nuevo precio: "))
        user.updateMedicine(medicine, medicine.quantity, newPrice)

    log.printSuccess("Medicamento actualizado con exito")
