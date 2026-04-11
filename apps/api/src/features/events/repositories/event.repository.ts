import prisma from '../../../shared/config/database.js';

export class EventRepository {
  // Get all events (landing page) dengan filter
  async findAll(filters: {
    category?: string;
    location?: string;
    search?: string;
  }) {
    return prisma.event.findMany({
      where: {
        isPublished: true,
        ...(filters.category && { category: filters.category }),
        ...(filters.location && { location: { contains: filters.location, mode: 'insensitive' } }),
        ...(filters.search && { name: { contains: filters.search, mode: 'insensitive' } }),
      },
      include: {
        organizer: { select: { id: true, name: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { startDate: 'asc' },
    });
  }

  // Get event detail by ID
  async findById(id: number) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        organizer: { select: { id: true, name: true, email: true } },
        vouchers: {
          where: {
            endDate: { gte: new Date() },
            usedCount: { lt: prisma.voucher.fields.maxUsage },
          },
        },
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  // Create event
  async create(data: any) {
    return prisma.event.create({ data });
  }

  // Update event
  async update(id: number, data: any) {
    return prisma.event.update({ where: { id }, data });
  }
}

export const eventRepository = new EventRepository();