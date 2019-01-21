# DSGNR

Version: 0.0.12-dev\
Build Name: __Harvard Panther__\
Status: *unsafe for production*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/BLVCKLNGS/dsgnr/blob/master/LICENSE)

__Keep in mind:__ This is a development version, which mean it is not safe to use on a production environnement.

However, if you still want to install it in *local* to check it out and have a little fun modifying the code, you can by following the basic setup process below.

## Dependencies
The list of dependencies required to run __DSGNR(*Harvard Panther*)__ on your system
* __PHP__ 7.1.3+
* __Composer__ 1.7.2+
* __NodeJS__ 9.3.0+
* __npm__ 6.5.0+ or __yarn__ 1.12.3+ *(recommended)*


## Basic setup
* Install laravel dependencies `cd api && composer install`
* Create the laravel .env file `cp .env.example .env && cd ../`
* You will need to [Setup your environment file](https://github.com/BLVCKLNGS/dsgnr#api-environment)
* Install npm dependencies `yarn install`
* Launch the local server `yarn run serve` or `yarn serve`

## API Environment

In the directory `/api` you will find a file `.env.example`. It is recommended to copy this file and to rename it `.env` inside you can change the __APP_URL__ or the __APP_NAME__ if you want/need to.
For now we use a SQLite database, if you want to use anything else like MySQL, PostgreSQL or Redis, you can change the __DB_...__ section values.
Keep in mind that everything is optimised and made to work with SQLite. Further updates will eventually fix any bug you will encounter while trying *unsupported* databases.

By default, __APP_KEY__ is not defined, you will need to generate it using the command `php artisan key:generate` in the `/api` directory (otherwise __artisan__ will not work).

For the development release it is highly recommended to grant all permissions to the *storage* folder with a `sudo chmod -R 777 api/storage`

## License

The DSGNR Project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).