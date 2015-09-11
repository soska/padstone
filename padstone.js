#!/usr/bin/env node

// https://github.com/sass/node-sass/blob/master/bin/node-sass

var program = require('commander');
var sass = require('node-sass');
var fs = require('fs');
var path = require('path');

var options = {
  input: null,
  out: null
};

program
    .version('0.0.1')
    .usage('<input.scss> <output.scss>')
    .arguments('<input> <output>')
    .action(function (input, output) {
      options.input = input;
      options.output = output;
    })
    .parse(process.argv);

if( ! program.options.length ) {
  return program.help();
}



sass.render({
  file: options.input,
  includePaths: [ path.join(__dirname, './scss') ],
  outputStyle: 'compressed',
  outFile: options.output,
}, function(error, result) {
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  } else {
    console.log(result.stats);
    fs.writeFile(options.output, result.css, function(err){
      if(!err){
        //file written on disk
        console.log('YAY!! Success');
      }else{
        console.log('WTF',err);
      }
    });
  }
});
