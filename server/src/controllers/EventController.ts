import { Request, Response } from 'express';
import EventService from '../services/EventService';
import { CustomRequest } from '../utils/types';

class EventController {

  static async listEvents(req: CustomRequest, res: Response) {
    try {

      const { id } = req.user
      const events = await EventService.listEvents(id);
      res.json({ events });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error listing event: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }

  static async createEvent(req: CustomRequest, res: Response) {
    try {
      const { name, dates } = req.body;
      const { id } = req.user
      if (!name || !dates) {
        return res.status(400).json({ msg: 'Please provide both name and dates' });
      }
      const event = await EventService.createEvent(name, dates, id);
      console.log('aaaa', event)
      res.json({
        id: event._id,
        uniqueId: event.uniqueId,
        name: event.name,
        dates: event.dates,
        votes: event.votes.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error creating event: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }

  static async getEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const event = await EventService.getEvent(id);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json({
        id: event._id,
        name: event.name,
        dates: event.dates,
        votes: event.votes.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error fetching: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }

  static async addVotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, votes } = req.body;
      if (!name || !votes) {
        return res.status(400).json({ msg: 'Please provide name and votes' });
      }
      const event = await EventService.addVotes(id, name, votes);
      res.json({
        id: event._id,
        name: event.name,
        dates: event.dates,
        votes: event.votes.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error adding votes: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }
  
  static async getEventResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const results = await EventService.getEventResults(id);
      res.json({
        id: results.uniqueId,
        name: results.name,
        suitableDates: results.suitableDates.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error in event result: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }
}

export default EventController;
