from django.urls import path

from . import views

urlpatterns = [
    path("patients/", views.PatientView.as_view()),
    path("patients/<int:pk>/", views.PatientView.as_view()),
    #
    path("medicines/", views.MedicineView.as_view()),
    path("medicines/<int:pk>/", views.MedicineView.as_view()),
    #
    path("employees/", views.EmployeeView.as_view()),
    path("employees/<int:pk>/", views.EmployeeView.as_view()),
    #
    path("orders/", views.OrderView.as_view()),
    path("orders/<int:pk>/", views.OrderView.as_view()),
    #
    path("medicinesOrders/", views.MedicineOrderView.as_view()),
    path("medicinesOrders/<int:pk>/", views.MedicineOrderView.as_view()),
    #
    path("procedureOrders/", views.ProcedureOrderView.as_view()),
    path("procedureOrders/<int:pk>/", views.ProcedureOrderView.as_view()),
    #
    path("diagnosticsOrder/", views.DiagnosticHelpOrderView.as_view()),
    path("diagnosticsOrder/<int:pk>/", views.DiagnosticHelpOrderView.as_view()),
]
