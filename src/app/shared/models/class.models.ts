export interface Student {
  id: number;
  name: string;
  shortName?: string;
  numberSuffix?: string;
}

export interface Class {
  id: string;
  name: string;
  studentsCount: number;
  creationDate: Date;
  students: Student[];
}