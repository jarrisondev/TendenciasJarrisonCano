from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hospital.models import (
    Patient,
    Medicine,
    Employee,
    Order,
    MedicineOrder,
    ProcedureOrder,
    DiagnosticHelpOrder,
)
from hospital.serializers import (
    PatientSerializer,
    MedicineSerializer,
    EmployeeSerializer,
    OrderSerializer,
    MedicineOrderSerializer,
    ProcedureOrderSerializer,
    DiagnosticHelpOrderSerializer,
)


class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response(
                {"error": "Please provide both username and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        employee = Employee.objects.filter(username=username, password=password)

        if not employee.exists():
            return Response(
                {"error": "Invalid Credentials"},
                status=status.HTTP_404_NOT_FOUND,
            )

        employee = employee.first()
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)


class PatientView(APIView):

    def get_object(self, pk):
        try:
            return Patient.objects.get(id=pk)
        except Patient.DoesNotExist:
            raise Http404

    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        patient = self.get_object(pk)
        serializer = PatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        patient = self.get_object(pk)
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicineView(APIView):

    def get_object(self, pk):
        try:
            return Medicine.objects.get(id=pk)
        except Medicine.DoesNotExist:
            raise Http404

    def get(self, request):
        medicines = Medicine.objects.all()
        serializer = MedicineSerializer(medicines, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        medicine = self.get_object(pk)
        serializer = MedicineSerializer(medicine, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        medicine = self.get_object(pk)
        medicine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EmployeeView(APIView):

    def get_object(self, pk):
        try:
            return Employee.objects.get(id=pk)
        except Employee.DoesNotExist:
            raise Http404

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        employee = self.get_object(pk)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderView(APIView):

    def get_object(self, pk):
        try:
            return Order.objects.get(id=pk)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        order = self.get_object(pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        order = self.get_object(pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicineOrderView(APIView):

    def get_object(self, pk):
        try:
            return MedicineOrder.objects.get(id=pk)
        except MedicineOrder.DoesNotExist:
            raise Http404

    def get(self, request):
        medicine_orders = MedicineOrder.objects.all()
        serializer = MedicineOrderSerializer(medicine_orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicineOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        medicine_order = self.get_object(pk)
        serializer = MedicineOrderSerializer(medicine_order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        medicine_order = self.get_object(pk)
        medicine_order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProcedureOrderView(APIView):

    def get_object(self, pk):
        try:
            return ProcedureOrder.objects.get(id=pk)
        except ProcedureOrder.DoesNotExist:
            raise Http404

    def get(self, request):
        procedure_orders = ProcedureOrder.objects.all()
        serializer = ProcedureOrderSerializer(procedure_orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProcedureOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        procedure_order = self.get_object(pk)
        serializer = ProcedureOrderSerializer(procedure_order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        procedure_order = self.get_object(pk)
        procedure_order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DiagnosticHelpOrderView(APIView):

    def get_object(self, pk):
        try:
            return DiagnosticHelpOrder.objects.get(id=pk)
        except DiagnosticHelpOrder.DoesNotExist:
            raise Http404

    def get(self, request):
        diagnostic_help_orders = DiagnosticHelpOrder.objects.all()
        serializer = DiagnosticHelpOrderSerializer(diagnostic_help_orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DiagnosticHelpOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        diagnostic_help_order = self.get_object(pk)
        serializer = DiagnosticHelpOrderSerializer(
            diagnostic_help_order, data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        diagnostic_help_order = self.get_object(pk)
        diagnostic_help_order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
