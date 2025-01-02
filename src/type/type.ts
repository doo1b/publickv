import { Timestamp } from "firebase/firestore";

export interface ExpenseInputType {
  amount: number;
  comment: string | undefined;
  date: Date;
  main: string;
  sub: string;
  title: string;
}

export interface ExpenseInputWithId extends ExpenseInputType {
  id: string;
}

export interface ExpenseOutputType {
  amount: number;
  comment: string | undefined;
  date: Timestamp;
  main: string;
  sub: string;
  title: string;
}
