// /login
export interface UserLogin {
  id: number;
  name: string;
  token: string;
}

// /project
export interface Project {
  created: number;
  id: number;
  name: string;
  organization: string;
  ownerId: number;
  personId: number;
}

// /users
export interface Users {
  organization: string;
  ownerId: number;
  name: string;
  id: number;
}
