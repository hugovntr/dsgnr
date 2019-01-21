# DSGNR

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/BLVCKLNGS/dsgnr/blob/master/LICENSE)

__Keep in mind:__ This is a development version, which mean it is not safe to use on a production environnement.

However, if you still want to install it in *local* to check it out and have a little fun modifying the code, you can by following the basic setup process below.


## Basic setup
* Install laravel dependencies `cd api && composer install && cd ../`
* Create the laravel .env file `cd api && cp .env.example .env`
* You will need to [Setup your environment file](https://github/com/BLVCKLNGS/dsgnr#api-environment)
* Install npm dependencies `yarn install`
* Launch the local server `yarn run serve` or `yarn serve`

## API Environnement

In the directory `/api` you will find a file `.env.example`. It is recommended to copy this file and to rename it `.env` inside you can change the __APP_URL__ or the __APP_NAME__ if you want/need to.
For now we use a SQLite database, if you want to use anything else like MySQL, PostgreSQL or Redis, you can change the __DB_...__ section values.
Keep in mind that everything is optimised and made to work with SQLite. Further updates will eventually fix any bug you will encounter while trying *unsupported* databases.

By default, __APP_KEY__ is not defined, you will need to generate it using the command `php artisan key:generate` in the `/api` directory (otherwise __artisan__ will not work).

For the development release it is highly recommended to grant all permissions to the *storage* folder with a `sudo chmod -R 777 api/storage`

## License

The DSGNR Project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).