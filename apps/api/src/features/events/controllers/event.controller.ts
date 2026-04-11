import { Request, Response } from 'express';
import { eventService } from '../services/service.js';

export class EventController {
  // GET /api/events (landing page, filter, search)
  async getEvents(req: Request, res: Response) {
    try {
      const { category, location, search } = req.query;
      const events = await eventService.getEvents({
        category: category as string,
        location: location as string,
        search: search as string,
      });
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/events/:id (detail)
  async getEventDetails(req: Request, res: Response) {
    try {
      const event = await eventService.getEventDetails(Number(req.params.id));
      res.json(event);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // POST /api/events (create)
  async createEvent(req: Request, res: Response) {
    try {
      const organizerId = (req as any).user?.userId;
      if (!organizerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const event = await eventService.createEvent(organizerId, req.body);
      res.status(201).json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /api/events/:id (update)
  async updateEvent(req: Request, res: Response) {
    try {
      const organizerId = (req as any).user?.userId;
      const event = await eventService.updateEvent(
        Number(req.params.id),
        organizerId,
        req.body
      );
      res.json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const eventController = new EventController();