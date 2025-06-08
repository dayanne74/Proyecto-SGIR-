// screens/EditUserScreen.tsx
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateUser } from '../models/User';
import UserForm from '../UserForm';
import { User } from '../models/User';

const EditUserScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as { user: User };

  const handleSubmit = async (userData: Omit<User, '_id'>) => {
    try {
      setLoading(true);
      await updateUser(user._id, userData);
      navigation.goBack();
      Alert.alert('Éxito', 'Usuario actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el usuario');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        buttonText={loading ? 'Actualizando...' : 'Actualizar Usuario'}
        disabled={loading}
      />
    </View>
  );
};

export default EditUserScreen;