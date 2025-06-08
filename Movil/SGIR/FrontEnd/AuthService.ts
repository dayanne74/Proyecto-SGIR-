import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el token en AsyncStorage
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error al guardar el token', error);
  }
};

// Obtener el token de AsyncStorage
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error al obtener el token', error);
    return null;
  }
};

// Eliminar el token de AsyncStorage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error al eliminar el token', error);
  }
};
