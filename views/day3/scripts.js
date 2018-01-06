//(function() {

    // Sets variables used throughout problem
    var init, add, corners, search, addedValue, outerMovement, totalValue, numberTracker;
    var value = document.getElementById('value');
    var submit = document.getElementById('submit');
    var value2 = document.getElementById('value2');
    var submit2 = document.getElementById('submit2');
    var difference = function (a, b) { return Math.abs(a - b); }

    // Adds listener for submitting values
    submit.addEventListener('click', function() {
        buildSpiral();
    })

    submit2.addEventListener('click', function() {
        buildSpiralJoined();
    })

    // function for part 1
    function buildSpiral() {
        var arrayHolder = [];
        search = value.value;
        init = 1;
        addedValue = init;
        add = 2;
        corners = 4;

        for (x=0; x < search; x = addedValue) {
            addedValue += (init * 4) + corners;
            init += add;
            arrayHolder.push(addedValue);
        }

        var arrayEnd = arrayHolder[arrayHolder.length - 1]
        var diff = (arrayEnd - arrayHolder[arrayHolder.length - 2]) / 4;
        var middle = diff / 2;

        if ((arrayEnd - diff) >= search) {
            outerCheck = difference((arrayEnd-diff), search)

            if (outerCheck <= diff) {
                outerMovement = difference((arrayEnd-diff) - middle, search)
            } else if (outerCheck <= diff * 2) {
                outerMovement = difference((arrayEnd-(diff*2)) - middle, search)
            } else {
                outerMovement = difference((arrayEnd-(diff*3)) - middle, search)
            }
        } else {
            outerMovement = difference(arrayEnd - middle, search)
        }

        console.log('movement ',arrayHolder.length + outerMovement);
    }

    // function for part 2
    function buildSpiralJoined() {
        var sectionHolder = [];
        numberTracker = [[1]];
        search = value2.value;
        init = 1;
        addedValue = init;
        add = 2;
        corners = 4;
        totalValue = 1;

        for (x=0; x < search; x = addedValue) {
            // Sets each square area
            var afterCorner;
            var addCounter = [];
            // this is how we'll get the total amount of numbers in each array
            addedValue += (init * 4) + corners;
            sectionValue = [];

            var totalCount = (init * 4) + corners;
            var cornerLoc = [(totalCount/4)-1, (totalCount/4*2)-1, (totalCount/4*3)-1, totalCount-1];
            var cornerBool = false;
            // Loops through total number of values for new section
            for (z=0; z < totalCount; z++) {
                var newVal = 0;
                // First circle build (Complete)
                if (numberTracker.length === 1) {
                    if (z !== 0) {
                      newVal += parseInt(sectionValue[sectionValue.length - 1])
                    } 

                    if ( (z+1) / totalCount !== 0.25 && (z+1) / totalCount !== 0.5 && (z+1) / totalCount !== 0.75 && (z+1) / totalCount !== 1 && z !== 0) {
                      newVal += parseInt(sectionValue[sectionValue.length - 2])
                    }

                    if ((totalCount - (z+1)) < totalCount / 4) {
                      newVal += parseInt(sectionValue[0])
                    }
                    newVal += numberTracker[0][0]
                // Every other circle (close)
                } else {
                    var lastArray = numberTracker[numberTracker.length - 1]
                    if (z !== 0) {
                      // Always add the previous value
                      newVal += parseInt(sectionValue[sectionValue.length - 1])
                    } else {
                      // This should ALWAYS grab the right number for first number in new array now
                      addCounter.push(lastArray.length - 1, 0)
                    }

                    cornerBool = false;
                    // Corner logic
                    cornerLoc.forEach( function(index) {
                        if (z === index-1) {
                          addCounter.splice(0,1);
                          cornerBool = true;
                          if (z > cornerLoc[3]-2) {
                              newVal += sectionValue[0]
                          }
                        } else if (z === index) {
                          addCounter.splice(0,1);
                          cornerBool = true;
                          if (z > cornerLoc[3]-2) {
                              newVal += sectionValue[0]
                          }
                        } else if (z === index + 1) {
                          newVal += parseInt(sectionValue[sectionValue.length - 2])
                          addCounter.push(addCounter[0]+1)
                          cornerBool = true;
                        } else if (z === index + 2) {
                          addCounter.push(addCounter[1]+1)
                          cornerBool = true;
                        }
                    })

                    if (!cornerBool && z !== 0 && z !== 1) {
                        addCounter.splice(0,1)
                        addCounter.push(addCounter[1]+1)
                    }

                    if (z === 1) {
                        addCounter.push(addCounter[1]+1)
                    }

                    // Adds array indexs from previous circle that are adjacent to current num
                    addCounter.forEach( function(index) {
                        newVal += lastArray[index];
                    })
                }
                sectionValue.push(newVal)
            }

            init += add;
            numberTracker.push(sectionValue)
            sectionHolder.push(addedValue);
        }

        console.log('total: ', numberTracker, '\nsection: ', sectionHolder)
    }

//})();