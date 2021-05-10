export interface User {
  id: number;
  name: string;
  token: string;
}

export interface Project {
  created: number;
  id: number;
  name: string;
  organization: string;
  ownerId: number;
  personId: number;
}
