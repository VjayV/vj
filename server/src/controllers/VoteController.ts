import { Request, Response } from 'express';
import VoteService from '../services/VoteService';

class VoteController {

  static async addVote(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const { name, votes } = req.body; 

      if (!name || !votes || !Array.isArray(votes)) {
        return res.status(400).json({ msg: 'Name and votes are required' });
      }

      const updatedEvent = await VoteService.addVotes(id, name, votes);

      res.json(updatedEvent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error adding votes: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }

  static async getResults(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const results = await VoteService.getResults(id);
      res.json(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      console.error(`Error getting results: ${errorMessage}`);
      res.status(400).send(errorMessage);
    }
  }
}

export default VoteController;
