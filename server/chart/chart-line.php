<?php
    sleep(1);
    
    // generate score
    $score = "";
    $data=(isset($data))?$data:"";
    for ($i=1; $i <= 9; $i++) { 
        $month = DateTime::createFromFormat("!m", $i);
        $score1 .= '["'.$month->format("M").'", '.rand(80 , 110).'],';
        $score2 .= '["'.$month->format("M").'", '.rand(120 , 170).'],';
        $score3 .= '["'.$month->format("M").'", '.rand(180 , 210).'],';
    }

    $data .= '{';
    $data .= '"label" : "Return",';
    $data .= '"color" : "#ac92ed",';
    $data .= '"data" : ['.rtrim($score3, ",").']';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Visits",';
    $data .= '"color" : "#ed5466",';
    $data .= '"data" : ['.rtrim($score2, ",").']';
    $data .= '},';

    $data .= '{';
    $data .= '"label" : "Hit",';
    $data .= '"color" : "#4fc0e8",';
    $data .= '"data" : ['.rtrim($score1, ",").']';
    $data .= '}';

    echo '[';
    echo $data;
    echo ']';
?>