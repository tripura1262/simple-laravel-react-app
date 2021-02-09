<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Carbon\Carbon;

class AuthController extends Controller
{
    private $status_code = 200;

    public function userSignUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "first_name" => "required",
            "last_name" => "required",
            "email" => "required|email",
            "password" => "required",
            "phone" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "failed",
                "message" => "validation_error",
                "errors" => $validator->errors(),
            ]);
        }

        // $name = $request->name;
        // $name = explode(" ", $name);
        // $first_name = $name[0];
        // $last_name = "";

        // if (isset($name[1])) {
        //     $last_name = $name[1];
        // }

        $userDataArray = [
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "password" => md5($request->password),
            "phone" => $request->phone,
        ];

        $user_status = User::where("email", $request->email)->first();

        if (!is_null($user_status)) {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Whoops! email already registered",
            ]);
        }

        $user = User::create($userDataArray);

        if (!is_null($user)) {
            return response()->json([
                "status" => $this->status_code,
                "success" => true,
                "message" => "Registration completed successfully",
                "data" => $user,
            ]);
        } else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "failed to register",
            ]);
        }
    }

    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "failed",
                "validation_error" => $validator->errors(),
            ]);
        }

        // check if entered email exists in db
        $email_status = User::where("email", $request->email)->first();

        // if email exists then we will check password for the same email

        if (!is_null($email_status)) {
            $password_status = User::where("email", $request->email)
                ->where("password", md5($request->password))
                ->first();

            // if password is correct
            if (!is_null($password_status)) {
                $userData = $this->userDetail($request->email);
                $tokenResult = $userData->createToken("Personal Access Token");
                $token = $tokenResult->token;
                if ($request->remember_me) {
                    $token->expires_at = Carbon::now()->addWeeks(1);
                }
                $token->save();
                return response()->json([
                    "status" => $this->status_code,
                    "success" => true,
                    "message" => "You have logged in successfully",
                    "data" => $userData,
                    "access_token" => $tokenResult->accessToken,
                    "token_type" => "Bearer",
                    "expires_at" => Carbon::parse(
                        $tokenResult->token->expires_at
                    )->toDateTimeString(),
                ]);
            } else {
                return response()->json([
                    "status" => "failed",
                    "success" => false,
                    "message" => "Unable to login. Incorrect password.",
                ]);
            }
        } else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Unable to login. Email doesn't exist.",
            ]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        $user = [];
        if ($email != "") {
            $user = User::where("email", $email)->first();
            return $user;
        }
    }

    public function socialLogin($social)
    {
        if (
            $social == "facebook" ||
            $social == "google" ||
            $social == "linkedin"
        ) {
            return Socialite::driver($social)
                ->stateless()
                ->redirect();
        } else {
            return Socialite::driver($social)->redirect();
        }
    }

    public function handleProviderCallback($social)
    {
        if (
            $social == "facebook" ||
            $social == "google" ||
            $social == "linkedin"
        ) {
            $userSocial = Socialite::driver($social)
                ->stateless()
                ->user();
        } else {
            $userSocial = Socialite::driver($social)->user();
        }

        $token = $userSocial->token;

        $user = User::firstOrNew(["email" => $userSocial->getEmail()]);
        // echo "<pre>";print_R($userSocial);exit;
        if (!$user->id) {
            $name = $userSocial->name;
            $name = explode(" ", $name);
            $first_name = $name[0];
            $last_name = "";

            if (isset($name[1])) {
                $last_name = $name[1];
            }
            $user = User::create([
                "first_name" => $first_name,
                "last_name" => $last_name,
                "email" => $userSocial->email,
                "password" => md5("123456dummy"),
            ]);
            $user->save();
        }

        return response()->json(
            [
                "user" => [$user],
                "userSocial" => $userSocial,
                "token" => $token,
            ],
            200
        );
    }
}
