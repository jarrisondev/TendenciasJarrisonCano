class Colors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


def printError(error):
    print(f"\n{Colors.FAIL}Error: {error}. Intentelo de nuevo.{Colors.ENDC} \n")


def printSuccess(message):
    print(f"\n{Colors.OKGREEN}{message}{Colors.ENDC} \n")


def printInfo(message):
    print(f"\n{Colors.OKCYAN}{message}{Colors.ENDC}")


def inputQuestion(question):
    return input(f"{Colors.BOLD}{question}{Colors.ENDC} \n")


def inputOption(question):
    return input(f"{Colors.HEADER}{question}{Colors.ENDC} \n")
