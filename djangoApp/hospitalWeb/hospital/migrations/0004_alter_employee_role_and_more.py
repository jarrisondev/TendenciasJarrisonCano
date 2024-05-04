# Generated by Django 4.2.11 on 2024-05-03 23:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0003_employee_remove_person_hospital_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='role',
            field=models.CharField(choices=[('Doctor', 'Doctor'), ('Administrative', 'Administrative'), ('Nurse', 'Nurse'), ('HumanResources', 'HumanResources'), ('InformationSupport', 'InformationSupport')], max_length=100),
        ),
        migrations.AlterField(
            model_name='patient',
            name='emergencyContactRelationship',
            field=models.CharField(choices=[('Brother', 'Brother'), ('Friend', 'Friend'), ('Sister', 'Sister'), ('Other', 'Other'), ('Son', 'Son'), ('Mother', 'Mother'), ('Daughter', 'Daughter'), ('Father', 'Father')], max_length=100),
        ),
        migrations.AlterField(
            model_name='patient',
            name='gender',
            field=models.CharField(choices=[('FEMALE', 'FEMALE'), ('MALE', 'MALE')], max_length=100),
        ),
    ]
