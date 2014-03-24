<?php
    sleep(3);
    $data=(isset($data))?$data:"";
    $data .= '{';
    $data .= '"label" : "United States",';
    $data .= '"color" : "#00B1E1",';
    $data .= '"data" : 10';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Indonesia",';
    $data .= '"color" : "#91C854",';
    $data .= '"data" : 30';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "India",';
    $data .= '"color" : "#63D3E9",';
    $data .= '"data" : 90';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "United Kingdom",';
    $data .= '"color" : "#FFD66A",';
    $data .= '"data" : 70';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Mexico",';
    $data .= '"color" : "#ED5466",';
    $data .= '"data" : 80';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Spain",';
    $data .= '"color" : "#6BCCB4",';
    $data .= '"data" : 110';
    $data .= '}';

    echo '[';
    echo $data;
    echo ']';
?>