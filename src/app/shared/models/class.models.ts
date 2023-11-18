export interface Student {
    id: number;
    name: string;
    displayName?: string;
}
  
export interface Class {
    id: number;
    name: string;
    students: Student[];
}