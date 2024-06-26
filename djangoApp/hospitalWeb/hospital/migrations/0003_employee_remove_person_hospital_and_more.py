# Generated by Django 4.2.11 on 2024-05-03 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0002_alter_patient_emergencycontactrelationship_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=15)),
                ('birthDate', models.DateField()),
                ('address', models.CharField(max_length=100)),
                ('role', models.CharField(choices=[('Nurse', 'Nurse'), ('HumanResources', 'HumanResources'), ('Doctor', 'Doctor'), ('Administrative', 'Administrative'), ('InformationSupport', 'InformationSupport')], max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='person',
            name='hospital',
        ),
        migrations.RemoveField(
            model_name='medicine',
            name='hospital',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='hospital',
        ),
        migrations.AlterField(
            model_name='patient',
            name='emergencyContactRelationship',
            field=models.CharField(choices=[('Friend', 'Friend'), ('Other', 'Other'), ('Daughter', 'Daughter'), ('Mother', 'Mother'), ('Sister', 'Sister'), ('Father', 'Father'), ('Brother', 'Brother'), ('Son', 'Son')], max_length=100),
        ),
        migrations.AlterField(
            model_name='patient',
            name='gender',
            field=models.CharField(choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE')], max_length=100),
        ),
        migrations.DeleteModel(
            name='Hospital',
        ),
        migrations.DeleteModel(
            name='Person',
        ),
    ]
