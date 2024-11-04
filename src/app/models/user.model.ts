export interface User {
    id?: number;                 // Matches the Long id in the backend entity
    username: string;
    email: string;
    roles: string[];             // List of roles, e.g., ["USER", "ADMIN"]
  }
  