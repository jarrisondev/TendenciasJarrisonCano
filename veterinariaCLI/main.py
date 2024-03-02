from models import model
from service import login
from routes import routes

veterinary = model.Veterinary()
person1 = model.Person(
    id=1,
    name="Jarrison",
    role=model.Roles,
    password="Admin123",
    username="jarrisoncano",
    age=21,
)

veterinary.persons.append(person1)


while True:
    option = input("1. iniciar sesion\n2. salir\n")

    if option == "1":
        username = input("Ingrese su usuario: ")
        password = input("Ingrese su contraseña: ")
        try:
            user = login.loginService(veterinary, username, password)
            routes.Router(user)

        except Exception as error:
            print(error, "\n")
    else:
        print("Adios")
        break
