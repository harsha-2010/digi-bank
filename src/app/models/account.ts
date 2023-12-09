import { Users } from "./users";

// account.model.ts
export interface Account extends Users{
    id: string;
    accountNumber: string;
    accountType: string;
    availableBalance: number;
    ifscCode: string;
  }
  