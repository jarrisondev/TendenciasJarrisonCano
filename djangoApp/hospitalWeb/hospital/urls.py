from django.urls import path

from . import views

urlpatterns = [
    path("patients/", views.PatientView.as_view()),
    path("patients/<int:pk>/", views.PatientView.as_view()),
    path("medicines/", views.MedicineView.as_view()),
    path("medicines/<int:pk>/", views.MedicineView.as_view()),
    path("employees/", views.EmployeeView.as_view()),
    path("employees/<int:pk>/", views.EmployeeView.as_view()),
]
