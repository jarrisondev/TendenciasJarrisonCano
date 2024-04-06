from models import Enums
from models import (
    HumanResources,
    Administrative,
    Patient,
    Hospital,
    InformationSupport,
    Doctor,
)


def createHospital():
    hospital = Hospital.Hospital()
    humanResources1 = HumanResources.HumanResources(
        id=1,
        name="Jarrison Cano",
        username="jarrison",
        address="calle 123",
        birthDate="28/01/2003",
        email="jarrison@correo.com",
        password="Jarrison123",
        phone="1234567890",
    )
    administrative1 = Administrative.Administrative(
        id=2,
        name="Juan Perez",
        username="juan",
        address="calle 123",
        birthDate="28/01/2003",
        email="juan@correo.com",
        password="JuanPerez123",
        phone="1234567890",
    )
    patient1 = Patient.Patient(
        id=3,
        name="Camilo",
        address="calle 123",
        birthDate="28/01/2003",
        email="camilo@correo.com",
        phone="1234567890",
        gender=Enums.Gender.male,
        emergencyContactName="Maria",
        emergencyContactPhone="1234567890",
        emergencyContactRelationship="Madre",
        medicalInsuranceName="Sura",
        medicalInsuranceNumber=123456,
        medicalInsuranceStatus=True,
        medicalInsuranceExpirationDate="28/01/2026",
    )

    informationSupport1 = InformationSupport.InformationSupport(
        id=4,
        name="Jaime",
        username="jaime",
        address="calle 123",
        birthDate="28/01/2003",
        email="jaime@correo.com",
        password="JaimeH123",
        phone="1234567890",
    )

    doctor1 = Doctor.Doctor(
        id=2,
        name="Doctor 1",
        username="doctor1",
        address="calle 123",
        birthDate="28/01/2003",
        email="doctor1@correo.com",
        password="Doctor1234",
        phone="1234567890",
    )

    hospital.humanResources.append(humanResources1)
    hospital.administratives.append(administrative1)
    hospital.patients.append(patient1)
    hospital.informationSupports.append(informationSupport1)
    hospital.doctors.append(doctor1)

    return hospital
