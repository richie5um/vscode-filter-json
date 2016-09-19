var vscode = require('vscode');
var filterer = require('./filter-json-utils');
var JSON5 = require('json5');

function getConfig() {
    return vscode.workspace.getConfiguration('filterJSON');
}

function getSelection(textEditor, startLine, endLine) {
    var selectedText = '';
    for (var i = startLine; i <= endLine; ++i) {
        selectedText += textEditor.document.lineAt(i).text;
    }
    return selectedText;
};

function findIndent(textEditor) {
    var indent;
    for (var i = 0; !indent && i < textEditor.document.lineCount; ++i) {
        var line = textEditor.document.lineAt(i).text;
        for (var j = 0; j < line.length && ' ' === line[j]; ++j) {
            indent = (indent || 0) + 1;
        }
    }
    return indent || 4;
}

function filterActiveSelection(comparator) {
    try {
        filterActiveSelectionInternal(JSON, comparator);
        return true;
    } catch (e) {
        try {
            filterActiveSelectionInternal(JSON5, comparator);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

function setSelection(textEditor, startLine, endLine, filteredText) {
    textEditor.edit(function (editBuilder) {
        var range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
        editBuilder.replace(range, filteredText);
    });
}

function filterActiveSelectionInternal(jsonParser) {
    var textEditor = vscode.window.activeTextEditor;
    var selection = textEditor.selection;

    var startLine = selection.start.line;
    var endLine = selection.end.line;

    var filterOptions = getConfig();

    var selectedText = getSelection(textEditor, startLine, endLine);
    var initialJSON = filterer.textToJSON(jsonParser, selectedText);
    var filteredJSON = filterer.filterJSON(initialJSON, filterOptions);

    var indent = findIndent(textEditor);
    var filteredText = filterer.jsonToText(jsonParser, filteredJSON, indent);

    setSelection(textEditor, startLine, endLine, filteredText);
}

exports.filter = filterActiveSelection.bind(null);