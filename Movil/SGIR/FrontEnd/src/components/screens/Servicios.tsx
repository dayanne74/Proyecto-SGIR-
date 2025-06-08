import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface ServiceProps {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: any;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}
const openLink = (url: string) => {
    Linking.openURL(url);
  };
const services: ServiceProps[] = [
  {
    id: 1,
    title: 'Hoteles',
    shortDescription: 'Alojamientos únicos en destinos mágicos',
    description:
      'Descubre una cuidadosa selección de alojamientos que destacan por su excelencia, ubicación privilegiada y servicio personalizado en los destinos más encantadores de Colombia.',
    icon: 'bed',
    image: require('../../../assets/Hotel.jpg'),
    features: [
      {
        title: 'Hoteles Boutique',
        description:
          'Alojamientos con carácter único, diseño exquisito y atención personalizada en ubicaciones privilegiadas.',
        icon: 'star',
      },
      {
        title: 'Eco-Hoteles',
        description:
          'Hospedajes sostenibles inmersos en la naturaleza que ofrecen experiencias auténticas y responsables.',
        icon: 'leaf',
      },
      {
        title: 'Resorts de Lujo',
        description:
          'Complejos exclusivos con todas las comodidades y servicios para unas vacaciones perfectas.',
        icon: 'diamond',
      },
      {
        title: 'Haciendas Históricas',
        description:
          'Propiedades coloniales restauradas que preservan la arquitectura y tradiciones colombianas.',
        icon: 'home',
      },
    ],
  },
  {
    id: 2,
    title: 'Excursiones',
    shortDescription: 'Aventuras guiadas por paisajes extraordinarios',
    description:
      'Embárcate en experiencias únicas con nuestras excursiones guiadas por los paisajes más espectaculares y sitios culturales imperdibles de Colombia.',
    icon: 'compass',
    image: require('../../../assets/excuriso.png'),
    features: [
      {
        title: 'Tours de Naturaleza',
        description:
          'Excursiones a parques nacionales, reservas naturales y paisajes de ensueño con guías expertos.',
        icon: 'leaf',
      },
      {
        title: 'Aventuras Extremas',
        description:
          'Experiencias de adrenalina como rafting, parapente, buceo y trekking para los más aventureros.',
        icon: 'trending-up',
      },
      {
        title: 'Recorridos Culturales',
        description:
          'Visitas guiadas a ciudades históricas, pueblos tradicionales y comunidades indígenas.',
        icon: 'color-palette',
      },
      {
        title: 'Tours Fotográficos',
        description:
          'Excursiones diseñadas para capturar los escenarios más fotogénicos de Colombia.',
        icon: 'camera',
      },
    ],
  },
  {
    id: 3,
    title: 'Paquetes',
    shortDescription: 'Experiencias completas diseñadas para ti',
    description:
      'Disfruta de itinerarios completos cuidadosamente planificados que combinan lo mejor de Colombia en experiencias inolvidables adaptadas a tus preferencias.',
    icon: 'gift',
    image: require('../../../assets/paquete.jpg'),
    features: [
      {
        title: 'Escapadas de Fin de Semana',
        description:
          'Paquetes cortos pero intensos para desconectar y disfrutar de destinos cercanos.',
        icon: 'calendar',
      },
      {
        title: 'Circuitos Regionales',
        description:
          'Recorridos de 5-7 días explorando a fondo una región específica de Colombia.',
        icon: 'map',
      },
      {
        title: 'Gran Tour Colombia',
        description:
          'Itinerarios completos de 10-15 días para descubrir lo mejor del país en un solo viaje.',
        icon: 'globe',
      },
      {
        title: 'Experiencias Temáticas',
        description:
          'Paquetes enfocados en intereses específicos como café, literatura, historia o fotografía.',
        icon: 'bookmarks',
      },
    ],
  },
  {
    id: 4,
    title: 'Gastronomía',
    shortDescription: 'Sabores auténticos de la cocina colombiana',
    description:
      'Sumérgete en un viaje sensorial a través de los sabores, aromas y tradiciones culinarias que hacen de Colombia un destino gastronómico por descubrir.',
    icon: 'restaurant',
    image: require('../../../assets/Gastronomia-Colombiana.jpg'),
    features: [
      {
        title: 'Tours Gastronómicos',
        description:
          'Recorridos por mercados locales, zonas gastronómicas y restaurantes emblemáticos con degustaciones.',
        icon: 'restaurant',
      },
      {
        title: 'Clases de Cocina',
        description:
          'Aprende a preparar platos tradicionales colombianos con chefs locales expertos.',
        icon: 'cafe',
      },
      {
        title: 'Catas y Degustaciones',
        description:
          'Experiencias especializadas de café, chocolate, frutas exóticas y destilados colombianos.',
        icon: 'wine',
      },
      {
        title: 'Cenas Experienciales',
        description:
          'Eventos gastronómicos únicos en locaciones especiales con menús de autor.',
        icon: 'moon',
      },
    ],
  },
  {
    id: 5,
    title: 'Actividades',
    shortDescription: 'Experiencias únicas que enriquecen tu viaje',
    description:
      'Complementa tu visita con actividades seleccionadas que te permitirán conectar profundamente con la cultura, naturaleza y tradiciones colombianas.',
    icon: 'bicycle',
    image: require('../../../assets/actividad.jpg'),
    features: [
      {
        title: 'Talleres Artesanales',
        description:
          'Aprende técnicas ancestrales y crea tus propias artesanías con maestros locales.',
        icon: 'brush',
      },
      {
        title: 'Experiencias Musicales',
        description:
          'Clases de baile, conciertos privados y eventos que te conectan con la rica tradición musical.',
        icon: 'musical-notes',
      },
      {
        title: 'Bienestar y Naturaleza',
        description:
          'Sesiones de yoga, meditación y terapias holísticas en entornos naturales privilegiados.',
        icon: 'fitness',
      },
      {
        title: 'Voluntariado',
        description:
          'Oportunidades para contribuir en proyectos de conservación y desarrollo comunitario.',
        icon: 'heart',
      },
    ],
  },
];

const ServiceCard = ({ item, onPress }: { item: ServiceProps; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
      <ImageBackground source={item.image} style={styles.serviceCardImage}>
        <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.serviceCardGradient}>
          <View style={styles.serviceCardIconContainer}>
            <Ionicons name={item.icon as any} size={28} color="#ffffff" />
          </View>
          <View style={styles.serviceCardContent}>
            <Text style={styles.serviceCardTitle}>{item.title}</Text>
            <Text style={styles.serviceCardDescription}>{item.shortDescription}</Text>
            <View style={styles.serviceCardButton}>
              <Text style={styles.serviceCardButtonText}>Descubrir</Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ServiceDetail = ({ service, onBack }: { service: ServiceProps; onBack: () => void }) => {
  return (
    <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
      <ImageBackground source={service.image} style={styles.detailHeroImage}>
        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.detailHeroGradient}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.detailHeroContent}>
            <View style={styles.detailIconContainer}>
              <Ionicons name={service.icon as any} size={32} color="#ffffff" />
            </View>
            <Text style={styles.detailTitle}>{service.title}</Text>
            <Text style={styles.detailDescription}>{service.description}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.detailContent}>
        <Text style={styles.featuresTitle}>Lo que ofrecemos</Text>
        {service.features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name={feature.icon as any} size={24} color="#3a7ca5" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
        <View style={styles.loginPrompt}>
          <MaterialIcons name="lock-outline" size={40} color="#d9a566" style={styles.lockIcon} />
          <Text style={styles.loginTitle}>¿Quieres ver más detalles?</Text>
          <Text style={styles.loginDescription}>
            Inicia sesión para acceder a precios, disponibilidad, reseñas y beneficios exclusivos.
          </Text>
          <TouchableOpacity style={styles.loginButton} >
            <Text style={styles.loginButtonText}>Iniciar Sesión / Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = React.useState<ServiceProps | null>(null);

  if (selectedService) {
    return <ServiceDetail service={selectedService} onBack={() => setSelectedService(null)} />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/imagen.jpg')} style={styles.banner} resizeMode="cover">
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Explora Colombia</Text>
          <Text style={styles.bannerSubtitle}>Descubre los mejores destinos, hoteles y aventuras</Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuestros Servicios</Text>
        <Text style={styles.headerSubtitle}>
          Descubre todo lo que podemos ofrecerte para una experiencia inolvidable en Colombia
        </Text>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {services.map((item) => (
          <ServiceCard key={item.id} item={item} onPress={() => setSelectedService(item)} />
        ))}
        <View style={styles.ctaContainer}>
              <LinearGradient
                colors={['#EB7C46', '#EB492A']}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaTitle}>¿Listo para vivir la magia de Colombia?</Text>
                <Text style={styles.ctaText}>
                  Contáctanos hoy mismo y comienza a planear la aventura de tu vida con expertos locales.
                </Text>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => openLink('tel:+57 310 8037969')}
                >
                  <Text style={styles.ctaButtonText}>¡Contáctanos Ahora!</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  banner: {
    width: '100%',
    height: 260,
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  serviceCard: {
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceCardImage: {
    width: '100%',
    height: '100%',
  },
  serviceCardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  serviceCardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(218, 165, 32, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCardContent: {
    marginTop: 10,
  },
  serviceCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  serviceCardDescription: {
    fontSize: 12,
    color: '#ddd',
    marginVertical: 6,
  },
  serviceCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceCardButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  bottomTitle: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#d9a566',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  detailHeroImage: {
    width: '100%',
    height: 280,
  },
  detailHeroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  detailHeroContent: {
    alignItems: 'center',
  },
  detailIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(218, 165, 32, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailDescription: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
  },
  detailContent: {
    padding: 20,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  loginPrompt: {
    marginTop: 30,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockIcon: {
    marginBottom: 15,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: '#d9a566',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  ctaContainer: {
    padding: 20,
  },
  ctaGradient: {
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Services;
