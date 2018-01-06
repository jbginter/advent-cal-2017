// function for checking if files can be uploaded
function handleFiles(files) {
    if (window.FileReader) {
        handleCSV(files[0]);
    } else {
        alert('FileReader requires newer browsers to use.');
    }
  }

// handles csv files ONLY
function handleCSV(file) {
	var reader = new FileReader();

	reader.readAsText(file)
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
}

// handler for loading file recieved
function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

// processes data of csv file
function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
  //calculateData(lines);
  noRemainder(lines);
}

// calculates data for part 1
function calculateData(data) {
	total = 0;
	for (i=0; i < data.length; i++) {
		data[i] = data[i].toString()
		var numbers = data[i].split(',')
		var min = Math.min.apply(null, numbers)
		var max = Math.max.apply(null, numbers)
		total += max - min;
	}
	console.log(total)
}

// calculates data for part 2
function noRemainder(data) {
	total = 0;
	for (i=0; i < data.length; i++) {
		data[i] = data[i].toString()
		var numbers = data[i].split(',')
		for (x=0; x < numbers.length; x++) {
			for (y=0; y < numbers.length; y++) {
				if (numbers[x] !== numbers[y]) {
					var check = numbers[x] % numbers[y]

					if (check === 0) {
						total += numbers[x] / numbers[y]
						break;
					}
				}
			}
		}
	}
	console.log(total)
}

// error handler
function errorHandler(evt) {
  	console.log('ERROR: ',evt.target.error)
}