const scale = [18.5, 25, 28, 32];
const scaleColors = ['purple', 'blue', 'green', 'yellow', 'red'];
let value = 20;

let chart = new Chart1D('myChart', scale, scaleColors);
chart.show(value);