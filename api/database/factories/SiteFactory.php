<?php

use Faker\Generator as Faker;

$factory->define(App\Site::class, function (Faker $faker) {
    $name = $faker->company;
    return [
        'mode' => 1,
        'name' => $name,
        'theme' => 1,
        'primary_color' => $faker->hexcolor,
        'secondary_color' => $faker->hexcolor,
        'header_background' => "https://source.unsplash.com/collection/1103088/?sig=" . $faker->unique(true)->numberBetween(1,149),
        'header_text' => "<span class=\"primary-font bold-font-weight\">Welcome to,</span>$name<br/>"
    ];
});
