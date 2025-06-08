import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';  // Clave para almacenar el token

// Función para guardar el token
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
};

// Función para obtener el token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

// Función para eliminar el token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};
