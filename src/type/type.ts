import { Timestamp } from "firebase/firestore";

export interface CardType extends CardData {
  id: string;
}

export interface CardData {
  company: string;
  name: string;
  type: string;
  total: number;
}

export interface MainCategoryData {
  name: string;
  type: string;
}

export interface SubCategoryData {
  name: string;
  type: string;
  parentId: string;
}

export interface GeneralExpenditureType {
  amount: number;
  card: string;
  comment: string | undefined;
  date: Date;
  main: string;
  sub: string;
  title: string;
}

export interface LoanExpenditureType extends GeneralExpenditureType {
  endDate: Date;
}

export type ExpenditureWithId =
  | (GeneralExpenditureType & { id: string })
  | (LoanExpenditureType & { id: string });

export interface FsGeneralExpenditureType {
  amount: number;
  card: string;
  comment: string | undefined;
  date: Timestamp;
  main: string;
  sub: string;
  title: string;
}

export interface FsLoanExpenditureType extends FsGeneralExpenditureType {
  endDate: Timestamp;
}
