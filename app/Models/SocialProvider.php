<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialProvider extends Model
{
    use HasFactory;
    protected $fillable =['id','user_id','provider_id','provider'];
    
    function user(){
        return $this->belongsTo(User::class);
    }
}
