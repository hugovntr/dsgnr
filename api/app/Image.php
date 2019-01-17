<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class Image extends Model
{
	static function store(UploadedFile $media)
	{
		$name = $media->getClientOriginalName();
		$path = $media->storeAs('images', $name, 'public');
		return asset($path);
	}
}
