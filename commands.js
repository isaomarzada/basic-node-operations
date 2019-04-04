const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt >');
}


function evaluateCmd(userInput){
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
     case "echo":
      //we will add the functionality of echo next within the object commandLibrary
       commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;

      case "cat":
       commandLibrary.cat(userInputArray.slice(1));
       break;
      case "head":
        commandLibrary.head(userInputArray.slice(1));
      case "tail":
      commandLibrary.tail(userInputArray.slice(1));

      default:errorHandler;
   }
}

const commandLibrary = {
  "echo": function(userInput) {
        done(userInput);
    },

    "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });
   },

   "head": function(fullPath){
     const fileName = fullPath[0];
     fs.readfile(fileName, (err, data) => {
       if (err) throw err;
       let newArray = data.toString().split('\n');
       let numLines = newArray.slice(0, 5).join('\n');
       done(numLines);
     });
   },

   'tail': function(fullPath){
     const fileName = fullPath[0];
     fs.readFile(fileName, (err, data) => {
       if (err) throw err;
       let newArray = data.toString().split('\n');
       let numLines = newArray.slice(-3).join('\n');
       done(numLines);
     });
   }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
