from utils import validators


class Person:
    def __init__(
        self, id, name, role, username, password, email, phone, birthDate, address
    ):

        self.name: str = validators.stringValidator(name)
        self.id: int = id
        self.email: str = validators.emailValidator(email)
        self.phone: str = validators.phoneValidator(phone)
        self.birthDate: str = validators.birthDateValidator(birthDate)
        self.address: str = validators.addressValidator(address)
        self.role: str = validators.roleValidator(role)
        self.username: str = validators.usernameValidator(username)
        self.password: str = validators.passwordValidator(password)
