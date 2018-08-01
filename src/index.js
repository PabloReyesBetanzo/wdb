// Vendor libraries
import $ from "jquery";
import popper from "popper.js";
import "bootstrap";

// Stylesheets
import "./main.sass";

// Components
import component from "./component";

document.body.appendChild(component());

$(function() {
    $("body").append(`<h1>Hello, World!</h1>`);
    $("body").append(`<button class="btn btn-default">Hello, World!</button>`);
});
