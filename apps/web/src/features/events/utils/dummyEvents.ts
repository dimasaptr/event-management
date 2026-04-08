/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : dummyEvents.ts
 * Type        : Utility
 * Feature     : Feature 1
 * Source Path : src/features/events/utils/dummyEvents.ts
 * Used In     : Event Browsing, Event Detail, Organizer Event Preview
 * Status      : DUMMY DATA
 * Notes       : Temporary dummy event source before backend integration
 * =========================================
 */

import type { Event } from "@/types/event.types";

export const dummyEvents: Event[] = [
  {
    id: "evt-001",
    slug: "react-js-bootcamp-2026",
    title: "React JS Bootcamp 2026",
    category: {
      id: "cat-bootcamp",
      name: "BOOTCAMP",
    },
    description:
      "Bootcamp intensif untuk mempelajari React JS dari dasar hingga mampu membangun aplikasi modern berbasis component, routing, state management, dan integrasi API.",
    shortDescription:
      "Belajar React JS dari dasar sampai siap bikin project modern.",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    bannerUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    organizer: {
      id: "org-001",
      name: "Code Academy Indonesia",
      email: "hello@codeacademy.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=11",
    },
    price: 299000,
    isFree: false,
    totalSeats: 100,
    availableSeats: 42,
    startDate: "2026-05-15T09:00:00.000Z",
    endDate: "2026-05-15T16:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/react-bootcamp-2026",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 24,
    reviews: [
      {
        id: "review-001",
        eventId: "evt-001",
        userId: "user-001",
        rating: 5,
        comment: "Materinya padat dan mudah dipahami.",
        createdAt: "2026-04-05T08:00:00.000Z",
        updatedAt: "2026-04-05T08:00:00.000Z",
        user: {
          id: "user-001",
          name: "Andi",
        },
      },
    ],
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-05T08:00:00.000Z",
  },
  {
    id: "evt-002",
    slug: "ui-ux-design-workshop-beginner",
    title: "UI/UX Design Workshop for Beginner",
    category: {
      id: "cat-workshop",
      name: "WORKSHOP",
    },
    description:
      "Workshop dasar UI/UX untuk memahami design thinking, wireframing, user flow, dan prototyping menggunakan tools modern.",
    shortDescription:
      "Workshop dasar UI/UX untuk pemula yang ingin masuk dunia design digital.",
    thumbnail:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    bannerUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    organizer: {
      id: "org-002",
      name: "Design Space Studio",
      email: "team@designspace.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=12",
    },
    price: 149000,
    isFree: false,
    totalSeats: 80,
    availableSeats: 18,
    startDate: "2026-05-20T10:00:00.000Z",
    endDate: "2026-05-20T15:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Bandung",
      province: "Jawa Barat",
      country: "Indonesia",
      address: "Creative Hall Braga, Bandung",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.6,
    totalReviews: 12,
    reviews: [
      {
        id: "review-002",
        eventId: "evt-002",
        userId: "user-002",
        rating: 5,
        comment: "Workshop-nya runtut dan banyak insight yang langsung bisa dipakai.",
        createdAt: "2026-04-07T10:00:00.000Z",
        updatedAt: "2026-04-07T10:00:00.000Z",
        user: {
          id: "user-002",
          name: "Rina",
        },
      },
      {
        id: "review-003",
        eventId: "evt-002",
        userId: "user-003",
        rating: 4,
        comment: "Mentornya komunikatif dan sesi praktiknya membantu banget.",
        createdAt: "2026-04-08T09:30:00.000Z",
        updatedAt: "2026-04-08T09:30:00.000Z",
        user: {
          id: "user-003",
          name: "Dimas",
        },
      },
    ],
    createdAt: "2026-04-03T10:00:00.000Z",
    updatedAt: "2026-04-05T10:00:00.000Z",
  },
  {
    id: "evt-003",
    slug: "public-speaking-seminar-confident-stage",
    title: "Public Speaking Seminar: Confident on Stage",
    category: {
      id: "cat-seminar",
      name: "SEMINAR",
    },
    description:
      "Seminar untuk meningkatkan kepercayaan diri, teknik komunikasi, dan presentasi efektif di depan audiens.",
    shortDescription:
      "Seminar public speaking untuk meningkatkan percaya diri saat presentasi.",
    thumbnail:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    bannerUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    organizer: {
      id: "org-003",
      name: "SpeakUp Academy",
      email: "hello@speakup.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=13",
    },
    price: 89000,
    isFree: false,
    totalSeats: 120,
    availableSeats: 60,
    startDate: "2026-05-28T13:00:00.000Z",
    endDate: "2026-05-28T16:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/public-speaking-seminar",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.4,
    totalReviews: 9,
    reviews: [
      {
        id: "review-004",
        eventId: "evt-003",
        userId: "user-004",
        rating: 4,
        comment: "Tips public speaking-nya aplikatif dan bikin lebih pede presentasi.",
        createdAt: "2026-04-09T08:00:00.000Z",
        updatedAt: "2026-04-09T08:00:00.000Z",
        user: {
          id: "user-004",
          name: "Nadia",
        },
      },
    ],
    createdAt: "2026-04-04T09:00:00.000Z",
    updatedAt: "2026-04-06T09:00:00.000Z",
  },
  {
    id: "evt-004",
    slug: "career-switch-webinar-tech-industry",
    title: "Career Switch Webinar to Tech Industry",
    category: {
      id: "cat-webinar",
      name: "WEBINAR",
    },
    description:
      "Webinar untuk membantu peserta memahami roadmap pindah karier ke industri teknologi dari nol.",
    shortDescription:
      "Roadmap career switch ke industri tech untuk pemula.",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    bannerUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    organizer: {
      id: "org-004",
      name: "Next Career Hub",
      email: "team@nextcareer.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=14",
    },
    price: 0,
    isFree: true,
    totalSeats: 300,
    availableSeats: 180,
    startDate: "2026-06-05T19:00:00.000Z",
    endDate: "2026-06-05T21:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/career-switch-tech",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.9,
    totalReviews: 31,
    reviews: [
      {
        id: "review-005",
        eventId: "evt-004",
        userId: "user-005",
        rating: 5,
        comment: "Insight career switch-nya jelas, realistis, dan bikin lebih pede mulai pindah jalur.",
        createdAt: "2026-04-11T09:00:00.000Z",
        updatedAt: "2026-04-11T09:00:00.000Z",
        user: {
          id: "user-005",
          name: "Farhan",
        },
      },
      {
        id: "review-006",
        eventId: "evt-004",
        userId: "user-006",
        rating: 5,
        comment: "Pembahasan roadmap belajar dan portfolio-nya relate banget buat pemula.",
        createdAt: "2026-04-11T10:00:00.000Z",
        updatedAt: "2026-04-11T10:00:00.000Z",
        user: {
          id: "user-006",
          name: "Salsa",
        },
      },
    ],
    createdAt: "2026-04-08T09:00:00.000Z",
    updatedAt: "2026-04-10T09:00:00.000Z",
  },
  {
    id: "evt-005",
    slug: "data-analysis-with-excel",
    title: "Data Analysis with Excel",
    category: {
      id: "cat-course",
      name: "COURSE",
    },
    description:
      "Belajar analisis data menggunakan Microsoft Excel mulai dari formula dasar, pivot table, data cleaning, hingga dashboard sederhana.",
    shortDescription:
      "Belajar analisis data praktis dengan Excel untuk pemula.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    bannerUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    organizer: {
      id: "org-006",
      name: "Skill Upgrade Center",
      email: "class@skillupgrade.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=16",
    },
    price: 129000,
    isFree: false,
    totalSeats: 90,
    availableSeats: 0,
    startDate: "2026-06-22T09:00:00.000Z",
    endDate: "2026-06-22T14:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/data-analysis-excel",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.5,
    totalReviews: 14,
    reviews: [
      {
        id: "review-007",
        eventId: "evt-005",
        userId: "user-007",
        rating: 5,
        comment: "Materi Excel-nya cocok untuk pemula dan contoh kasusnya mudah diikuti.",
        createdAt: "2026-04-19T08:30:00.000Z",
        updatedAt: "2026-04-19T08:30:00.000Z",
        user: {
          id: "user-007",
          name: "Rafi",
        },
      },
      {
        id: "review-008",
        eventId: "evt-005",
        userId: "user-008",
        rating: 4,
        comment: "Sesi pivot table-nya membantu banget buat kerjaan sehari-hari.",
        createdAt: "2026-04-19T09:15:00.000Z",
        updatedAt: "2026-04-19T09:15:00.000Z",
        user: {
          id: "user-008",
          name: "Mira",
        },
      },
    ],
    createdAt: "2026-04-16T09:00:00.000Z",
    updatedAt: "2026-04-18T09:00:00.000Z",
  },
  {
    id: "evt-006",
    slug: "startup-networking-night",
    title: "Startup Networking Night",
    category: {
      id: "cat-networking",
      name: "NETWORKING",
    },
    description:
      "Event networking untuk founder, developer, designer, dan digital enthusiast yang ingin membangun koneksi, kolaborasi, dan peluang baru.",
    shortDescription:
      "Networking event untuk founder, developer, dan designer.",
    thumbnail:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    bannerUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    organizer: {
      id: "org-005",
      name: "Startup Circle ID",
      email: "community@startupcircle.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=15",
    },
    price: 59000,
    isFree: false,
    totalSeats: 150,
    availableSeats: 120,
    startDate: "2026-06-18T18:30:00.000Z",
    endDate: "2026-06-18T21:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Surabaya",
      province: "Jawa Timur",
      country: "Indonesia",
      address: "Co-Working Space Tunjungan, Surabaya",
    },
    status: "DRAFT",
    isFeatured: false,
    averageRating: 0,
    totalReviews: 0,
    createdAt: "2026-04-15T12:00:00.000Z",
    updatedAt: "2026-04-15T12:00:00.000Z",
  },
  {
    id: "evt-007",
    slug: "mobile-app-ui-challenge",
    title: "Mobile App UI Challenge",
    category: {
      id: "cat-competition",
      name: "COMPETITION",
    },
    description:
      "Kompetisi desain UI mobile untuk mengasah kreativitas, problem solving, dan kemampuan presentasi solusi digital secara visual.",
    shortDescription:
      "Kompetisi desain UI mobile untuk pelajar, mahasiswa, dan junior designer.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    bannerUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    organizer: {
      id: "org-002",
      name: "Design Space Studio",
      email: "team@designspace.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=12",
    },
    price: 79000,
    isFree: false,
    totalSeats: 60,
    availableSeats: 24,
    startDate: "2026-07-01T08:00:00.000Z",
    endDate: "2026-07-01T17:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Yogyakarta",
      province: "DI Yogyakarta",
      country: "Indonesia",
      address: "Creative Hub Malioboro, Yogyakarta",
    },
    status: "ARCHIVED",
    isFeatured: false,
    averageRating: 4.3,
    totalReviews: 6,
    reviews: [
      {
        id: "review-009",
        eventId: "evt-007",
        userId: "user-009",
        rating: 4,
        comment: "Challenge-nya seru dan brief desainnya cukup menantang.",
        createdAt: "2026-04-21T10:00:00.000Z",
        updatedAt: "2026-04-21T10:00:00.000Z",
        user: {
          id: "user-009",
          name: "Aulia",
        },
      },
    ],
    createdAt: "2026-04-18T13:00:00.000Z",
    updatedAt: "2026-04-20T13:00:00.000Z",
  },
  {
    id: "evt-008",
    slug: "product-management-fundamentals",
    title: "Product Management Fundamentals",
    category: {
      id: "cat-seminar",
      name: "SEMINAR",
    },
    description:
      "Seminar intensif untuk memahami dasar product management, mulai dari riset user, penyusunan roadmap, prioritas fitur, hingga komunikasi lintas tim.",
    shortDescription:
      "Belajar fondasi product management untuk pemula dan career switcher.",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    bannerUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    organizer: {
      id: "org-007",
      name: "Product Circle Asia",
      email: "hello@productcircle.asia",
      profileImageUrl: "https://i.pravatar.cc/150?img=17",
    },
    price: 119000,
    isFree: false,
    totalSeats: 140,
    availableSeats: 88,
    startDate: "2026-07-08T10:00:00.000Z",
    endDate: "2026-07-08T13:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/product-management-fundamentals",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.7,
    totalReviews: 18,
    reviews: [
      {
        id: "review-010",
        eventId: "evt-008",
        userId: "user-010",
        rating: 5,
        comment: "Cocok banget buat yang baru mau masuk ke role PM dan butuh gambaran yang rapi.",
        createdAt: "2026-04-22T09:00:00.000Z",
        updatedAt: "2026-04-22T09:00:00.000Z",
        user: {
          id: "user-010",
          name: "Kevin",
        },
      },
    ],
    createdAt: "2026-04-19T10:00:00.000Z",
    updatedAt: "2026-04-21T10:00:00.000Z",
  },
  {
    id: "evt-009",
    slug: "advanced-figma-design-system-lab",
    title: "Advanced Figma Design System Lab",
    category: {
      id: "cat-workshop",
      name: "WORKSHOP",
    },
    description:
      "Workshop lanjutan untuk membangun design system di Figma, termasuk token, component variants, documentation, dan handoff ke developer.",
    shortDescription:
      "Workshop lanjutan Figma untuk design system dan handoff modern.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    bannerUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    organizer: {
      id: "org-002",
      name: "Design Space Studio",
      email: "team@designspace.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=12",
    },
    price: 219000,
    isFree: false,
    totalSeats: 70,
    availableSeats: 29,
    startDate: "2026-07-12T02:00:00.000Z",
    endDate: "2026-07-12T07:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Jakarta",
      province: "DKI Jakarta",
      country: "Indonesia",
      address: "Creative Hub SCBD, Jakarta",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 21,
    reviews: [
      {
        id: "review-011",
        eventId: "evt-009",
        userId: "user-011",
        rating: 5,
        comment: "Materinya detail dan sangat membantu buat tim yang lagi bangun design system.",
        createdAt: "2026-04-23T08:00:00.000Z",
        updatedAt: "2026-04-23T08:00:00.000Z",
        user: {
          id: "user-011",
          name: "Tiara",
        },
      },
    ],
    createdAt: "2026-04-20T08:00:00.000Z",
    updatedAt: "2026-04-22T08:00:00.000Z",
  },
  {
    id: "evt-010",
    slug: "ai-for-business-bootcamp",
    title: "AI for Business Bootcamp",
    category: {
      id: "cat-bootcamp",
      name: "BOOTCAMP",
    },
    description:
      "Bootcamp praktikal untuk memanfaatkan AI dalam workflow bisnis, mulai dari riset, copywriting, analisis data ringan, sampai automasi operasional.",
    shortDescription:
      "Bootcamp AI praktikal untuk bisnis, marketer, dan operations team.",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    bannerUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    organizer: {
      id: "org-008",
      name: "FutureOps Academy",
      email: "hello@futureops.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=18",
    },
    price: 349000,
    isFree: false,
    totalSeats: 110,
    availableSeats: 74,
    startDate: "2026-07-18T03:00:00.000Z",
    endDate: "2026-07-18T09:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/ai-for-business-bootcamp",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.6,
    totalReviews: 15,
    reviews: [
      {
        id: "review-012",
        eventId: "evt-010",
        userId: "user-012",
        rating: 4,
        comment: "Pembahasannya aplikatif dan banyak contoh yang relate ke kebutuhan bisnis sehari-hari.",
        createdAt: "2026-04-24T10:00:00.000Z",
        updatedAt: "2026-04-24T10:00:00.000Z",
        user: {
          id: "user-012",
          name: "Gilang",
        },
      },
    ],
    createdAt: "2026-04-21T11:00:00.000Z",
    updatedAt: "2026-04-23T11:00:00.000Z",
  },
  {
    id: "evt-011",
    slug: "creative-networking-for-freelancers",
    title: "Creative Networking for Freelancers",
    category: {
      id: "cat-networking",
      name: "NETWORKING",
    },
    description:
      "Networking meetup untuk freelancer, creator, designer, dan marketer yang ingin memperluas koneksi, kolaborasi, dan peluang project baru.",
    shortDescription:
      "Meetup networking santai untuk freelancer dan creative professionals.",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    bannerUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    organizer: {
      id: "org-005",
      name: "Startup Circle ID",
      email: "community@startupcircle.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=15",
    },
    price: 0,
    isFree: true,
    totalSeats: 180,
    availableSeats: 140,
    startDate: "2026-07-24T11:00:00.000Z",
    endDate: "2026-07-24T14:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Bandung",
      province: "Jawa Barat",
      country: "Indonesia",
      address: "Common House Dago, Bandung",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.2,
    totalReviews: 7,
    reviews: [
      {
        id: "review-013",
        eventId: "evt-011",
        userId: "user-013",
        rating: 4,
        comment: "Suasananya santai dan banyak kenalan baru dari berbagai bidang kreatif.",
        createdAt: "2026-04-25T09:30:00.000Z",
        updatedAt: "2026-04-25T09:30:00.000Z",
        user: {
          id: "user-013",
          name: "Nara",
        },
      },
    ],
    createdAt: "2026-04-22T09:30:00.000Z",
    updatedAt: "2026-04-24T09:30:00.000Z",
  },
  {
    id: "evt-012",
    slug: "backend-nodejs-express-masterclass",
    title: "Backend Node.js & Express Masterclass",
    category: {
      id: "cat-bootcamp",
      name: "BOOTCAMP",
    },
    description:
      "Bootcamp backend menggunakan Node.js dan Express untuk membangun REST API yang scalable, termasuk autentikasi JWT, middleware, validasi input, dan koneksi database.",
    shortDescription:
      "Bangun REST API production-ready dengan Node.js dan Express dari nol.",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    bannerUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    organizer: {
      id: "org-001",
      name: "Code Academy Indonesia",
      email: "hello@codeacademy.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=11",
    },
    price: 349000,
    isFree: false,
    totalSeats: 100,
    availableSeats: 55,
    startDate: "2026-08-02T09:00:00.000Z",
    endDate: "2026-08-02T17:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/nodejs-express-masterclass",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.9,
    totalReviews: 19,
    reviews: [
      {
        id: "review-014",
        eventId: "evt-012",
        userId: "user-014",
        rating: 5,
        comment: "Materi API-nya lengkap dan langsung bisa dipakai buat project nyata.",
        createdAt: "2026-04-26T08:00:00.000Z",
        updatedAt: "2026-04-26T08:00:00.000Z",
        user: { id: "user-014", name: "Bagas" },
      },
    ],
    createdAt: "2026-04-23T08:00:00.000Z",
    updatedAt: "2026-04-25T08:00:00.000Z",
  },
  {
    id: "evt-013",
    slug: "content-creator-growth-workshop",
    title: "Content Creator Growth Workshop",
    category: {
      id: "cat-workshop",
      name: "WORKSHOP",
    },
    description:
      "Workshop untuk content creator yang ingin mengembangkan strategi konten, memahami algoritma platform, dan membangun audiens yang loyal di media sosial.",
    shortDescription:
      "Strategi konten dan pertumbuhan audiens untuk content creator pemula hingga menengah.",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    bannerUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    organizer: {
      id: "org-004",
      name: "Growth Media Lab",
      email: "hello@growthmedialab.com",
      profileImageUrl: "https://i.pravatar.cc/150?img=14",
    },
    price: 129000,
    isFree: false,
    totalSeats: 80,
    availableSeats: 33,
    startDate: "2026-08-09T10:00:00.000Z",
    endDate: "2026-08-09T14:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Jakarta",
      province: "DKI Jakarta",
      country: "Indonesia",
      address: "Creative Space Kemang, Jakarta Selatan",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.5,
    totalReviews: 11,
    reviews: [
      {
        id: "review-015",
        eventId: "evt-013",
        userId: "user-015",
        rating: 5,
        comment: "Insight soal algoritma dan strategi konten-nya sangat actionable.",
        createdAt: "2026-04-27T09:00:00.000Z",
        updatedAt: "2026-04-27T09:00:00.000Z",
        user: { id: "user-015", name: "Layla" },
      },
    ],
    createdAt: "2026-04-24T10:00:00.000Z",
    updatedAt: "2026-04-26T10:00:00.000Z",
  },
  {
    id: "evt-014",
    slug: "python-data-science-fundamentals",
    title: "Python for Data Science Fundamentals",
    category: {
      id: "cat-course",
      name: "COURSE",
    },
    description:
      "Kelas dasar Python untuk data science, mencakup sintaks Python, manipulasi data dengan Pandas, visualisasi dengan Matplotlib, dan pengenalan machine learning sederhana.",
    shortDescription:
      "Belajar Python untuk data science dari nol hingga siap eksplorasi data.",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    bannerUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    organizer: {
      id: "org-006",
      name: "Skill Upgrade Center",
      email: "class@skillupgrade.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=16",
    },
    price: 199000,
    isFree: false,
    totalSeats: 120,
    availableSeats: 72,
    startDate: "2026-08-16T09:00:00.000Z",
    endDate: "2026-08-16T15:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/python-data-science",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.7,
    totalReviews: 23,
    reviews: [
      {
        id: "review-016",
        eventId: "evt-014",
        userId: "user-016",
        rating: 5,
        comment: "Penjelasan Pandas dan visualisasi datanya mudah diikuti bahkan untuk pemula.",
        createdAt: "2026-04-28T08:30:00.000Z",
        updatedAt: "2026-04-28T08:30:00.000Z",
        user: { id: "user-016", name: "Dian" },
      },
    ],
    createdAt: "2026-04-25T09:00:00.000Z",
    updatedAt: "2026-04-27T09:00:00.000Z",
  },
  {
    id: "evt-015",
    slug: "hr-talent-management-seminar",
    title: "HR & Talent Management Seminar",
    category: {
      id: "cat-seminar",
      name: "SEMINAR",
    },
    description:
      "Seminar untuk HR profesional dan manajer yang ingin memahami strategi talent acquisition, employee engagement, performance review, dan culture building di era modern.",
    shortDescription:
      "Strategi HR modern untuk talent acquisition dan employee engagement.",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    bannerUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    organizer: {
      id: "org-007",
      name: "Product Circle Asia",
      email: "hello@productcircle.asia",
      profileImageUrl: "https://i.pravatar.cc/150?img=17",
    },
    price: 149000,
    isFree: false,
    totalSeats: 160,
    availableSeats: 98,
    startDate: "2026-08-22T08:30:00.000Z",
    endDate: "2026-08-22T12:30:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Surabaya",
      province: "Jawa Timur",
      country: "Indonesia",
      address: "Hotel Majapahit Ballroom, Surabaya",
    },
    status: "PUBLISHED",
    isFeatured: false,
    averageRating: 4.4,
    totalReviews: 14,
    reviews: [
      {
        id: "review-017",
        eventId: "evt-015",
        userId: "user-017",
        rating: 4,
        comment: "Pembahasan talent acquisition dan retention-nya relevan banget buat tim HR kami.",
        createdAt: "2026-04-29T09:00:00.000Z",
        updatedAt: "2026-04-29T09:00:00.000Z",
        user: { id: "user-017", name: "Wulan" },
      },
    ],
    createdAt: "2026-04-26T10:00:00.000Z",
    updatedAt: "2026-04-28T10:00:00.000Z",
  },
  {
    id: "evt-016",
    slug: "web3-blockchain-intro-webinar",
    title: "Web3 & Blockchain Introduction Webinar",
    category: {
      id: "cat-webinar",
      name: "WEBINAR",
    },
    description:
      "Webinar pengenalan Web3 dan blockchain untuk pemula, mencakup konsep dasar blockchain, smart contract, DeFi, NFT, dan peluang karier di ekosistem Web3.",
    shortDescription:
      "Pengenalan Web3 dan blockchain untuk pemula yang ingin masuk ekosistem kripto.",
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    bannerUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    organizer: {
      id: "org-008",
      name: "FutureOps Academy",
      email: "hello@futureops.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=18",
    },
    price: 0,
    isFree: true,
    totalSeats: 500,
    availableSeats: 380,
    startDate: "2026-09-05T19:00:00.000Z",
    endDate: "2026-09-05T21:00:00.000Z",
    location: {
      type: "ONLINE",
      meetingUrl: "https://zoom.us/web3-blockchain-intro",
      platform: "Zoom",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.6,
    totalReviews: 37,
    reviews: [
      {
        id: "review-018",
        eventId: "evt-016",
        userId: "user-018",
        rating: 5,
        comment: "Penjelasan blockchain dan smart contract-nya mudah dipahami meski baru pertama kali dengar.",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z",
        user: { id: "user-018", name: "Rizky" },
      },
    ],
    createdAt: "2026-04-27T11:00:00.000Z",
    updatedAt: "2026-04-29T11:00:00.000Z",
  },
  {
    id: "evt-017",
    slug: "national-hackathon-fintech-2026",
    title: "National Hackathon: Fintech Innovation 2026",
    category: {
      id: "cat-competition",
      name: "COMPETITION",
    },
    description:
      "Kompetisi hackathon nasional bertema fintech untuk mahasiswa dan profesional muda. Peserta akan membangun solusi inovatif di bidang pembayaran digital, pinjaman, atau investasi dalam waktu 24 jam.",
    shortDescription:
      "Hackathon nasional fintech 24 jam untuk mahasiswa dan profesional muda.",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    bannerUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    organizer: {
      id: "org-005",
      name: "Startup Circle ID",
      email: "community@startupcircle.id",
      profileImageUrl: "https://i.pravatar.cc/150?img=15",
    },
    price: 50000,
    isFree: false,
    totalSeats: 200,
    availableSeats: 87,
    startDate: "2026-09-19T08:00:00.000Z",
    endDate: "2026-09-20T08:00:00.000Z",
    location: {
      type: "OFFLINE",
      city: "Jakarta",
      province: "DKI Jakarta",
      country: "Indonesia",
      address: "Gedung Bursa Efek Indonesia, Jakarta Selatan",
    },
    status: "PUBLISHED",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 29,
    reviews: [
      {
        id: "review-019",
        eventId: "evt-017",
        userId: "user-019",
        rating: 5,
        comment: "Pengalaman hackathon yang seru banget, mentornya aktif bantu dan brief-nya jelas.",
        createdAt: "2026-05-01T09:00:00.000Z",
        updatedAt: "2026-05-01T09:00:00.000Z",
        user: { id: "user-019", name: "Hendra" },
      },
    ],
    createdAt: "2026-04-28T12:00:00.000Z",
    updatedAt: "2026-04-30T12:00:00.000Z",
  },
];
