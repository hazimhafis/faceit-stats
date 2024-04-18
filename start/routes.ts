/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import FaceitDataController from '#controllers/FaceitDataController';
// import Route from '@ioc:Adonis/Core/Route';

router.get('/api/upcoming-matches', [FaceitDataController, 'getUpcomingMatches']);
