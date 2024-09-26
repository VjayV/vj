import { Request, Response } from 'express';
import VoteService from '../services/VoteService';

class ResultsController {

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

export default ResultsController;
