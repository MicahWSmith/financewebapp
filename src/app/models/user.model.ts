import { Profile } from "./profile.model";
export interface User{
    email: string,
    first: string,
    id: number,
    last: string,
    phone: string,
    profile: Profile,
    security_answer: string,
    security_question: string 
}