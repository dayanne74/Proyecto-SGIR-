import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUser, User } from '../models/User'; // Asegúrate de importar User
import UserForm from '../UserForm';

const CreateUserScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async (userData: Omit<User, '_id'>) => { // Aquí estaba el error: User no estaba importado
    try {
      setLoading(true);
      await createUser(userData);
      navigation.goBack();
      Alert.alert('Éxito', 'Usuario creado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el usuario');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <UserForm
        onSubmit={handleSubmit}
        buttonText={loading ? 'Creando...' : 'Crear Usuario'}
        disabled={loading}
      />
    </View>
  );
};

export default CreateUserScreen;
