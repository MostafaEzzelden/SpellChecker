<?php
if (isset($_GET['name'])) {
    $path = pathinfo($_GET['name']);
    if ($path["extension"] == "wasm") {
        header("Content-Type: application/wasm");
    }
    readfile($_GET['name']);
}
