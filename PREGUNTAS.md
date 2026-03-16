1.- Imagina que ya estamos trabajando juntos y que suite de pruebas creciera a 500 tests, ¿qué cambios harías o sugerirías en la estructura?

R = sugeriría realizar algunos ajustes en la estructura del proyecto para mejorar la organización, la mantenibilidad y los tiempos de ejecución.

En primer lugar, dividiría los tests por tipo y funcionalidad, por ejemplo separando carpetas como:

- Pages

- UI

Esto facilitaría la ejecución selectiva de pruebas según el objetivo, que es mantener una estructura modular, escalable y fácil de mantener a medida que el número de pruebas aumenta.

2.- Si hay flakiness en un test, ¿cómo lo manejarías?

R = Hablaria con los Dev para analizar si el elemento que se está utilizando en el test es inestable o cambia sus atributos después de cada deploy, por ejemplo cuando los identificadores del DOM se generan dinámicamente. En ese caso, lo más recomendable sería colaborar con el equipo de desarrollo para definir atributos estables y específicos para testing (por ejemplo data-testid), lo que permite mejorar la estabilidad de los selectores.

De esta manera se logra que los tests sean más robustos, mantenibles y confiables, reduciendo la aparición de falsos fallos y garantizando que las pruebas se comporten de forma consistente en cada ejecución.

3.- Explicación de decisiones técnicas (por qué se eligieron ciertos enfoques).

R = Las decisiones técnicas del proyecto se basaron en mantenibilidad, escalabilidad y confiabilidad de las pruebas.

Se utilizó Playwright por ser el framerwork del challenge pero tambien por su soporte para pruebas End-to-End, ejecución en múltiples navegadores y su sistema de auto-waiting, lo que ayuda a reducir problemas de sincronización y flakiness.

Además, se implementó el patrón Page Object Model (POM) para separar la lógica de interacción con la UI de los escenarios de prueba, mejorando la reutilización del código y la mantenibilidad del framework,  también siguen el patrón AAA (Arrange, Act, Assert) para estructurar los escenarios de manera clara y consistente.

Se integró la ejecución automática de los tests mediante GitHub Actions, permitiendo validar los cambios de forma continua dentro del pipeline de integración.

Finalmente, se priorizó el uso de selectores estables y buenas prácticas de automatización para garantizar pruebas robustas y consistentes.