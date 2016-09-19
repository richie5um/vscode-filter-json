var vscode = require('vscode');
var filterJSON = require('./filter-json');

function activate(context) {
  var commands = [
    vscode.commands.registerCommand('filterJSON.filter', filterJSON.filter)
  ];

  commands.forEach(function (command) {
    context.subscriptions.push(command);
  });
}

exports.activate = activate;
