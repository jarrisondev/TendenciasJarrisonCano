from models import Person, Medicine
from models import Enums


class InformationSupport(Person.Person):
    def __init__(
        self,
        id,
        name,
        username,
        password,
        email,
        phone,
        birthDate,
        address,
    ):
        super().__init__(
            id,
            name,
            Enums.Roles.informationSupport,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def createMedicine(self, name, price, quantity):
        return Medicine.Medicine(name, price, quantity)

    def printMedicines(self, medicines):
        for medicine in medicines:
            medicine.showMedicine()

    def updateMedicine(self, medicine, quantity, price):
        medicine.setQuantity(quantity)
        medicine.setPrice(price)
