(function() {

    var textarea = document.getElementById('movement');

    document.getElementById('submit').addEventListener('click', function() {
        arrayInteration();
    })

    function arrayInteration() {
        var current;
        var values = textarea.value.split('\n').map(Number);
        var totalMoves = 0;
        var movement = 0;

        for (x=0; x <= values.length - 1; x = movement) {
            current = values[x];
            movement = x + current;
            // Check for part 2, otherwise part 1 just adds 1
            if (current >= 3) {
                values[x] -= 1;
            } else {
                values[x] += 1;
            }
            totalMoves += 1;
        }

        console.log(totalMoves)
    }

})();