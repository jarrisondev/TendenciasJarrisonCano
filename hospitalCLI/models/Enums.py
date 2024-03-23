from typing import List
from utils import validators
from models import Patient, HumanResources, Administrative, InformationSupport, Medicine


class Roles:
    administrative = "Administrativo"
    informationSupport = "Soporte de informacion"
    nurse = "Enfermero"
    doctor = "Doctor"
    humanResources = "Recursos Humanos"


class Gender:
    female = "Femenino"
    male = "Masculino"
