import uuid

from utils import validators, log


class Medicine:
    def __init__(self, name, price, quantity):
        self.id = uuid.uuid4()
        self.name = validators.stringValidator(name)
        self.price = validators.integerValidator(price)
        self.quantity = validators.integerValidator(quantity)

    def setQuantity(self, quantity):
        self.quantity = quantity

    def setPrice(self, price):
        self.price = price

    def showMedicine(self):
        log.printInfo("-------------------------------------------------")
        log.printInfo(f"Nombre: {self.name}")
        log.printInfo(f"Precio: {self.price}")
        log.printInfo(f"Cantidad: {self.quantity}")
        log.printInfo("-------------------------------------------------")
