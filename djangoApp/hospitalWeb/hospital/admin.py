from django.contrib import admin
from hospital.models import (
    Employee,
    Patient,
    Medicine,
    Order,
    MedicineOrder,
    ProcedureOrder,
    DiagnosticHelpOrder,
)

# Register your models here.


admin.site.register(Employee)
admin.site.register(Patient)
admin.site.register(Medicine)
admin.site.register(Order)
admin.site.register(MedicineOrder)
admin.site.register(ProcedureOrder)
admin.site.register(DiagnosticHelpOrder)
