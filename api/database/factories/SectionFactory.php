<?php

use Faker\Generator as Faker;

$factory->define(App\Section::class, function (Faker $faker) {
    $inHome = $faker->boolean(70);
    if ($inHome) {$orderHome = 1;}
    else {$orderHome = 0;}

    return [
        'name' => 'Portfolio',
        'in_home' => $inHome,
        'order_home' => $orderHome,
        'is_active' => 1
    ];
});
