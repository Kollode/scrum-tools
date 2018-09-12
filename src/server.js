"use strict";
exports.__esModule = true;
var express = require("express");
var server_1 = require("react-dom/server");
var React = require("react");
var app_1 = require("./components/app");
var app = express();
app.use(express.static('dist'));
app.get('/', function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(server_1.renderToString(React.createElement(app_1.App))));
    res.send();
});
app.listen(8080, function () {
    console.log('Started server under `http://localhost:8080`');
});
function htmlTemplate(reactMarkup) {
    return "\n        <!DOCTYPE html>\n        <html>\n            <head>\n                <meta charset=\"utf-8\" />\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <title>React Example</title>\n            </head>\n            <body>\n               <div id=\"app\">" + reactMarkup + "</div>\n               <script src=\"/js/client.bundle.js\" defer></script>\n            </bod>\n        </html>\n    ";
}
