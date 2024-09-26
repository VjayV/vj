import { Router } from 'express';
import EventController from '../controllers/EventController';
import VoteController from '../controllers/VoteController';
import ResultsController from '../controllers/ResultsController';
import UserAuth from './middlewares/auth';

const router = Router();

router.get('/list', UserAuth, EventController.listEvents);
router.post('/', UserAuth, EventController.createEvent);
router.get('/:id', EventController.getEvent);
router.post('/:id/vote', VoteController.addVote);
router.get('/:id/results', UserAuth, ResultsController.getResults);


export default router;
