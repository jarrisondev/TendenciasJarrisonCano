class Person:
    def __init__(self, id, name, age, role, username, password):
        self.id = id
        self.name = name
        self.age = age
        self.role = role
        self.username = username
        self.password = password


class Pet:
    def __init__(self, id, name, age, ownerId, spice, race, features):
        self.id = id
        self.name = name
        self.age = age
        self.ownerId = ownerId
        self.spice = spice
        self.race = race
        self.features = features


class Veterinary:
    def __init__(self):
        self.persons = []
        self.pets = []
        self.clinicalHistory = {}


Roles = {
    "Admin": "Admin",
    "Veterinarian": "Veterinarian",
    "Client": "Client",
}
