(function() {

    var textarea = document.getElementById('passphrases');

    document.getElementById('submit').addEventListener('click', function() {
        checkDuplicates();
    })

    function checkDuplicates() {
        var phrases = textarea.value.split('\n');
        var valid = 0;

        for (x=0; x < phrases.length; x++) {
            var splitPhrase = phrases[x].split(' ');
            var sortLetters = sortWords(splitPhrase);

            if (findDuplicates(sortLetters).length === 0) valid += 1;
        }

        console.log('Valid Phrases: ', valid);
    }

    function findDuplicates(data) {

        var result = [];

        data.forEach(function(element, index) {
        
            if (data.indexOf(element, index + 1) > -1) {
              
                  if (result.indexOf(element) === -1) {
                    result.push(element);
                  }
            }
        });

        return result;
    }

    function sortWords(data) {
        var result = [];

        data.forEach(function(element, index) {
            var word = element;
            var sort = word.split('').sort().join('');
            result.push(sort);
        })

        return result;
    }

})();