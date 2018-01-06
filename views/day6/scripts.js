(function() {

    var textarea = document.getElementById('memory');
    var memoryCheck = [];
    var arrCheck = false;

    document.getElementById('submit').addEventListener('click', function() {
        memoryCheck.push(JSON.stringify(textarea.value.split(/\t/g).map(Number)));
        arrayInteration(textarea.value.split(/\t/g).map(Number));
    })

    function arrayInteration(array) {

        var max = Math.max.apply(null, array);
        var findIndex = array.indexOf(max);
        array[findIndex] = 0;

        if (findIndex === array.length - 1) {
            findIndex = 0;
        } else {
            findIndex += 1;
        }

        for (i=0; i < max; i++) {
            array[findIndex] += 1;
            if (findIndex === array.length - 1) {
                findIndex = 0;
            } else {
                findIndex += 1;
            }
        }

        memoryCheck.push(JSON.stringify(array));

        // will compare previous arrays to newest
        for (x=0; x < memoryCheck.length - 1; x++) {

            if (memoryCheck[x] === memoryCheck[memoryCheck.length - 1]) {
                // difference between found array and last
                console.log("Final: ", (memoryCheck.length - 1) - x)
                console.log(memoryCheck)
                arrCheck = true;
                break;
            }
        }

        if (!arrCheck) {
            arrayInteration(array);
        }

    }

})();