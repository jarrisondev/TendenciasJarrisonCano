# Tendencias de desarrollo de software

## Integrantes
- Jarrison Cano [GitHub](https://github.jarrison.dev)


## Tecnologías
- Python
- Django

---
## Resumen
La materia se baso en 2 módulos:

- El primer módulo consistió en el desarrollo del enunciado por medio de python (**hospitalCLI**). En esta parte definimos las entidades y las funcionalidades de cada entidad (Doctor, Paciente, etc...). Se simuló un login y las respectivas validaciones.
- El segundo módulo se basó en la migración de lo desarrollado con python hacia django (Framework web de python. comparte similitudes con springboot). Tomamos los mismos modelos y funcionalidades del proyecto **hospitalCLI** y lo adaptamos a la estructura que requiere django (Creación de modelos, servicios y controladores para el consumo de los datos). Adicional hicimos conexión a la DB para persistir la información. Y por último se desarrollo un Frontend que nos permite consumir los endpoints creados con django.

A continuación está el paso a paso de como ejecutar cada uno de los proyectos.

---
## Cómo ejecutar el proyecto HospitalCLI
Antes de seguir con los siguientes pasos es necesario tener python3 instalado.

1. Clonar el proyecto
```bash
git clone https://github.com/jarrisondev/TendenciasJarrisonCano.git
```

2. Acceder a la carpeta **hospitalCLI**
```bash
cd ./hospitalCLI
```

3. Ejecutar el siguiente comando

```bash
python ./main.py

# if doesnt work try with:
py ./main.py
```

> [!IMPORTANT]
> Es necesario tener **python3** instalado. [Descargalo aquí](https://www.python.org/downloads/)
---

## Cómo ejecutar el proyecto djangoApp

1. Acceder a la carpeta **djangoApp/hospitalWeb**
```bash
cd ./djangoApp/hospitalWeb
```

2. instalar las dependencias de django (Solo se debe hacer la primera vez).
```bash
pip install -f requirements.txt
```

3. Ejecutar el proyecto
```bash
python manage.py runserver
```

> [!TIP]
> Tengo un postman con ejemplos de los distintos endpoints que tiene la app. [Miralo aquí](https://www.postman.com/jarrisoncano/workspace/tendencias-de-desarrollo/collection/18455339-71f65d8b-8832-4c48-96b5-a04fe5ad3249)

---

Ahora, si deseas ejecutar el frontend para ver el funcionamiento visual y completo de la aplicación haz lo siguiente:

1. Acceder a la carpeta **client**
```bash
cd ./client
```

2. instalar las dependencias de npm (Solo se debe hacer la primera vez).
```bash
npm install
```

3. Ejecutar el proyecto
```bash
npm run dev
```
4. Acceder a la url indicada en la terminal

> [!IMPORTANT]
> Debes tener **node.js** instalado. comprueba escribiendo ```node --version``` en tu terminal. En caso de no estar instalado [Descargalo aqui](https://nodejs.org/en)
