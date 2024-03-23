from utils import log
from models import Person
from models import Enums


class HumanResources(Person.Person):

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
            Enums.Roles.humanResources,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def createPerson(
        self,
        id,
        name,
        role,
        username,
        password,
        email,
        phone,
        birthDate,
        address,
    ):

        return Person.Person(
            id,
            name,
            role,
            username,
            password,
            email,
            phone,
            birthDate,
            address,
        )

    def printEmployees(self, hospital):
        employees = hospital.getEmployees()
        for employee in employees:
            log.printInfo(f"Nombre: {employee.name} - Rol: {employee.role}")
