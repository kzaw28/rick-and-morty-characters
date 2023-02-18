const fs = require("fs");
const { resolve } = require("path");

var characters;

// LOAD DATA FROM JSON FILE INTO ARRAY ------------------------------

function loadChar() {
    return new Promise(function(resolve, reject){
        fs.readFile("./data/characters.json", "utf-8", (err,data)=> {
            if (err) reject("Unable to read file");

            characters = JSON.parse(data);
            resolve("Characters successfully loaded");
        });
    });
}
// ------------------------------------------------------------------

// Function to be called from server.js when it's needed  ----------------------------
exports.getAllChar = function() {
    return new Promise(function(resolve, reject){
        if (characters.length == 0)
            reject("No character returned");

        resolve(characters);
    });
}
// ----------------------------------------------------------------

exports.initialize = function() {
    return new Promise(function(resolve, reject){
        loadChar()
        .then(function(msg) {
            resolve(msg);
        })
        .catch(function(err){
            reject(err);
        })
    })
}