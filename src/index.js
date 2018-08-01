import $ from "jquery";
import popper from "popper.js";
import component from "./component";
import "./main.sass";

document.body.appendChild(component());

$(function() {
    alert("Hello, World!");
});
