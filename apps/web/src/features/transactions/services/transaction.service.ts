/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : transaction.service.ts
 * Type        : Service
 * Feature     : Feature 1
 * Source Path : src/features/transactions/services/transaction.service.ts
 * Used In     : Checkout, My Transactions, My Tickets
 * Status      : DUMMY DATA
 * Notes       : Mock transaction and ticket service before backend integration
 * =========================================
 */

import type {
  PaymentMethod,
  Ticket,
  TicketListResponse,
  Transaction,
  TransactionDetailResponse,
  TransactionListResponse,
  TransactionStatus,
} from "@/types/transaction.types";
import type { Event } from "@/types/event.types";

let dummyTransactions: Transaction[] = [
  {
    id: "trx-001",
    invoiceNumber: "INV-20260407-001",
    userId: "user-001",
    event: {
      id: "event-001",
      title: "UI/UX Design Bootcamp 2026",
      slug: "ui-ux-design-bootcamp-2026",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      organizerName: "Creative Skill Academy",
      eventDate: "2026-04-20T19:00:00.000Z",
      locationType: "ONLINE",
      meetingUrl: "https://zoom.us/j/123456789",
    },
    status: "WAITING_FOR_PAYMENT",
    paymentProofStatus: "NOT_UPLOADED",
    discount: {
      voucherDiscount: 20000,
      couponDiscount: 0,
      pointsUsed: 10000,
    },
    payment: {
      subtotal: 149000,
      totalDiscount: 30000,
      finalTotal: 119000,
      paymentMethod: "MANUAL_TRANSFER",
    },
    createdAt: "2026-04-07T10:30:00.000Z",
    updatedAt: "2026-04-07T10:30:00.000Z",
  },
  {
    id: "trx-002",
    invoiceNumber: "INV-20260405-002",
    userId: "user-001",
    event: {
      id: "event-003",
      title: "Frontend React Intensive Workshop",
      slug: "frontend-react-intensive-workshop",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      organizerName: "CodeSprint Studio",
      eventDate: "2026-05-02T08:00:00.000Z",
      locationType: "ONLINE",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
    },
    status: "WAITING_FOR_CONFIRMATION",
    paymentProofStatus: "UPLOADED",
    discount: {
      voucherDiscount: 20000,
      couponDiscount: 0,
      pointsUsed: 0,
    },
    payment: {
      subtotal: 199000,
      totalDiscount: 20000,
      finalTotal: 179000,
      paymentMethod: "MANUAL_TRANSFER",
    },
    createdAt: "2026-04-05T14:10:00.000Z",
    updatedAt: "2026-04-05T16:00:00.000Z",
  },
  {
    id: "trx-003",
    invoiceNumber: "INV-20260401-003",
    userId: "user-001",
    event: {
      id: "event-005",
      title: "Personal Finance Planning Session",
      slug: "personal-finance-planning-session",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
      organizerName: "MoneyWise Class",
      eventDate: "2026-05-10T10:00:00.000Z",
      locationType: "ONLINE",
      meetingUrl: "https://zoom.us/j/987654321",
    },
    status: "DONE",
    paymentProofStatus: "VERIFIED",
    discount: {
      voucherDiscount: 0,
      couponDiscount: 0,
      pointsUsed: 0,
    },
    payment: {
      subtotal: 59000,
      totalDiscount: 0,
      finalTotal: 59000,
      paymentMethod: "MANUAL_TRANSFER",
    },
    createdAt: "2026-04-01T08:20:00.000Z",
    updatedAt: "2026-04-01T10:00:00.000Z",
  },
  {
    id: "trx-004",
    invoiceNumber: "INV-20260329-004",
    userId: "user-001",
    event: {
      id: "event-006",
      title: "Canva Content Creation Masterclass",
      slug: "canva-content-creation-masterclass",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      organizerName: "Visual Creator Hub",
      eventDate: "2026-05-14T14:00:00.000Z",
      locationType: "ONLINE",
      meetingUrl: "https://meet.google.com/xyz-abcd-efg",
    },
    status: "REJECTED",
    paymentProofStatus: "REJECTED",
    discount: {
      voucherDiscount: 20000,
      couponDiscount: 0,
      pointsUsed: 0,
    },
    payment: {
      subtotal: 89000,
      totalDiscount: 20000,
      finalTotal: 69000,
      paymentMethod: "MANUAL_TRANSFER",
    },
    createdAt: "2026-03-29T11:45:00.000Z",
    updatedAt: "2026-03-29T14:00:00.000Z",
  },
];

function getDummyTickets(): Ticket[] {
  return dummyTransactions
    .filter((transaction) => transaction.status === "DONE")
    .map((transaction) => ({
      id: `ticket-${transaction.id}`,
      transactionId: transaction.id,
      userId: transaction.userId,
      event: transaction.event,
      issuedAt: transaction.updatedAt,
    }));
}

function createInvoiceNumber(sequence: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const suffix = String(sequence).padStart(3, "0");

  return `INV-${year}${month}${day}-${suffix}`;
}

function getNormalizedTransaction(transaction: Transaction): Transaction {
  const createdAt = new Date(transaction.createdAt).getTime();
  const now = Date.now();

  if (
    transaction.status === "WAITING_FOR_PAYMENT" &&
    now - createdAt > 2 * 60 * 60 * 1000
  ) {
    return {
      ...transaction,
      status: "EXPIRED",
      updatedAt: new Date().toISOString(),
    };
  }

  if (
    transaction.status === "WAITING_FOR_CONFIRMATION" &&
    now - createdAt > 3 * 24 * 60 * 60 * 1000
  ) {
    return {
      ...transaction,
      status: "CANCELED",
      updatedAt: new Date().toISOString(),
    };
  }

  return transaction;
}

function syncTransactionsWithRules() {
  dummyTransactions = dummyTransactions.map(getNormalizedTransaction);
}

export const transactionService = {
  getTransactions(): TransactionListResponse {
    syncTransactionsWithRules();

    return {
      success: true,
      data: dummyTransactions,
    };
  },

  getTransactionById(transactionId: string): TransactionDetailResponse {
    syncTransactionsWithRules();

    const transaction =
      dummyTransactions.find((item) => item.id === transactionId) ?? null;

    return {
      success: !!transaction,
      data: transaction,
      message: transaction ? undefined : "Transaction not found",
    };
  },

  getTransactionsByStatus(
    status: TransactionStatus
  ): TransactionListResponse {
    syncTransactionsWithRules();

    return {
      success: true,
      data: dummyTransactions.filter((item) => item.status === status),
    };
  },

  getTickets(): TicketListResponse {
    syncTransactionsWithRules();

    return {
      success: true,
      data: getDummyTickets(),
    };
  },

  createTransaction(params: {
    userId: string;
    event: Event;
    voucherDiscount: number;
    couponDiscount: number;
    pointsUsed: number;
    finalTotal: number;
    paymentMethod: PaymentMethod;
  }): Transaction {
    const {
      userId,
      event,
      voucherDiscount,
      couponDiscount,
      pointsUsed,
      finalTotal,
      paymentMethod,
    } = params;

    const now = new Date().toISOString();
    const sequence = dummyTransactions.length + 1;
    const id = `trx-${String(sequence).padStart(3, "0")}`;
    const totalDiscount = voucherDiscount + couponDiscount + pointsUsed;
    const status: TransactionStatus =
      event.isFree || finalTotal === 0 ? "DONE" : "WAITING_FOR_PAYMENT";

    const newTransaction: Transaction = {
      id,
      invoiceNumber: createInvoiceNumber(sequence),
      userId,
      event: {
        id: event.id,
        title: event.title,
        slug: event.slug,
        thumbnailUrl:
          event.thumbnailUrl ||
          event.bannerUrl ||
          event.thumbnail ||
          "",
        organizerName: event.organizer.name,
        eventDate: event.startDate,
        locationType: event.location.type,
        meetingUrl: event.location.meetingUrl,
      },
      status,
      paymentProofStatus: status === "DONE" ? "VERIFIED" : "NOT_UPLOADED",
      discount: {
        voucherDiscount,
        couponDiscount,
        pointsUsed,
      },
      payment: {
        subtotal: event.price,
        totalDiscount,
        finalTotal,
        paymentMethod,
      },
      createdAt: now,
      updatedAt: now,
    };

    dummyTransactions = [newTransaction, ...dummyTransactions];

    return newTransaction;
  },

  uploadPaymentProof(params: {
    transactionId: string;
    paymentProofUrl: string;
  }): Transaction | null {
    syncTransactionsWithRules();

    const { transactionId, paymentProofUrl } = params;
    const transactionIndex = dummyTransactions.findIndex(
      (item) => item.id === transactionId
    );

    if (transactionIndex < 0) return null;

    const transaction = dummyTransactions[transactionIndex];

    if (transaction.status !== "WAITING_FOR_PAYMENT") {
      return transaction;
    }

    const updatedTransaction: Transaction = {
      ...transaction,
      status: "WAITING_FOR_CONFIRMATION",
      paymentProofStatus: "UPLOADED",
      paymentProofUrl,
      updatedAt: new Date().toISOString(),
    };

    dummyTransactions = dummyTransactions.map((item, index) =>
      index === transactionIndex ? updatedTransaction : item
    );

    return updatedTransaction;
  },
};
