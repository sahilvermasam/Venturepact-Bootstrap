<?php
    sleep(1);
    
    // generate score
    $score = "";
    $data=(isset($data))?$data:"";
    for ($i=1; $i <= 12; $i++) { 
        $month = DateTime::createFromFormat("!m", $i);
        $score .= '["'.$month->format("M").'", '.rand(10 , 100).'],';
    }

    $data .= '{';
    $data .= '"label" : "Population",';
    $data .= '"color" : "#00B1E1",';
    $data .= '"data": ['.rtrim($score, ",").']';
    $data .= '},';

    echo '[';
    echo rtrim($data, ",");
    echo ']';
?>