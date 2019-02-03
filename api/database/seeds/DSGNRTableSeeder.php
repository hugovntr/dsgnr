<?php

use Illuminate\Database\Seeder;

class DSGNRTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userCount = (int)$this->command->ask("How many users need to be generated ?", 4);
        $minImageCount = (int)$this->command->ask("Minimum images per users ?", 5);
        $maxImageCount = (int)$this->command->ask("Maximum images per users ?", 30);

        //Creating the users
        $users = factory(App\User::class, $userCount)->create();
        $users->each(function($user) use($minImageCount, $maxImageCount) {
            $site = factory(App\Site::class)->create(['user_id' => $user->id]);
            factory(App\Subscription::class)->create(['user_id' => $user->id]);
            factory(App\Section::class)->create(['site_id' => $site->id]);
            factory(App\Image::class, mt_rand($minImageCount, $maxImageCount))->create(['site_id' => $site->id]);
        });
    }
}
