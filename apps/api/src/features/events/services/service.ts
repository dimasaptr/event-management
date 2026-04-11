import { eventRepository } from '../repositories/event.repository.js';

export class EventService {
  async getEvents(filters: {
    category?: string;
    location?: string;
    search?: string;
  }) {
    return eventRepository.findAll(filters);
  }

  async getEventDetails(id: number) {
    const event = await eventRepository.findById(id);
    if (!event) throw new Error('Event not found');
    return event;
  }

  async createEvent(organizerId: number, data: {
    name: string;
    description: string;
    price: number;
    startDate: string;
    endDate: string;
    availableSeats: number;
    location: string;
    category: string;
    imageUrl?: string;
  }) {
    // Validasi tanggal
    if (new Date(data.startDate) < new Date()) {
      throw new Error('Start date must be in the future');
    }
    
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      throw new Error('End date must be after start date');
    }

    return eventRepository.create({
      ...data,
      organizerId,
      isPublished: true,
    });
  }

  async updateEvent(eventId: number, organizerId: number, data: any) {
    // Cek apakah event milik organizer ini
    const event = await eventRepository.findById(eventId);
    if (!event || event.organizerId !== organizerId) {
      throw new Error('Unauthorized or event not found');
    }
    
    return eventRepository.update(eventId, data);
  }
}

export const eventService = new EventService();