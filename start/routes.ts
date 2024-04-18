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

router.get('/api/upcoming-matches', [FaceitDataController, 'getUpcomingMatches']);
