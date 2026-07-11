const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('/tmp/fnma_guide.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('/tmp/fnma_guide.txt', data.text);
    console.log("Extracted", data.numpages, "pages to /tmp/fnma_guide.txt");
});
