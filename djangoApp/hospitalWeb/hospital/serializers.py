from rest_framework import serializers
from hospital.models import Patient, Employee, Medicine, GENDER, CONTACT_RELATIONSHIP


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"

    def create(self, validated_data):
        return Patient.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.birthDate = validated_data.get("birthDate", instance.birthDate)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.email = validated_data.get("email", instance.email)
        instance.address = validated_data.get("address", instance.address)
        instance.emergencyContactName = validated_data.get(
            "emergencyContactName", instance.emergencyContactName
        )
        instance.emergencyContactPhone = validated_data.get(
            "emergencyContactPhone", instance.emergencyContactPhone
        )
        instance.gender = validated_data.get("gender", instance.gender)
        instance.emergencyContactRelationship = validated_data.get(
            "emergencyContactRelationship", instance.emergencyContactRelationship
        )
        instance.medicalInsuranceName = validated_data.get(
            "medicalInsuranceName", instance.medicalInsuranceName
        )
        instance.medicalInsuranceNumber = validated_data.get(
            "medicalInsuranceNumber", instance.medicalInsuranceNumber
        )
        instance.medicalInsuranceStatus = validated_data.get(
            "medicalInsuranceStatus", instance.medicalInsuranceStatus
        )
        instance.medicalInsuranceExpirationDate = validated_data.get(
            "medicalInsuranceExpirationDate", instance.medicalInsuranceExpirationDate
        )

        instance.save()

        return instance


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = "__all__"

    def create(self, validated_data):
        return Medicine.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.price = validated_data.get("price", instance.price)
        instance.quantity = validated_data.get("quantity", instance.quantity)

        instance.save()

        return instance
