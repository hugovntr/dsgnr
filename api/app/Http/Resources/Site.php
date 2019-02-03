<?php

namespace App\Http\Resources;

use App\User;
use App\Section;
use App\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class Site extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'user' => User::where('id', $this->id)->firstOrFail(),
            'mode' => $this->mode,
            'name' => $this->name,
            'theme' => $this->theme,
            'primary_color' => $this->primary_color,
            'secondary_color' => $this->secondary_color,
            'header_background' => $this->header_background,
            'header_text' => $this->header_text,
            'about_text' => $this->about_text,
            'sections' => Section::where('site_id', $this->id)->get(),
            'images' => Image::where('site_id', $this->id)->get(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
