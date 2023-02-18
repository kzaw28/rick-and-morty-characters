const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

const data = require("./char-service")

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on " + HTTP_PORT);
};

// Set up engine to render dynamic content 
app.engine(".hbs", exphbs.engine({extname: ".hbs"}));
app.set("view engine", ".hbs"); // Set the default view engine


// SERVING STATIC FILES ---------------------------------
app.use(express.static(path.join(__dirname, "public")));

// ROUTES -----------------------------------------------

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get('/characters', function(req, res){
    data.getAllChar()
        .then(function(characterData){
            res.render("viewChar", {
                data: characterData,
                layout: false 
             });
        })
        .catch((err)=> console.log(err));
});

app.get('*', function(req, res){
    res.status(404).send("Page Not Found");
})
// ------------------------------------------------------

data
    .initialize()
    .then((res)=>{app.listen(HTTP_PORT, onHttpStart);})
    .catch((err)=>{console.log(err);})