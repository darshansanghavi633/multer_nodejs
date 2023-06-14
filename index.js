const express = require("express");
const path = require("path");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });   don't need this instance
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination is used to specify the path of the directory in which the files have to be stored
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file.
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

// Configure storage engine instead of dest object.
const upload = multer({ storage });

//to upload a single file and in that mention the name of that input
app.post("/upload", upload.single("profile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(PORT, () => console.log("Server started at PORT:8000"));
