/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : transaction.types.ts
 * Type        : Types
 * Feature     : Feature 1
 * Source Path : src/types/transaction.types.ts
 * Used In     : Customer Checkout, Transactions, Tickets
 * Status      : ACTIVE
 * Notes       : Source of truth for transaction and ticket typing
 * =========================================
 */

export type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export type PaymentMethod =
  | "MANUAL_TRANSFER"
  | "VIRTUAL_ACCOUNT"
  | "E_WALLET";

export type PaymentProofStatus =
  | "NOT_UPLOADED"
  | "UPLOADED"
  | "VERIFIED"
  | "REJECTED";

export interface TransactionEventSummary {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  organizerName: string;
  eventDate: string;
  locationType: "ONLINE" | "OFFLINE";
  meetingUrl?: string;
}

export interface TransactionDiscountSummary {
  voucherDiscount: number;
  couponDiscount: number;
  pointsUsed: number;
}

export interface TransactionPaymentSummary {
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  paymentMethod: PaymentMethod;
}

export interface Transaction {
  id: string;
  invoiceNumber: string;
  userId: string;
  event: TransactionEventSummary;

  status: TransactionStatus;
  paymentProofStatus: PaymentProofStatus;

  discount: TransactionDiscountSummary;
  payment: TransactionPaymentSummary;
  paymentProofUrl?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  transactionId: string;
  userId: string;
  event: TransactionEventSummary;
  issuedAt: string;
}

export interface TransactionListResponse {
  success: boolean;
  data: Transaction[];
  message?: string;
}

export interface TransactionDetailResponse {
  success: boolean;
  data: Transaction | null;
  message?: string;
}

export interface TicketListResponse {
  success: boolean;
  data: Ticket[];
  message?: string;
}
