export interface PollOption {
  label: string;
  _id: string;
  votes: number;
}

export interface Poll {
  title: string;
  options: PollOption[];
  votes: string[]; // Assuming votes contain user IDs
  owner: string; // Owner's user ID
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number; // Version key
}
