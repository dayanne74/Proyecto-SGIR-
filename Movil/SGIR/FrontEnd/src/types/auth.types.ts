export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }