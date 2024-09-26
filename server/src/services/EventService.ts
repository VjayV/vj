import mongoose from 'mongoose';
import Event, { IEvent } from '../database/models/EventModel';
import User from '../database/models/UserModel';

class EventService {

  static async listEvents(userId: string) {
    return await Event.find({userId: new mongoose.Types.ObjectId(userId)}, { uniqueId: 1, name: 1 });
  }

  static async createEvent(name: string, dates: string[], userId: string) {

    console.log('userId',userId)
    // const user = await User.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    // const userId = user._id.toString();
    const newEvent = new Event({ name, dates, userId: new mongoose.Types.ObjectId(userId) });
    return await newEvent.save();
  }

  static async getEvent(uniqueId: string) {
    return await Event.findOne({ uniqueId });
  }

  static async addVotes(uniqueId: string, name: string, votes: string[]) {
    const event = await Event.findOne({ uniqueId });
    if (!event) throw new Error('Event not found');

    votes.forEach(date => {
      const vote = event.votes.find(vote => vote.date === date);
      if (vote) {
        vote.people.push(name);
      } else {
        event.votes.push({ date, people: [name] });
      }
    });

    return await event.save();
  }

  static async getEventResults(uniqueId: string) {
    const event = await Event.findOne({ uniqueId });
    if (!event) throw new Error('Event not found');

    const suitableDates = event.votes.filter(vote =>
      vote.people.length === event.votes.flatMap(v => v.people).length
    );

    return {
      uniqueId: event.uniqueId,
      name: event.name,
      suitableDates,
    };
  }
}

export default EventService;
