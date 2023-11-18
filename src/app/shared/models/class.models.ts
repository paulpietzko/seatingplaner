export interface Student {
    id: number;
    name: string;
    shortName?: string;
    numberSuffix?: string; 
}
  
export interface Class {
    id: number;
    name: string;
    students: Student[];
}