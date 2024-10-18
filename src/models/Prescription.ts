import { Dayjs } from "dayjs";
export interface IPrescription {
  id?: string;
  therapy: string;
  medicine: number;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
}
