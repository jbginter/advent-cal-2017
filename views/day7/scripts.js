//(function() {

    var textarea = document.getElementById('programs');
    var placementCheck = [];

    document.getElementById('submit').addEventListener('click', function() {
        var programs = textarea.value.split('\n');
        findPlacement(programs);
    })

    function findPlacement(values) {

        var weight = 0;

        for (var x=0; x < values.length; x++) {
            var name = values[x].split(' (')
            var weight = parseInt(values[x].substring(values[x].lastIndexOf("(")+1,values[x].lastIndexOf(")")));
            if (values[x].includes('->')) {
                var links = values[x].split(' -> ')[1].split(',')
                var linkedValues = [];
                for (y=0; y < links.length; y++) {
                    linkedValues.push(links[y].toString().trim())
                }
                placementCheck.push({
                    name: name[0].toString().trim(),
                    program: values[x],
                    links: linkedValues,
                    score: 1,
                    weight: weight
                })

            } else {
                placementCheck.push({
                    name: name[0].toString().trim(),
                    program: values[x],
                    score: 0,
                    weight: weight
                })
            }
        }

        for (var z=0; z < placementCheck.length; z++) {
            if (placementCheck[z].links) {
                for (var  q=0; q < placementCheck.length; q++) {
                    if (!placementCheck[q].links) continue;

                    if (placementCheck[z].name !== placementCheck[q].name && placementCheck[z].links.includes(placementCheck[q].name)) {
                        placementCheck[q].score++;
                    }
                }
            }
        }

        var root = placementCheck.find(function (root) { return root.score === 1; });
        console.log('Base of tree: ', root);

        // for (o=0; o < root.links.length; o++) {
        //     var linkFind = placementCheck.find(function (linkFind) { return linkFind.name === root.links[o]; });
        //     weight += linkFind.weight;

        //     if (linkFind.links) 
        // }

        // function loopLinks(data) {
        //     for (n=0; n < data.length; n++) {

        //     }
        // }
    }

//})();