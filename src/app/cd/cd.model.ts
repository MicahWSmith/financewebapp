import { Elcd } from "./elcd.model";

export interface Cd {
    minimumOpeningDeposit?: number,
    term?: number,
    interestRate?: number,
    elcdId?: number,
    id?: number,
    elcd?: Elcd,
}