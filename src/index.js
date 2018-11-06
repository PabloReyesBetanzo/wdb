// Vendor libraries
import $ from "jquery";
import popper from "popper.js";
import "bootstrap";

// Stylesheets
import "./main.sass";

// Components
import component from "./component";

document.body.appendChild(component());

// jQuery test
$(function() {
    $("body").append(`
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <p>Prueba jQuery</p>
                    <button class="btn btn-default"><i class="fas fa-shopping-cart"></i> Hello, World!</button>
                </div>
            </div>
        </div>
    `);
});
