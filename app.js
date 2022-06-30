const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in tellus consectetur, ornare turpis eu," +
"sagittis purus. Curabitur sit amet lorem non nunc rhoncus mattis. Quisque ex diam, semper ut viverra et, ornare in leo. " +
"Suspendisse et aliquet elit. Suspendisse a iaculis nisi. Cras tempus turpis id erat viverra feugiat. Ut ac interdum ex. " +
"Maecenas gravida turpis et efficitur faucibus. Vivamus posuere tellus ut placerat eleifend. Ut non nisi fermentum, semper "+
"metus ac, euismod felis.";

const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero nulla, fringilla non dictum et, " +
"venenatis at ex. Phasellus a lacus justo. Proin laoreet tellus vitae orci convallis, at luctus felis faucibus. Suspendisse " +
"potenti. Etiam varius faucibus turpis quis hendrerit. Morbi nec nibh at tortor eleifend bibendum. Nullam imperdiet egestas " +
"venenatis. Integer placerat nisi eu felis imperdiet consectetur. Sed id hendrerit nibh, eu pulvinar lectus. Vivamus rutrum " +
"ante eget tellus molestie, eget condimentum risus cursus. In semper sit amet libero sit amet aliquet. Quisque facilisis vehicula " +
"maximus. Vivamus aliquet fringilla metus eget maximus. Sed euismod elit a sagittis tincidunt. Suspendisse libero nisl, tincidunt " +
"non dui ut, mollis volutpat sem. Praesent viverra dictum velit quis viverra.";

const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut lectus nec velit rhoncus rutrum in non " +
"est. Sed pharetra accumsan congue. Mauris interdum, mi a vehicula efficitur, nibh ante scelerisque felis, non posuere orci arcu " +
"a ligula. Sed scelerisque, lacus id malesuada maximus, sem eros dignissim libero, sit amet vehicula velit felis at sapien. " +
"Phasellus nec imperdiet dui. Suspendisse eu mauris venenatis ante tempor maximus. Sed porta accumsan dui, quis dapibus massa " +
"ornare eget. Morbi elementum pulvinar pharetra.";

let posts = [];

app.get("/", function(req, res) {
    res.render("home", { homeContent: homeContent, posts:posts });
});

app.get("/posts/:postTitle", function(req, res) {
    posts.forEach(function(post) {
        if (_.lowerCase(post.postTitle) === _.lowerCase(req.params.postTitle)) {
            res.render("post", { postTitle: post.postTitle, postContent: post.postContent });
        }// else {
        //     console.log("Match was not found!");
        // }
    });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent});
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("", function(req, res) {

    const content = {
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
    };

    posts.push(content);
    res.redirect("/");
});

app.listen(3000, function(req, res) {
    console.log("The server is listening to port 3000");
});
