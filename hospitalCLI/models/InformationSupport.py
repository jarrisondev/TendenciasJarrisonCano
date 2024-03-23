from models import Person
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
