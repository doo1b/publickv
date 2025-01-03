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

export interface FinancialInputType {
  amount: number;
  comment: string | undefined;
  date: Date;
  main: string;
  title: string;
}

export interface FinancialInputWithId extends FinancialInputType {
  id: string;
}

export interface FinancialOutputType {
  amount: number;
  comment: string | undefined;
  date: Timestamp;
  main: string;
  title: string;
}
