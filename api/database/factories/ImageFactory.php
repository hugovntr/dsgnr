<?php

use Faker\Generator as Faker;

$factory->define(App\Image::class, function (Faker $faker) {
	$title = $faker->words(2, true);
    return [
        'title' => $title,
        'slug' => str_slug($title, '-'),
        'url' => "https://source.unsplash.com/collection/181581/?sig=" . $faker->unique()->numberBetween(1, 396),
        'content' => $faker->paragraphs(2, true),
        'cat_id' => rand(0, 5),
    ];
});
