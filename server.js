var express = require("express");
var path = require("path");
var fs = require("fs")
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//api routes
app.get("/api/notes", function(req, res){
  
  console.log('api/notesget')
  let json =getjson();
  console.log(json)
  res.json(json);})
app.post("/api/notes", function(req, res){
   console.log('api/notespost');
   console.log(req.body);
   addNoteToJSON(req.body);
   res.json(getjson());} )

app.delete("/api/notes/:id", function(req, res){
  console.log('api/notesdelete');
  deleteNoteFromJSON(req.params.id);
  console.log(json);
  res.json(getjson());
} )
// html routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

// / Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
function getjson(){
  let data = fs.readFileSync(__dirname + '/db/db.json');
  let json = JSON.parse(data);
    return json;
}
function createNoteObject(data){
let Obj = {
  title: data.title,
  text: data.text,
  complete: false,
  hidden: false
}
return obj
}
function addNoteToJSON(note) {
  let json =getjson();
  let newNote = createNoteObject(note);
  json.push(newNote);
  saveJSON(json);

}
function saveJSON(jsonData) {
  let data = JSON.stringify(jsonData);
  fs.writeFileSync(__dirname + '/db/db.json', data)

}
function deleteNoteFromJSON(id) {
  let json = getjson();
  json[id].hide = true
  saveJSON(json);
}