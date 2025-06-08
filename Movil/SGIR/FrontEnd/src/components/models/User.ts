// models/User.ts
export interface User {
    _id: string;
    numeroDocumento: string;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
  }
  
  // Datos de ejemplo para simular una base de datos
  let usersData: User[] = [
    {
      _id: '1',
      numeroDocumento: '12345678',
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@example.com',
      contrasena: 'password123'
    },
    {
      _id: '2',
      numeroDocumento: '87654321',
      nombre: 'María',
      apellido: 'Gómez',
      correo: 'maria@example.com',
      contrasena: 'securepass'
    }
  ];
  
  // Funciones CRUD simuladas
  export const getUsers = async (): Promise<User[]> => {
    return new Promise(resolve => setTimeout(() => resolve(usersData), 500));
  };
  
  export const createUser = async (user: Omit<User, '_id'>): Promise<User> => {
    return new Promise(resolve => setTimeout(() => {
      const newUser = { ...user, _id: Date.now().toString() };
      usersData = [...usersData, newUser];
      resolve(newUser);
    }, 500));
  };
  
  export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    return new Promise(resolve => setTimeout(() => {
      usersData = usersData.map(u => u._id === id ? { ...u, ...user } : u);
      const updatedUser = usersData.find(u => u._id === id)!;
      resolve(updatedUser);
    }, 500));
  };
  
  export const deleteUser = async (id: string): Promise<void> => {
    return new Promise(resolve => setTimeout(() => {
      usersData = usersData.filter(user => user._id !== id);
      resolve();
    }, 500));
  };