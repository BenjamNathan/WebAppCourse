import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    photoUrl: string;
    city: string;
    country: string;
    shooterType: string;
    introduction?: string;
    equipment?: string;
    experience?: string;
    photos?: Photo[];
}
