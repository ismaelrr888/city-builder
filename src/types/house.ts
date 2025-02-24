export interface House {
  id: string;
  name: string;
  floors: Floor[];
  color: string;
}

export interface Floor {
  color: string;
}
