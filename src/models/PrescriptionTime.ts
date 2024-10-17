import { Dayjs } from "dayjs";

export interface IPrescriptionTime {
    id: string;
    time: Dayjs | null;
    prescription?: string;
  }