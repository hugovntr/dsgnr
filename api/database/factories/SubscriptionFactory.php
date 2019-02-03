<?php

use Faker\Generator as Faker;

$factory->define(App\Subscription::class, function (Faker $faker) {
    $level = $faker->numberBetween(0,2);
    if ($level > 0) {$paymentType = $faker->numberBetween(1,2);}
    else {$paymentType = 0;}

    return [
        'level' => $level,
        'auto_renew' => $faker->boolean,
        'valid_until' => $faker->dateTimeBetween('now', '+3 months', null),
        'payment_type' => $paymentType
    ];
});
