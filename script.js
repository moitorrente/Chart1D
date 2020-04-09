const scale = [18.5, 25, 28, 32];
const scaleColors = ['purple', '#4092e4', 'green', 'yellow', 'red'];
let value = 20;

let chart = new Chart1D('myChart', 'Título del gráfico', scale, scaleColors);
chart.show(value);