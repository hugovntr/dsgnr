<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class Image extends Model
{
	/**
	 * Store image in storage folder
	 *
	 * @param UploadedFile $media
	 * @return void
	 */
	static function store(UploadedFile $media)
	{
		$name = $media->getClientOriginalName();
		$path = $media->storeAs('images', $name, 'public');
		return asset($path);
	}
}
