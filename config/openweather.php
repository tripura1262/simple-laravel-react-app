<?php

return [
    'api_key' 				=> env('OPENWEATHER_KEY'),
    'api_endpoint_current'  => 'https://api.openweathermap.org/data/2.5/weather?',
    'api_endpoint_forecast' => 'https://api.openweathermap.org/data/2.5/forecast?',
    'api_endpoint_onecall'  => 'https://api.openweathermap.org/data/2.5/onecall?',
    'api_endpoint_history'  => 'https://api.openweathermap.org/data/2.5/onecall/timemachine?',
    'api_endpoint_icons'    => 'https://openweathermap.org/img/w/',
    'api_lang' 				=> 'en',
    'format_date'           => 'm/d/Y',
    'format_time'           => 'h:i A',
    'format_day'            => 'l',
    'temp_format'       => 'c'  
];

?>