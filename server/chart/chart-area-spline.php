<?php
    sleep(1);
    
    // generate score
    $score = "";
	$data=(isset($data))?$data:"";
    for ($i=1; $i <= 7; $i++) { 
        $month = DateTime::createFromFormat("!m", $i);
        $score1 .= '["'.$month->format("M").'", '.rand(10 , 100).'],';
        $score2 .= '["'.$month->format("M").'", '.rand(10 , 150).'],';
    }

    $data .= '{';
    $data .= '"label" : "Visits",';
    $data .= '"color" : "#DC554F",';
    $data .= '"data" : ['.rtrim($score2, ",").']';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Hit",';
    $data .= '"color" : "#9365B8",';
    $data .= '"data" : ['.rtrim($score1, ",").']';
    $data .= '}';

    echo '[';
    echo $data;
    echo ']';
?>