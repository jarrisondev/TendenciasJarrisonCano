def loginService(veterinary, username, password):
    user = None

    for person in veterinary.persons:
        if person.username == username and person.password == password:
            user = person
            print(f"Bienvenido {user.name}", "\n")
            break
    if user == None:
        raise Exception("Usuario o contraseña incorrectos")

    return user
