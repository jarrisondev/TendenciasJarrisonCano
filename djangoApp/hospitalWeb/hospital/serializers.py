from rest_framework import serializers
from hospital.models import (
    Patient,
    Employee,
    Medicine,
    Order,
    MedicineOrder,
    ProcedureOrder,
    DiagnosticHelpOrder,
)


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


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.username = validated_data.get("username", instance.username)
        instance.password = validated_data.get("password", instance.password)
        instance.email = validated_data.get("email", instance.email)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.birthDate = validated_data.get("birthDate", instance.birthDate)
        instance.address = validated_data.get("address", instance.address)
        instance.role = validated_data.get("role", instance.role)

        instance.save()

        return instance


class MedicineOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineOrder
        fields = "__all__"

    def create(self, validated_data):
        return MedicineOrder.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.medicine = validated_data.get("medicine", instance.medicine)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.order = validated_data.get("order", instance.order)
        instance.save()
        return instance


class ProcedureOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcedureOrder
        fields = "__all__"

    def create(self, validated_data):
        return ProcedureOrder.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.order = validated_data.get("order", instance.order)
        instance.price = validated_data.get("price", instance.price)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.requireAssistance = validated_data.get(
            "requireAssistance", instance.requireAssistance
        )

        instance.save()
        return instance


class DiagnosticHelpOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticHelpOrder
        fields = "__all__"

    def create(self, validated_data):
        return DiagnosticHelpOrder.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.order = validated_data.get("order", instance.order)
        instance.price = validated_data.get("price", instance.price)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.requireAssistance = validated_data.get(
            "requireAssistance", instance.requireAssistance
        )
        instance.save()
        return instance


class OrderSerializer(serializers.ModelSerializer):
    medicineOrder = MedicineOrderSerializer(many=True, read_only=True)
    procedureOrder = ProcedureOrderSerializer(many=True, read_only=True)
    diagnosticHelpOrder = DiagnosticHelpOrderSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "patient",
            "doctor",
            "createdAt",
            "medicineOrder",
            "procedureOrder",
            "diagnosticHelpOrder",
        ]

    def create(self, validated_data):
        print(validated_data)
        return Order.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.patient = validated_data.get("patient", instance.patient)
        instance.doctor = validated_data.get("doctor", instance.doctor)

        instance.save()
        return instance
