<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
*/
Route::prefix('v1')->group(function() {
	
	Route::get('hello', function() {
		echo phpinfo();
	});

	Route::apiResource('images', 'ImageController')->middleware('cors');
	Route::apiResource('users', 'UserController')->middleware('cors');
	Route::apiResource('sites', 'SiteController')->middleware('cors');
});

/*
|--------------------------------------------------------------------------
| Images Getters
|--------------------------------------------------------------------------
*/
Route::get('/images/{name}/{size?}', function($name, $size = 'default') {
	$regex = '/^([1-9]+([0-9]+)?[x]{0,1}([1-9]+([0-9]+)?)?)$/';

	if ($size !== "default" && preg_match($regex, $size) == 0) {
		$size = "default";
	}
	
	$img = Img::make(Storage::disk('public')->get('images/' . $name));
    $mime = Storage::disk('public')->getMimetype('images/' . $name);


	if ($size === "default") {
		return $img->response($mime);
	}
	else {
		$size = explode('x', $size);
		$width = $size[0];
		$height = $size[1] ?? false;

		if (!$height) $height = $width;

		return $img->resize($width, $height, function($constraint) {
			$constraint->aspectRatio();
			$constraint->upsize();
		})->response($mime);
	}

});