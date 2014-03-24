<?php
    sleep(1);
    
    // generate score
    $score = "";
    for ($i=1; $i <= 7; $i++) { 
        $month = DateTime::createFromFormat("!m", $i);
        $score1 .= '["'.$month->format("M").'", '.rand(10 , 100).'],';
        $score2 .= '["'.$month->format("M").'", '.rand(10 , 150).'],';
    }

    $data .= '{';
    $data .= '"label" : "Visits",';
    $data .= '"color" : "#7CA951",';
    $data .= '"data" : ['.rtrim($score2, ",").']';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Hit",';
    $data .= '"color" : "#46C8C8",';
    $data .= '"data" : ['.rtrim($score1, ",").']';
    $data .= '}';

    echo '[';
    echo $data;
    echo ']';
?>