from models import model


def AdminRoute(user):
    print("Bienvenido Admin")
    print("1. Registrar Veterinario")
    print("2. Registrar Cliente")
    print("3. Registrar Mascota")
    print("4. Salir")

    while True:
        option = input("Ingrese una opcion: ")
        if option == "1":
            print("Registrar Veterinario")
        elif option == "2":
            print("Registrar Cliente")
        elif option == "3":
            print("Registrar Mascota")
        elif option == "4":
            print("Salir")
            break
        else:
            raise Exception("Opcion no valida")


def VeterinarianRoute(user):
    print("Bienvenido Veterinario")
    print("1. Ver mascotas")
    print("2. Ver historias clinicas")
    print("3. Ver clientes")
    print("4. Salir")

    while True:
        option = input("1. Ver mascotas\n2. Ver historias clinicas\n3. Ver clientes\n")
        if option == "1":
            print("Ver mascotas")
        elif option == "2":
            print("Ver historias clinicas")
        elif option == "3":
            print("Ver clientes")
        elif option == "4":
            print("Salir")
            break
        else:
            raise Exception("Opcion no valida")


def ClientRoute(user):
    print("Bienvenido Cliente")
    print("1. Ver mis mascotas")
    print("2. Ver mis historias clinicas")
    print("3. Agendar cita")
    print("4. Salir")

    while True:
        option = input(
            "1. Ver mis mascotas\n2. Ver mis historias clinicas\n3. Agendar cita\n"
        )
        if option == "1":
            print("Ver mis mascotas")
        elif option == "2":
            print("Ver mis historias clinicas")
        elif option == "3":
            print("Agendar cita")
        elif option == "4":
            print("Salir")
            break
        else:
            raise Exception("Opcion no valida")


def Router(user):
    if user.role == model.Roles["Admin"]:
        AdminRoute(user)
    elif user.role == model.Roles["Veterinarian"]:
        VeterinarianRoute(user)
    elif user.role == model.Roles["Client"]:
        ClientRoute(user)
    else:
        raise Exception("Rol no valido")
