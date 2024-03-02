def stringValidator(value):
    if value == "" or value == None:
        raise Exception("El valor ingresado no es una cadena de texto")


def integerValidator(value):
    stringValidator(value)
    try:
        return int(value)
    except:
        raise Exception("No es un numero valido")
