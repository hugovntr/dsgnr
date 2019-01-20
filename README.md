# DSGNR

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

__Keep in mind:__ This is a development version, which mean it is not safe to use on a production environnement.

However, if you still want to install it in *local* to check it out and have a little fun modifying the code, you can by following the basic setup process below.


## Project setup
Install laravel dependencies
```cd api && composer install && cd ../```

Create the laravel .env file
```cd api && cp .env.example .env````

Then you will need to edit the newly create .env file

Install npm dependencies
```yarn install```

Launch the local server
```yarn run serve``` or ```yarn serve```