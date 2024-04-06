from django.db import models

# Create your models here.


# Hospital
class Hospital(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


# Person
class Person(models.Model):
    ROLE = {
        ("Doctor", "Doctor"),
        ("Nurse", "Nurse"),
        ("InformationSupport", "InformationSupport"),
        ("Administrative", "Administrative"),
        ("HumanResources", "HumanResources"),
    }

    id = models.AutoField(primary_key=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    birthDate = models.DateField()
    address = models.CharField(max_length=100)
    role = models.CharField(max_length=100, choices=ROLE)


# Medicine
class Medicine(models.Model):
    id = models.AutoField(primary_key=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()


# Patient
class Patient(models.Model):

    GENEDER = {("MALE", "MALE"), ("FEMALE", "FEMALE")}

    CONTACT_RELATIONSHIP = {
        ("Father", "Father"),
        ("Mother", "Mother"),
        ("Brother", "Brother"),
        ("Sister", "Sister"),
        ("Son", "Son"),
        ("Daughter", "Daughter"),
        ("Friend", "Friend"),
        ("Other", "Other"),
    }

    id = models.AutoField(primary_key=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    birthDate = models.DateField()
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    emergencyContactName = models.CharField(max_length=100)
    emergencyContactPhone = models.CharField(max_length=15)
    gender = models.CharField(max_length=100, choices=GENEDER)
    emergencyContactRelationship = models.CharField(
        max_length=100, choices=CONTACT_RELATIONSHIP
    )
    medicalInsuranceName = models.CharField(max_length=100)
    medicalInsuranceNumber = models.IntegerField()
    medicalInsuranceStatus = models.BooleanField()
    medicalInsuranceExpirationDate = models.DateField()
