<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vidio extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'url_vidio',
        'user_id',
    ];
}
