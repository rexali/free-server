const escape = require("html-escape");

function htmlEscape(name) {
    return escape(name); 
}

module.exports={
    htmlEscape
}