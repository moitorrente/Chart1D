const colors = {
    blue: "#4092e4",
    green: "#10b269",
    yellow: "#ffc301",
    orange: "#f28d19",
    red: "#fa6a50",
    darkGreen: "#08a45d",
    darkBlue: "#2377cd",
    white: "#ffffff",
}

const colorCombinations = [
    [colors.green, colors.yellow, colors.orange],
    [colors.orange, colors.green, colors.darkGreen],
    [colors.darkBlue, colors.blue, colors.green, colors.yellow, colors.orange],
    [colors.blue, colors.green, colors.yellow, colors.orange, colors.red]
]

class Chart1D {
    constructor(id, scale, color) {
        this.scale = scale;
        this.color = color || 3;
        this.ctx = document.getElementById(id).getContext('2d');
        this.data = {
            labels: [],
            datasets: [
                {
                    borderWidth: 6,
                    pointBackgroundColor: colors.white
                }, {
                    data: [],
                    borderWidth: 6,
                    pointBackgroundColor: colors.white
                }, {
                    data: [],
                    borderWidth: 6,
                    pointBackgroundColor: colors.white
                }, {
                    data: [],
                    borderWidth: 6,
                    pointBackgroundColor: colors.white
                }, {
                    data: [],
                    borderWidth: 6,
                    pointBackgroundColor: colors.white
                }]
        }
        this.option = {
            responsive: false,
            legend: {
                display: false,
                position: 'bottom'
            },
            scales: {
                xAxes: [{
                    display: true,
                    position: 'top',
                    gridLines: false
                }],
                yAxes: [{
                    display: false,
                }]
            }
        }
        this.myChart = new Chart(this.ctx, {
            type: 'line',
            data: this.data,
            options: this.option
        });
    }

    show(value) {
        let dataPosition, datasetPosition;
        
        this.translateScale();
        this.addScaleLabels(this.interpolateScale(this.scale));
        this.addScaleData(this.scale);


        if(value){
            dataPosition = this.findValuePosition(value, this.scale)[0];
            datasetPosition = this.findValuePosition(value, this.scale)[1];
        }

        for (let i in this.data.datasets) {
            this.data.datasets[i].pointRadius = this.createArray(this.data.datasets[i].data.length, 0, 0);
            this.data.datasets[i].pointHitRadius = this.data.datasets[i].pointRadius;

            if (i == datasetPosition) {
                this.data.datasets[i].pointBorderWidth = this.createArray(this.data.datasets[i].data.length, dataPosition, 3);
                this.data.datasets[i].pointHoverBorderWidth = this.data.datasets[i].pointBorderWidth;
                this.data.datasets[i].pointHoverRadius = this.createArray(this.data.datasets[i].data.length, dataPosition, 10);
                this.data.datasets[i].pointRadius = this.data.datasets[i].pointHoverRadius;
            }

            this.data.datasets[i].borderColor = colorCombinations[this.color][i];
        }
        this.myChart.update();
    }

    
    translateScale(){
        //En caso de que la escala no empiece en 0 lo inserta para desplazar hacia la derecha
        if (this.scale[0] != 0) {
            this.scale.unshift(0);
        }

        //En caso de que la escala no acabe en 99 lo inserta par adesplazar hacia la izquierda
        if (this.scale[this.scale.length - 1] != 99) {
            this.scale.push(99);
        }
    }

    createScaleVectors(sections) {
        let newArray = [];
        let finalArray = [];
        let tempSections = sections * 2 + 1;
        let pos = 0;

        for (let j = 0; j < sections; j++) {
            newArray = [];
            for (let i = 0; i < tempSections; i++) {
                if (i == pos || i == pos + 1 || i == pos + 2) {
                    newArray.push(0);
                } else {
                    newArray.push(NaN);
                }
            }
            pos += 2;
            finalArray.push(newArray);
        }
        return finalArray;
    }

    addScaleLabels(scale) {
        let labels = [];
        for (let value in scale) {
            if (scale[value] == 0 || scale[value] == 99) {
                labels.push('');
            } else {
                labels.push(scale[value].toString());
            }
        }
        this.data.labels = labels;
    }

    addScaleData(scale) {
        let vect = this.createScaleVectors(scale.length - 1);
        for (let i in this.data.datasets) {
            this.data.datasets[i].data = vect[i];
        }
        this.myChart.update();
    }

    interpolateScale(scale) {
        let newScale = [];
        for (let i in scale) {
            newScale.push(scale[i]);
            newScale.push(0);
        }
        return newScale;
    }

    findValuePosition(value, scale) {
        let newScale = Array.from(scale);
        let section;
        let position = 0;
        let finalPos;

        for (let i in newScale) {
            if (newScale[i] == 0 || newScale[i] == 99) {
                newScale.splice(i, 1);
            }
        }
        for (let i = 0; i < newScale.length; i++) {
            if (value == newScale[i]) {
                position = i;
                section = false;
                break;
            } else if (value < newScale[i]) {
                position = i;
                section = true;
                break;
            } else if (value > newScale[i]) {
                position = i + 1;
                section = true;
            }
        }

        if (section) {
            finalPos = position * 2 + 1;
        } else {
            finalPos = position * 2 + 2;
        }
        return [finalPos, position];
    }

    createArray(length, position, value) {
        let newArray = [];
        for (let i = 0; i < length; i++) {
            if (i == position) {
                newArray.push(value);
            } else {
                newArray.push(0);
            }
        }
        return newArray;
    }
}