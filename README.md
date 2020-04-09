# Chart1D
Generador de gráficas en "1 dimensión" utilizando Chart.js. 

Solo se implementan dos tipos de puntos para los datos:
* Valor que coincide con un valor de la escala: en este caso el valor se muestra en el valor correspondiente.
* Valor intermedio entre dos valores de escala: en este caso el valor se muestra en el centro los dos puntos de la escala en los que está comprendido.

## ¿Cómo se utiliza?
Por cada gráfico a generar se debe crear una nueva instancia del objeto Chart1D. 

Los parrámetros a pasar en la generación del objeto son los siguientes:
1. `id` (obligatorio): string identificador del canvas del gráfico dentro del código 
HTML
2. `title` (obligatorio): string con el valor del título del gráfico. 
3. `scale` (obligatorio): array con los valores numéricos de la escala del gráfico a generar
4. `scaleColors` (opcional): array de strings con los textos de los colores de la escala del gráfico a generar. Se puede pasar el valor como texto en hexadecimal o bien utilizar el string de los [colores predefinidos](README.md#Strings-de-colores).

Una vez generado el objeto, para visualizar el valor en el gráfico se debe utilziar la función `show()`, pasando como parámetro el valor que se quiere mostrar. 

En caso de que no se le pase ningún valor a la función `show()` se mostrará únicamente el eje del gráfico.

## Ejemplo
En el código HTML se define un nuevo canvas:
```HTML
<canvas id="myChart" width="500" height="80"></canvas>
```

En el código javascript se define el nuevo objeto como:
```javascript
const scale = [18.5, 25, 28, 32];
const scaleColors = ['purple', '#4092e4', 'green', 'yellow', 'red'];
let value = 20;

let chart = new Chart1D('myChart', scale, 'Título del gráfico', scaleColors);
chart.show(value);
```

Esto genera el siguiente gráfico:

![Ejemplo](./img/Ejemplo.PNG)

## Strings de colores

Dentro de `scaleColors` además del string con el valor hexadecimal se pueden pasar los siguientes literales, correspondientes a los colores predefinidos en el generador de gráficos:

| Nombre      | Valor hexadecimal |
|-------------|-------------------|
| cyan        | #00ffff           |
| lightBlue   | #70cfff           |
| blue        | #4092e4           |
| darkBlue    | #2377cd           |
| lightGreen  | #73f0b8           |
| green       | #10b269           |
| darkGreen   | #067543           |
| lightYellow | #ffeaa6           |
| yellow      | #ffc301           |
| darkYellow  | #a67f00           |
| lightOrange | #fcbf79           |
| orange      | #f28d19           |
| brown       | #854700           |
| red         | #fa6a50           |
| pink        | #ff00d0           |
| white       | #ffffff           |
| purple      | #5b04c8           |
| black       | #000000           |