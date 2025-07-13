export type Status =
  | 'Not Started'
  | 'On Hold'
  | 'Under Investigation'
  | 'Solved'
  | 'Canceled'
  | 'Unknown';
export interface Suspect {
  name: string;
  age: number;
  address: string;
}
