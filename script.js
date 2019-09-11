var scale = [18.5, 25, 28, 32];
var value = 26;

var colors = {
	blue: "#4092e4",
	green: "#10b269",
	yellow: "#ffc301",
	orange: "#f28d19",
	red: "#fa6a50",
	darkGreen: "#08a45d",
	darkBlue: "#2377cd",
	white: "#ffffff",
}

var colorCombination1 = [colors.green, colors.yellow, colors.orange];
var colorCombination2 = [colors.orange, colors.green, colors.darkGreen];
var colorCombination3 = [colors.darkBlue, colors.blue, colors.green, colors.yellow, colors.orange];
var colorCombination4 = [colors.blue, colors.green, colors.yellow, colors.orange, colors.red];

var ctx = document.getElementById('myChart').getContext('2d');

var data = {
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

var option = {
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
};

var myChart = new Chart(ctx, {
	type: 'line',
	data: data,
	options: option
});

function createScaleVectors(sections) {
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

function addScaleLabels(scale) {
	let labels = [];
	for (let value in scale) {
		if (scale[value] == 0 || scale[value] == 99) {
			labels.push('');
		} else {
			labels.push(scale[value].toString());
		}
	}
	data.labels = labels;
}

function addScaleData(scale) {
	let vect = createScaleVectors(scale.length - 1);
	for (let i in data.datasets) {
		data.datasets[i].data = vect[i];
	}
	myChart.update();
}

function interpolateScale(scale) {
	let newScale = [];
	for (let i in scale) {
		newScale.push(scale[i]);
		newScale.push(0);
	}
	return newScale;
}

function findValuePosition(value, scale) {
	let newScale = Array.from(scale);
	let section;
	let position = 0;

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

function createArray(length, position, value) {
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

function createChart(value, scale, color) {
	if (scale[0] != 0) {
		scale.unshift(0);
	}
	if (scale[scale.length - 1] != 99) {
		scale.push(99);
	}

	addScaleLabels(interpolateScale(scale));
	addScaleData(scale);

	let dataPosition = findValuePosition(value, scale)[0];
	let datasetPosition = findValuePosition(value, scale)[1];

	for (let i in data.datasets) {
		data.datasets[i].pointRadius = createArray(data.datasets[i].data.length, 0, 0);
		data.datasets[i].pointHitRadius = data.datasets[i].pointRadius;

		if (i == datasetPosition) {
			data.datasets[i].pointBorderWidth = createArray(data.datasets[i].data.length, dataPosition, 3);
			data.datasets[i].pointHoverBorderWidth = data.datasets[i].pointBorderWidth;
			data.datasets[i].pointHoverRadius = createArray(data.datasets[i].data.length, dataPosition, 10);
			data.datasets[i].pointRadius = data.datasets[i].pointHoverRadius;
		}

		switch (color) {
			case 1:
				data.datasets[i].borderColor = colorCombination1[i];
				break;
			case 2:
				data.datasets[i].borderColor = colorCombination2[i];
				break;
			case 3:
				data.datasets[i].borderColor = colorCombination3[i];
				break;
			default:
				data.datasets[i].borderColor = colorCombination4[i];
				break;
		}
	}
	myChart.update();
}
createChart(value, scale);
