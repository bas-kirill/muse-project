import { Instruments } from "@domain/model/instrument";

export interface Page {
  content: Instruments;
  contentSize: number;
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
}