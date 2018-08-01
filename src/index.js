import $ from "jquery";
import component from "./component";
import "./main.sass";

document.body.appendChild(component());

$(function() {
    alert("Hello, World!");
});
