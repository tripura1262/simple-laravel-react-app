<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use RakibDevs\Weather\Weather;

class WeatherController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index(Request $request)
    {
        $wt = new Weather();
        // By city name
        $info = $wt->getCurrentByCity($request->get('q')); 

        // By city ID - download list of city id here http://bulk.openweathermap.org/sample/
        // $info = $wt->getCurrentByCity(1185241); 

        // // By Zip Code - string with country code 
        // $info = $wt->getCurrentByZip('94040,us');  // If no country code specified, us will be default

        // // By coordinates : latitude and longitude
        // $info = $wt->getCurrentByCord(23.7104, 90.4074);
        return response()->json($info);
    }
}
