<?php
    sleep(1);
    
    // generate score
    $score = "";
    $data=(isset($data))?$data:"";
    for ($i=1; $i <= 12; $i++) { 
        $month = DateTime::createFromFormat("!m", $i);
        $score1 .= '["'.$month->format("M").'", '.rand(10 , 100).'],';
        $score2 .= '["'.$month->format("M").'", '.rand(10 , 150).'],';
    }

    $data .= '{';
    $data .= '"label" : "Facebook",';
    $data .= '"color" : "#3b5998",';
    $data .= '"data" : ['.rtrim($score2, ",").']';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Twitter",';
    $data .= '"color" : "#55acee",';
    $data .= '"data" : ['.rtrim($score1, ",").']';
    $data .= '}';

    echo '[';
    echo $data;
    echo ']';
?>