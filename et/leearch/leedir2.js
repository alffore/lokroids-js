fs = require('fs');

var archs = [];
fs.readdir("./", function(err, files) {

    if (err) {
        console.log(err);
        return;
    }

    files.forEach(element => {

        var ae = element.split('.');

        if (ae[1] == 'js') {
            archs.push(element);
        }

    });

    console.log(archs);

});