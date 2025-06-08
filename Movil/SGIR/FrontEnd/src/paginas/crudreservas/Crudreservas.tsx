import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa desde @react-native-picker/picker
import axios from 'axios';

interface Reserva {
  _id: string;
  servicio: string;
  destino: string;
  hotel: string;
  comida: string;
  numeroPersonas: number;
  precioTotal: number;
}

const crudreservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [servicio, setServicio] = useState<string>('');
  const [destino, setDestino] = useState<string>('');
  const [hotel, setHotel] = useState<string>('');
  const [comida, setComida] = useState<string>('');
  const [numeroPersonas, setNumeroPersonas] = useState<string>('1');
  const [precioTotal, setPrecioTotal] = useState<string>('0');
  const [reservaEdit, setReservaEdit] = useState<Reserva | null>(null); // Para editar una reserva

  // Función para obtener las reservas
  const obtenerReservas = async () => {
    try {
      // Se especifica que la respuesta de axios es de tipo Reserva[]
      const response = await axios.get<Reserva[]>('http://192.168.0.8:9700/api/reservas');
      setReservas(response.data); // Ahora TypeScript sabe que response.data es un array de Reserva
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  // Calcular el precio total
  const calculateTotal = () => {
    let people = parseInt(numeroPersonas) || 1;
    let hotelPrice = hotel ? (parseFloat(hotel) || 0) * people : 0;
    let comidaPrice = comida ? (parseFloat(comida) || 0) * people : 0;
    let destinoPrice = destino ? (parseFloat(destino) || 0) * people : 0;
    setPrecioTotal(String(hotelPrice + comidaPrice + destinoPrice));
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  useEffect(() => {
    if (reservaEdit) {
      setServicio(reservaEdit.servicio);
      setDestino(reservaEdit.destino);
      setHotel(reservaEdit.hotel);
      setComida(reservaEdit.comida);
      setNumeroPersonas(String(reservaEdit.numeroPersonas));
      setPrecioTotal(String(reservaEdit.precioTotal));
    }
  }, [reservaEdit]);

  // Función para agregar o actualizar una reserva
  const agregarOActualizarReserva = async () => {
    const nuevaReserva = {
      servicio,
      destino,
      hotel,
      comida,
      numeroPersonas: parseInt(numeroPersonas),
      precioTotal: parseFloat(precioTotal),
    };

    try {
      if (reservaEdit) {
        await axios.put(`http://192.168.0.8:9700/api/reservas/${reservaEdit._id}`, nuevaReserva);
        setReservaEdit(null);  // Limpiar la edición
      } else {
        await axios.post('http://192.168.0.8:9700/api/reservas', nuevaReserva);
      }
      obtenerReservas();  // Recargar las reservas después de agregar o actualizar
    } catch (error) {
      console.error('Error al agregar/actualizar la reserva:', error);
    }
  };

  // Función para eliminar una reserva
  const eliminarReserva = async (id: string) => {
    try {
      await axios.delete(`http://192.168.0.8:9700/api/reservas/${id}`);
      obtenerReservas();  // Recargar las reservas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  // Renderizado del formulario y lista de reservas
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas CRUD</Text>

      <TextInput
        style={styles.input}
        placeholder="Servicio (hotel, excursion, paquete)"
        value={servicio}
        onChangeText={setServicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
      />
      <TextInput
        style={styles.input}
        placeholder="Hotel"
        value={hotel}
        onChangeText={setHotel}
      />
      <TextInput
        style={styles.input}
        placeholder="Comida"
        value={comida}
        onChangeText={setComida}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de personas"
        value={numeroPersonas}
        onChangeText={setNumeroPersonas}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Precio Total: {precioTotal}</Text>

      <Button title={reservaEdit ? 'Actualizar Reserva' : 'Agregar Reserva'} onPress={agregarOActualizarReserva} />

      <FlatList
        data={reservas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{`Servicio: ${item.servicio}`}</Text>
            <Text>{`Destino: ${item.destino}`}</Text>
            <Text>{`Hotel: ${item.hotel}`}</Text>
            <Text>{`Comida: ${item.comida}`}</Text>
            <Text>{`Número de personas: ${item.numeroPersonas}`}</Text>
            <Text>{`Precio Total: ${item.precioTotal}`}</Text>

            <TouchableOpacity onPress={() => setReservaEdit(item)} style={styles.editButton}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarReserva(item._id)} style={styles.deleteButton}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default crudreservas;
