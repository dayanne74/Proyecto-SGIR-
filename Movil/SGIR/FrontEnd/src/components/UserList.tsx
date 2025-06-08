// components/UserList.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../components/models/User';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando usuarios...</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No hay usuarios registrados</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
            <Text>Documento: {item.numeroDocumento}</Text>
            <Text>Email: {item.correo}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => onEdit(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]}
              onPress={() => onDelete(item._id)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
  },
});

export default UserList;