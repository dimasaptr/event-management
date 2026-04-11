import { Router } from 'express';
import { eventController } from '../controllers/event.controller.js';
import { authenticate, authorize } from '../../../shared/middlewares/auth.middleware.js';

const router = Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventDetails);
router.post('/', authenticate, authorize(['ORGANIZER']), eventController.createEvent);
router.put('/:id', authenticate, authorize(['ORGANIZER']), eventController.updateEvent);

export default router;