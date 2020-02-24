# Markdown Links

## Introducción
Esta librería sirve para detectar los links que se usen en archivos con formato(.md).

## ¿Cómo usarlo?

Si lo usas en un archivo:

## ¿Qué opciones tiene esta librería?
Dependiendo de donde sea usada la librería esta tiene un definido número de opciones
que puedes usar. 

  ### Importando en el mismo archivo:
- sin ninguna opción: retorna las propiedades href, title y file.
- {validate: true}: devuelve las propiedades anteriores, status y message.

  ### Desde la línea de comando:
- Sin ninguna opción: retorna las propiedades href, title y file.
- --validate: retorna las propiedades anteriores, status y message
- --stats: retorna las estadísticas(total, unique)
- --validate --stats: retorna estadísticas(total, unique, broken)


## Modo de instalación:
Instalar la librería vía:
`npm install --global KellyRoca/md-links`


## Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.

## Objetivos de aprendizaje

Recuerda colocar en esta seccion los objetivos de aprendizaje que quedaron 
pendientes de tu proyecto anterior.

### Javascript
- [x] Uso de callbacks
- [x] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [x] Recursión

### Node
- [x] Sistema de archivos
- [x] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [x] npm scripts
- [x] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [x] Testeo de tus funciones
- [x] Testeo asíncrono
- [x] Uso de librerias de Mock
- [x] Mocks manuales
- [x] Testeo para multiples Sistemas Operativos

### Git y Github
- [x] Organización en Github

### Buenas prácticas de desarrollo
- [ ] Modularización
- [x] Nomenclatura / Semántica
- [x] Linting

***

