import Event from '../database/models/EventModel';

class VoteService {
  static async addVotes(uniqueId: string, name: string, votes: string[]) {
    const event = await Event.findOne({ uniqueId });

    if (!event) {
      throw new Error('Event not found');
    }

    votes.forEach((date) => {
      const vote = event.votes.find(vote => vote.date === date);
      if (vote) {
        if (!vote.people.includes(name)) {
          vote.people.push(name);
        }
      } else {
        event.votes.push({ date, people: [name] });
      }
    });

    await event.save();

    return {
      id: event._id,
      name: event.name,
      dates: event.dates,
      votes: event.votes.map(vote => ({
        date: vote.date,
        people: vote.people,
      })),
    };
  }

  static async getResults(uniqueId: string) {
    const event = await Event.findOne({ uniqueId });
    if (!event) throw new Error('Event not found');

    const totalPeople = new Set(event.votes.flatMap(v => v.people)).size;
    const suitableDates = event.votes.filter(vote =>
      vote.people.length === totalPeople
    );

    return {
      id: event._id,
      name: event.name,
      suitableDates: suitableDates.map(vote => ({
        date: vote.date,
        people: vote.people,
      })),
    };
  }

}

export default VoteService;
