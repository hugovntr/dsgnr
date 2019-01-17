<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Image;
use App\Http\Resources\Image as ImageResource;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->input('type') === 'slugs') {
            return Image::get(['slug'])->groupBy('slug')->keys();
        }

        $images = Image::paginate(10);
        return ImageResource::collection($images);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $image = new Image;

        $image->id = $request->input('id');
        $image->title = $request->input('title');
        $image->slug = str_slug($request->input('title'), '-');
        $image->url = $request->input('url');
        $image->content = $request->input('content');

        if ($image->save()) {
            return new ImageResource($image);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $image = Image::where('slug', $slug)->firstorfail();
        return new ImageResource($image);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        $image = Image::where('slug', $slug)->firstorfail();

        if ($request->hasFile('media')) {
            $validator = Validator::make($request->all(), [
                'media' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                return ;
            }
            
            $url = Image::store($request->file('media'));
        }
        else {
            $url = $image->url;
        }


        $image->title = $request->input('title') ?? $image->title;
        $image->content = $request->input('content') ?? $image->content;
        $image->url = $url;
        $image->slug = $request->input('title') ? str_slug($request->input('title'), '-') : $image->slug;
        if ($image->save()) {
            return new ImageResource($image);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $image = Image::findOrFail($id);

        if ($image->delete()) {
            return new ImageResource($image);
        }
    }
}
