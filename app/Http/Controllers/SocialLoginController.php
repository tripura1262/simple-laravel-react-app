<?php

namespace App\Http\Controllers;
use Auth;
use Socialite;

use Illuminate\Http\Request;

class SocialLoginController extends Controller
{
    // function create for index page
    public function index()
    {
        return view('social_login.index');
    }
    // function create for redirect on provider
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    // function create for provider handle and create
    public function handleProviderCallback($provider)
    {
        $user = Socialite::driver($provider)->user();
        $authUser = $this->findOrCreateUser($user, $provider);
        Auth::login($authUser, true);
        return view('social_login.index' ,compact('authUser'));

    }

    public function findOrCreateUser($user, $provider)
    {
        $authUser = SocialProvider::where('provider_id', $user->id)->first();
        if ($authUser) {
            return $authUser;
        }
        $fileContents = file_get_contents($user->getAvatar());
        // dd($fileContents);
        File::put(public_path() . '/socialite_profile/' . $user->getId() . ".jpg", $fileContents);
        return SocialProvider::create([
            'user_id'     => $user->id,
            'provider_id' => $user->id,
            'provider' => $provider,
            'profile' =>  $user->getId()
        ]);
    }
}
