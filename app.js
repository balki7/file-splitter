let FILE_PATH = 'ko_corpus.txt';
let MAX_FILE_SIZE = 500; //MB
let DESTINATION_FOLDER = './files';

const readline = require('readline');
const fs = require('fs');

let counter = 1;

let getDestinationFileName = () => {
    return DESTINATION_FOLDER + '/' + counter;
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(FILE_PATH),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
    let fileSize = 0;
    try {
        fileSize = fs.statSync(getDestinationFileName())["size"] / 1000000.0;
    }
    catch(e){
        switch(e.code){
            case 'ENOENT':{
                fs.writeFileSync(getDestinationFileName(), line + "\n", { encoding: 'utf8', mode: 0o666, flag: 'a' });
                return;
            }
        }
    }

    if(fileSize > MAX_FILE_SIZE){
        counter += 1;
    }
    fs.writeFileSync(getDestinationFileName(), line + "\n", { encoding: 'utf8', mode: 0o666, flag: 'a' });
});

readInterface.on('close', function() {
    console.error("Finished : " + counter + " files.");
});