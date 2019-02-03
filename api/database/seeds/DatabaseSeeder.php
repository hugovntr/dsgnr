<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        if ($this->command->confirm('Would you like me to clear the database before seeding ?')) {
            $this->command->call('migrate:fresh');
            $this->command->line('Database cleared!');
        }

        $this->call(DSGNRTableSeeder::class);
    }
}
