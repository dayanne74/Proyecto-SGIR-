import React, { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { getUsers, deleteUser, User } from '../models/User';
import UserList from '../UserList';

// Define los tipos de las rutas
type RootStackParamList = {
  UserList: undefined;
  CreateUser: undefined;
  EditUser: { user: User };
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'UserList'>;

const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProps>();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchUsers);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await deleteUser(id);
      await fetchUsers();
      Alert.alert('Éxito', 'Usuario eliminado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el usuario');
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Agregar Usuario"
        onPress={() => navigation.navigate('CreateUser')}
      />
      
      <UserList
        users={users}
        onEdit={(user) => navigation.navigate('EditUser', { user })}
        onDelete={handleDelete}
        loading={loading}
      />
    </View>
  );
};

export default UserListScreen;
