import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  Dimensions
} from 'react-native';
import { getToken } from '../../../services/AuthService';

const { width } = Dimensions.get('window');

type ReservaItem = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  precio: number;
};

interface ListProps {
  endpoint: string;
  placeholder: string;
}

const ReservaList: React.FC<ListProps> = ({ endpoint, placeholder }) => {
  const [data, setData] = useState<ReservaItem[]>([]);
  const [filtered, setFiltered] = useState<ReservaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const scheme = useColorScheme();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const text = search.toLowerCase();
      setFiltered(data.filter(item => item.titulo.toLowerCase().includes(text)));
    } else {
      setFiltered(data);
    }
  }, [search, data]);

  const fetchData = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      const response = await fetch(`http://192.168.0.8:9700/api/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await response.json();
      setData(json);
      setFiltered(json);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} size={50} />;
  }

  const renderItem = ({ item }: { item: ReservaItem }) => (
    <TouchableOpacity style={[styles.card, scheme === 'dark' && styles.cardDark]}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, scheme === 'dark' && styles.textDark]}>{item.titulo}</Text>
        <Text style={[styles.desc, scheme === 'dark' && styles.textDark]} numberOfLines={2}>{item.descripcion}</Text>
        <Text style={[styles.price, scheme === 'dark' && styles.textDark]}>${item.precio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, scheme === 'dark' && styles.containerDark]}>
      <TextInput
        style={[styles.search, scheme === 'dark' && styles.searchDark]}
        placeholder={placeholder}
        placeholderTextColor={scheme === 'dark' ? '#ccc' : '#888'}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export const PaquetesScreen = () => (
  <ReservaList endpoint="paquetes" placeholder="Buscar paquetes turísticos..." />
);

export const ExcursionesScreen = () => (
  <ReservaList endpoint="excursiones" placeholder="Buscar excursiones..." />
);

export const HotelesScreen = () => (
  <ReservaList endpoint="hotels" placeholder="Buscar hoteles..." />
);

const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    alignItems: 'center'
  },
  containerDark: {
    backgroundColor: '#121212'
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  search: {
    width: cardWidth,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  searchDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333'
  },
  list: {
    paddingBottom: 20
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row'
  },
  cardDark: {
    backgroundColor: '#1e1e1e'
  },
  image: {
    width: 100,
    height: 100
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  desc: {
    fontSize: 14,
    color: '#555'
  },
  price: {
    fontSize: 16,
    fontWeight: '700'
  },
  textDark: {
    color: '#eee'
  }
});
export default ReservaList;