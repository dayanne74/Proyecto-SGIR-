import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  Linking,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Modal,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

// Desestructuramos width y height del dispositivo para su uso en el componente
const { width, height } = Dimensions.get('window');
type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  Principal: undefined;
  ReservationForm: undefined;
  Contacto: undefined;
  SobreNosotros: undefined;
  Servicios: undefined;
  Reseñas: undefined;
  Privacidad: undefined;
  Terminos: undefined;
}
type Props = NativeStackScreenProps<RootStackParamList, "Principal">;
// Interfaces para el tipado de los datos
interface SliderDataItem {
  id: string;
  image: any;
  title: string;
  description: string;
  color: readonly [string, string, string];
  
}

interface Destination {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: any;
  description: string;
  highlights: string[];
  bestTime: string;
}

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  color: readonly [string, string, string];
  description: string;
  includes: string[];
  duration: string;
}

interface Service {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

type ModalItem = Destination | Experience | Service;

// Datos para el slider (se asume que tienes las imágenes en los assets)
const sliderData: SliderDataItem[] = [
  {
    id: '1',
    image: require('../../../assets/colombia.jpg'),
    title: 'Cartagena',
    description: 'Ciudad histórica con encanto colonial y playas de ensueño',
    color: ['#1a2a6c', '#b21f1f', '#fdbb2d'] as const,
    
  },
  {
    id: '2',
    image: require('../../../assets/Medellin.jpg'),
    title: 'Medellín',
    description: 'Innovación urbana rodeada de naturaleza exuberante',
    color: ['#16222A', '#3A6073', '#16222A'] as const,
    
  },
  {
    id: '3',
    image: require('../../../assets/ParqueTayrona.jpg'),
    title: 'Parque Tayrona',
    description: 'Paraíso natural donde la selva se encuentra con el mar Caribe',
    color: ['#134E5E', '#71B280', '#134E5E'] as const,
    
  },
];
const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn("No se puede abrir esta URL:", url);
  }
};

// Datos para destinos
const destinations: Destination[] = [
  {
    id: '1',
    name: 'Caño Cristales',
    location: 'La Macarena, Meta',
    rating: 4.9,
    image: require('../../../assets/canocrstales.jpg'),
    description:
      'Conocido como el "Río de los Cinco Colores", este espectáculo natural único presenta tonalidades impresionantes gracias a una planta acuática endémica.',
    highlights: ['Río Multicolor', 'Pozos Naturales', 'Flora Endémica', 'Senderismo'],
    bestTime: 'Julio a Noviembre',
  },
  {
    id: '2',
    name: 'Valle del Cocora',
    location: 'Salento, Quindío',
    rating: 4.8,
    image: require('../../../assets/vallecocora.jpg'),
    description:
      'Hogar de la palma de cera del Quindío, el árbol nacional de Colombia que puede alcanzar los 60 metros de altura. Paisajes de ensueño con montañas y neblina.',
    highlights: ['Palma de Cera', 'Senderismo', 'Avistamiento de Colibríes', 'Cabalgatas'],
    bestTime: 'Diciembre a Marzo',
  },
  {
    id: '3',
    name: 'Ciudad Perdida',
    location: 'Sierra Nevada, Santa Marta',
    rating: 4.9,
    image: require('../../../assets/ciudadperdida.jpg'),
    description:
      'Descubierta en 1972, esta antigua ciudad precolombina de la cultura Tayrona data del siglo VII. Trek de varios días por selva tropical y comunidades indígenas.',
    highlights: ['Ruinas Precolombinas', 'Trekking', 'Cultura Indígena', 'Naturaleza Virgen'],
    bestTime: 'Diciembre a Marzo',
  },
  {
    id: '4',
    name: 'Guatapé',
    location: 'Antioquia',
    rating: 4.7,
    image: require('../../../assets/guatape.jpg'),
    description:
      'Pueblo colorido famoso por sus zócalos decorativos y el Peñol, un monolito de 220 metros de altura. Subir sus 740 escalones ofrece vistas panorámicas inolvidables.',
    highlights: ['Peñol', 'Zócalos Artísticos', 'Embalse', 'Arquitectura Colorida'],
    bestTime: 'Todo el año',
  },
];

// Datos para experiencias
const experiences: Experience[] = [
  {
    id: '1',
    title: 'Aventura en la Selva',
    subtitle: 'AMAZONAS',
    image: require('../../../assets/AventuraAmazonas.jpg'),
    color: ['#0F2027', '#203A43', '#2C5364'] as const,
    description:
      'Sumérgete en el pulmón del mundo con nuestra expedición de 5 días por el Amazonas colombiano. Navega, explora y contacta la biodiversidad del planeta.',
    includes: [
      'Alojamiento en lodges ecológicos',
      'Guías nativos bilingües',
      'Excursiones nocturnas',
      'Gastronomía amazónica',
      'Avistamiento de delfines rosados',
    ],
    duration: '5 días / 4 noches',
  },
  {
    id: '2',
    title: 'Ruta del Café',
    subtitle: 'EJE CAFETERO',
    image: require('../../../assets/eje_cafetero.jpg'),
    color: ['#3E5151', '#DECBA4', '#3E5151'] as const,
    description:
      'Recorre el Eje Cafetero en un viaje sensorial por las mejores haciendas productoras de café premium y catas profesionales.',
    includes: [
      'Tour por fincas cafeteras',
      'Cata profesional de café',
      'Alojamiento en haciendas tradicionales',
      'Experiencia de barismo',
      'Gastronomía regional',
    ],
    duration: '4 días / 3 noches',
  },
  {
    id: '3',
    title: 'Carnaval de Barranquilla',
    subtitle: 'ATLÁNTICO',
    image: require('../../../assets/carnavaldebarranquilla.jpeg'),
    color: ['#FF416C', '#FF4B2B', '#FF416C'] as const,
    description:
      'Vive la fiesta cultural más importante de Colombia. Acceso VIP a eventos del Carnaval, alojamiento premium y transporte privado incluido.',
    includes: [
      'Entradas VIP',
      'Alojamiento 5 estrellas',
      'Traslados privados',
      'Talleres de baile',
      'Cenas temáticas',
    ],
    duration: '6 días / 5 noches',
  },
];

// Datos para servicios
const services: Service[] = [
  {
    id: '1',
    title: 'Tour Personalizado',
    icon: 'compass-outline',
    color: '#1E88E5',
    description:
      'Diseñamos experiencias exclusivas adaptadas a tus preferencias, tiempo y presupuesto. Itinerarios a medida para maximizar tu experiencia.',
  },
  {
    id: '2',
    title: 'Hospedaje ',
    icon: 'bed-outline',
    color: '#1E88E5',
    description:
      'Colaboramos con los mejores hoteles boutique, eco-lodges de lujo y propiedades exclusivas en cada destino, garantizando confort y autenticidad.',
  },
  {
    id: '3',
    title: 'Transporte',
    icon: 'car-sport-outline',
    color: '#1E88E5',
    description:
      'Flota privada de vehículos de alta gama con conductores profesionales bilingües que conocen perfectamente las rutas, garantizando seguridad y puntualidad.',
  },
  {
    id: '4',
    title: 'Gastronomía ',
    icon: 'restaurant-outline',
    color: '#1E88E5',
    description:
      'Reservas en los mejores restaurantes y experiencias culinarias privadas para descubrir la rica gastronomía colombiana.',
  },
];
const Principal: React.FC<Props> = ({ navigation }) => {
  const openWhatsApp = () => {
    Linking.openURL('https://wa.link/gfh11y').catch(err => console.error('Error abriendo WhatsApp:', err));
  };
  
  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/caminantesporcolombia').catch(err => console.error('Error abriendo Facebook:', err));
  };
  
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/caminantesporcolombia').catch(err => console.error('Error abriendo Instagram:', err));
  };
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [modalType, setModalType] = useState<string>('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<ScrollView>(null);
  const menuAnimation = useRef(new Animated.Value(-width)).current;

  // Auto scroll del slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < sliderData.length - 1) {
        const nextSlide = currentSlide + 1;
        setCurrentSlide(nextSlide);
        slideRef.current?.scrollTo({ x: width * nextSlide, animated: true });
      } else {
        setCurrentSlide(0);
        slideRef.current?.scrollTo({ x: 0, animated: true });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const openModal = (item: ModalItem, type: string) => {
    setSelectedItem(item);
    setModalType(type);
    setModalVisible(true);
  };

  // Renderizado del contenido del modal según el tipo
  const renderModalContent = () => {
    if (!selectedItem) return null;

    if (modalType === 'destination') {
      const dest = selectedItem as Destination;
      return (
        <ScrollView style={styles.modalScroll}>
          <Image source={dest.image} style={styles.modalImage} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{dest.name}</Text>
                <View style={styles.locationContainer}>
                  <Icon name="location-outline" size={16} color="#1E88E5" />
                  <Text style={styles.locationText}>{dest.location}</Text>
                </View>
              </View>
              <View style={styles.ratingBadge}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{dest.rating}</Text>
              </View>
            </View>
            <Text style={styles.modalDescription}>{dest.description}</Text>
            <Text style={styles.sectionTitle}>Lo más destacado</Text>
            <View style={styles.highlightsContainer}>
              {dest.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightBadge}>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.sectionTitle}>Mejor época para visitar</Text>
            <View style={styles.bestTimeContainer}>
              <Icon name="calendar-outline" size={20} color="#1E88E5" />
              <Text style={styles.bestTimeText}>{dest.bestTime}</Text>
            </View>
            
          </View>
        </ScrollView>
      );
    } else if (modalType === 'experience') {
      const exp = selectedItem as Experience;
      return (
        <ScrollView style={styles.modalScroll}>
          <Image source={exp.image} style={styles.modalImage} />
          <LinearGradient colors={exp.color} style={styles.experienceGradientBadge}>
            <Text style={styles.experienceSubtitle}>{exp.subtitle}</Text>
          </LinearGradient>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{exp.title}</Text>
            <View style={styles.durationContainer}>
              <Icon name="time-outline" size={18} color="#1E88E5" />
              <Text style={styles.durationText}>{exp.duration}</Text>
            </View>
            <Text style={styles.modalDescription}>{exp.description}</Text>
            <Text style={styles.sectionTitle}>Incluye</Text>
            <View style={styles.includesContainer}>
              {exp.includes.map((item, index) => (
                <View key={index} style={styles.includeItem}>
                  <Icon name="checkmark-circle-outline" size={18} color="#1E88E5" />
                  <Text style={styles.includeText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.reserveButton} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.reserveButtonText}>Consultar Disponibilidad</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if (modalType === 'service') {
      const serv = selectedItem as Service;
      return (
        <View style={styles.serviceModalContent}>
          <View style={[styles.serviceIconModal, { backgroundColor: serv.color }]}>
            <Icon name={serv.icon} size={40} color="#fff" />
          </View>
          <Text style={styles.serviceModalTitle}>{serv.title}</Text>
          <Text style={styles.serviceModalDescription}>{serv.description}</Text>
          <View style={styles.serviceFeatures}>
            <Text style={styles.serviceFeaturesTitle}>Características</Text>
            <View style={styles.serviceFeatureItem}>
              <Icon name="checkmark-circle" size={18} color="#1E88E5" />
              <Text style={styles.serviceFeatureText}>Atención personalizada 24/7</Text>
            </View>
            <View style={styles.serviceFeatureItem}>
              <Icon name="checkmark-circle" size={18} color="#1E88E5" />
              <Text style={styles.serviceFeatureText}>Equipo multilingüe especializado</Text>
            </View>
            <View style={styles.serviceFeatureItem}>
              <Icon name="checkmark-circle" size={18} color="#1E88E5" />
              <Text style={styles.serviceFeatureText}>Flexible para ajustes de último momento</Text>
            </View>
            <View style={styles.serviceFeatureItem}>
              <Icon name="checkmark-circle" size={18} color="#1E88E5" />
              <Text style={styles.serviceFeatureText}>Servicio premium garantizado</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reserveButton} onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.reserveButtonText}>Solicitar Información</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
          <Icon name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row',paddingTop:90 }}>
        <Image source={require('../../assets/logo.png')}style={{ width: 45, height: 100, marginLeft: 'auto', paddingTop:70 }}  resizeMode="contain" />
        </View>
        
      
      </View>

      {/* Menú Lateral */}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnimation }] }]}>
        <LinearGradient colors={['#0D47A1', '#1976D2', '#2196F3']} style={styles.menuGradient}>
          <View style={styles.menuHeader}>
            <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
              <Icon name="close-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.menuProfile}>
            <View style={styles.profileImage}>
            <Image source={require('../../assets/logo.png')} style={styles.logo1} resizeMode="contain" />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Principal")}>
              <Icon name="home-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Inicio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Reseñas")}>
              <Icon name="map-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Experiencias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("SobreNosotros")}>
              <Icon name="information-circle-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Sobre Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Servicios")}>
              <Icon name="briefcase-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Contacto")}>
              <Icon name="call-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Contacto</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuFooter}>
            <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}  onPress={() => openLink('https://www.facebook.com/profile.php?id=100049091809294')}>
        <Feather name="facebook" size={18} color="#f1f5f9" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialIcon}
        onPress={() => openLink('https://api.whatsapp.com/send?phone=573108037969')}
      >
        <Ionicons name="logo-whatsapp" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialIcon} onPress={() => openLink('https://www.instagram.com/caminantespor_colombia/')}>
        <Feather name="instagram" size={18} color="#f1f5f9" />
      </TouchableOpacity>
            </View>
            <Text style={styles.menuCopyright}>© 2025 Caminantes Por Colombia</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Contenido Principal */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContent}>
        {/* Hero Slider */}
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={slideRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentSlide(index);
            }}>
            {sliderData.map((item) => (
              <View key={item.id} style={styles.slideItem}>
                <ImageBackground source={item.image} style={styles.slideImage}>
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.slideGradient}>
                    
                    <Animatable.View animation="fadeInUp" delay={300} style={styles.slideContent}>
                      <Text style={styles.slideTitle}>{item.title}</Text>
                      <Text style={styles.slideDescription}>{item.description}</Text>
                      <TouchableOpacity style={styles.slideButton} onPress={() => navigation.navigate("LoginScreen")}>
                        <Text style={styles.slideButtonText}>Explorar</Text>
                        <Icon name="arrow-forward" size={18} color="#fff" />
                      </TouchableOpacity>
                    </Animatable.View>
                  </LinearGradient>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
          {/* Indicadores del Slider */}
          <View style={styles.sliderIndicators}>
            {sliderData.map((_, index) => {
              const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
              // Renombramos la variable para evitar colisión con la constante global width
              const indicatorWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 20, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={index.toString()}
                  style={[
                    styles.indicator,
                    {
                      opacity,
                      transform: [{ scale }],
                      width: indicatorWidth,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Sobre Nosotros */}
        <View style={styles.aboutContainer}>
          <Animatable.View animation="fadeInUp" delay={300}>
            <Text style={styles.sectionTitleLarge}>Sobre Nosotros</Text>
            <View style={styles.aboutCard}>
              <View style={styles.aboutImageContainer}>
                <Image source={require('../../../assets/nosotros.jpg')} style={styles.aboutImage} />
                <View style={styles.yearsContainer}>
                  <Text style={styles.yearsNumber}>12</Text>
                  <Text style={styles.yearsText}>Años de Experiencia</Text>
                </View>
              </View>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutTitle}>Caminantes Por Colombia</Text>
                <Text style={styles.aboutDescription}>
                Caminantes por Colombia es una agencia de turismo que ofrece experiencias extraordinarias a través de caminatas escolares, excursiones, campamentos y deportes extremos. Se especializan en la creación de momentos memorables y emocionantes, diseñando programas que combinan aventura, educación y diversión para personas de todas las edades.
                </Text>
                
                <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate("SobreNosotros")}>
                  <Text style={styles.aboutButtonText}>Conocer Más</Text>
                  <Icon name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </View>

        {/* Destinos Populares */}
        <View style={styles.destinationsContainer}>
          <Text style={styles.sectionTitleLarge}>Destinos Populares</Text>
          <Text style={styles.sectionSubtitle}>Explora los lugares más impresionantes de Colombia</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destinationsScroll}>
            {destinations.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.destinationCard}
                activeOpacity={0.9}
                onPress={() => openModal(item, 'destination')}>
                <Image source={item.image} style={styles.destinationImage} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.destinationGradient}>
                  <View style={styles.destinationContent}>
                    <Text style={styles.destinationName}>{item.name}</Text>
                    <View style={styles.destinationMeta}>
                      <View style={styles.destinationLocation}>
                        <Icon name="location-outline" size={14} color="#fff" />
                        <Text style={styles.locationName}>{item.location}</Text>
                      </View>
                      <View style={styles.destinationRating}>
                        <Icon name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingScore}>{item.rating}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Experiencias Únicas */}
        <View style={styles.experiencesContainer}>
          <Text style={styles.sectionTitleLarge}>Experiencias Únicas</Text>
          <Text style={styles.sectionSubtitle}>Vive momentos inolvidables en Colombia</Text>
          {experiences.map((item, index) => (
            <Animatable.View key={item.id} animation="fadeInUp" delay={index * 100}>
              <TouchableOpacity style={styles.experienceCard} activeOpacity={0.9} onPress={() => openModal(item, 'experience')}>
                <Image source={item.image} style={styles.experienceImage} />
                <LinearGradient colors={item.color} style={styles.experienceGradient}>
                  <View style={styles.experienceContent}>
                    <Text style={styles.experienceSubtitleCard}>{item.subtitle}</Text>
                    <Text style={styles.experienceTitle}>{item.title}</Text>
                    <View style={styles.exploreLinkContainer}>
                      <Text style={styles.exploreLinkText}>Ver Detalles</Text>
                      <Icon name="arrow-forward" size={16} color="#fff" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>

        {/* Nuestros Servicios */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitleLarge}>Nuestros Servicios</Text>
          <Text style={styles.sectionSubtitle}>Experiencias de alta calidad garantizadas</Text>
          <View style={styles.servicesGrid}>
            {services.map((item) => (
              <TouchableOpacity key={item.id} style={styles.serviceCard} activeOpacity={0.9} onPress={() => openModal(item, 'service')}>
                <View style={styles.serviceIconContainer}>
                  <Icon name={item.icon} size={28} color="#fff" />
                </View>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <View style={styles.serviceLinkContainer}>
                  <Icon name="arrow-forward-circle" size={24} color="#1E88E5" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Llamada a la acción */}
          <View style={styles.ctaContainer}>
      <LinearGradient colors={['#0D47A1', '#1976D2', '#2196F3']} style={styles.ctaGradient}>
        <View style={styles.ctaContent}>
          <Text style={styles.ctaTitle}>¿Listo para tu aventura?</Text>
          <Text style={styles.ctaDescription}>
            Contacta con nuestros asesores para diseñar tu experiencia perfecta en Colombia
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={openWhatsApp}>
            <Text style={styles.ctaButtonText}>Planea Tu Viaje</Text>
            <Icon name="paper-plane-outline" size={18} color="#0D47A1" />
          </TouchableOpacity>
        </View>
        <Image source={require('../../../assets/colombia.jpg')} style={styles.ctaImage} resizeMode="contain" />
      </LinearGradient>
    </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
  <LinearGradient
    colors={['#3a6dba', '#0D47A1']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.footerGradient}>
    
    {/* Logo y Slogan */}
    <View style={styles.footerBranding}>
      <Image 
        source={require('../../assets/logo.png')} 
        style={styles.footerLogo} 
        resizeMode="contain"
      />
      <Text style={styles.footerTagline}>Transformando ideas en realidad</Text>
    </View>
    
    {/* Separador con degradado */}
    <View style={styles.footerSeparator}>
      <LinearGradient
        colors={['transparent', '#64748b', 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.separatorGradient}
      />
    </View>
    
    {/* Menú de enlaces */}
    <View style={styles.footerNavigation}>
      <TouchableOpacity style={styles.footerNavItem}>
        <Feather name="home" size={16} color="#94a3b8" style={styles.footerNavIcon} />
        <Text style={styles.footerNavText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerNavItem}>
        <Feather name="users" size={16} color="#94a3b8" style={styles.footerNavIcon} />
        <Text style={styles.footerNavText}>Nosotros</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerNavItem}>
        <Feather name="briefcase" size={16} color="#94a3b8" style={styles.footerNavIcon} />
        <Text style={styles.footerNavText}>Servicios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerNavItem}>
        <Feather name="mail" size={16} color="#94a3b8" style={styles.footerNavIcon} />
        <Text style={styles.footerNavText}>Contacto</Text>
      </TouchableOpacity>
    </View>
    
    {/* Redes sociales */}
    <View style={styles.footerSocial}>
      <TouchableOpacity style={styles.socialButton}  onPress={() => openLink('https://www.facebook.com/profile.php?id=100049091809294')}>
        <Feather name="facebook" size={18} color="#f1f5f9" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => openLink('https://api.whatsapp.com/send?phone=573108037969')}
      >
        <Ionicons name="logo-whatsapp" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://www.instagram.com/caminantespor_colombia/')}>
        <Feather name="instagram" size={18} color="#f1f5f9" />
      </TouchableOpacity>
      
    </View>
    
    {/* Dirección y contacto */}
    <View style={styles.footerContact}>
      <View style={styles.contactItem}>
        <Feather name="map-pin" size={14} color="#64748b" style={styles.contactIcon} />
        <Text style={styles.contactText}>Bosa Centro Calle 65 No 79 C 04 Sur  </Text>
      </View>
      <View style={styles.contactItem}>
        <Feather name="phone" size={14} color="#64748b" style={styles.contactIcon} />
        <Text style={styles.contactText}>+57 310 8037969</Text>
      </View>
      <View style={styles.contactItem}>
        <Feather name="mail" size={14} color="#64748b" style={styles.contactIcon} />
        <Text style={styles.contactText}>leoncaminantes@gmail.com</Text>
      </View>
    </View>
    
    {/* Copyright y términos */}
    <View style={styles.footerLegal}>
      <Text style={styles.copyrightText}>© {new Date().getFullYear()} SGIR. Todos los derechos reservados.</Text>
      <View style={styles.legalLinks}>
        <TouchableOpacity onPress={() => navigation.navigate("Terminos")}>
          <Text style={styles.legalLinkText}>Términos</Text>
        </TouchableOpacity>
        <Text style={styles.legalDivider}>•</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Privacidad")}>
          <Text style={styles.legalLinkText}>Privacidad</Text>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
</View>
      </ScrollView>

      {/* Modal de detalles */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Icon name="close-circle" size={36} color="#fff" />
            </TouchableOpacity>
            {renderModalContent()}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  footerGradient: {
    padding: 24,
  },
  footerBranding: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerLogo: {
    height: 40,
    width: 120,
    marginBottom: 8,
  },
  footerTagline: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  footerSeparator: {
    height: 1,
    marginVertical: 20,
  },
  separatorGradient: {
    height: 1,
    width: '100%',
  },
  footerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  footerNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerNavIcon: {
    marginRight: 6,
  },
  footerNavText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '500',
  },
  footerSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  footerContact: {
    marginBottom: 24,
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    marginRight: 8,
  },
  contactText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  footerLegal: {
    alignItems: 'center',
  },
  copyrightText: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalLinkText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
  },
  legalDivider: {
    color: '#64748b',
    fontSize: 10,
    marginHorizontal: 6,
  },
  footerWrapper: {
    width: '100%',
    marginTop: 20,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gradient: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Sombra para dar efecto de elevación
    elevation: 4, // Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerLink: {
    marginHorizontal: 15,
    paddingVertical: 8,
  },
  footerLinkText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  footerCopyright: {
    color: '#bdc3c7',
    fontSize: 14,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Styles
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    height: 40,
    width: 120,
    marginTop: 100,
    paddingLeft:90
  },
  logo1: {
    height: 65,
    width: 120,
    marginTop: 1,
  },
  
  // Side Menu Styles
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#0D47A1',
    zIndex: 1000,
  },
  menuGradient: {
    flex: 1,
    padding: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginTop: 30,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuProfile: {
    alignItems: 'center',
   
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#0D47A1',
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuItems: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuItemText: {
    marginLeft: 15,
    color: '#fff',
    fontSize: 16,
  },
  menuFooter: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  menuCopyright: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  
  // Main Content Styles
  mainContent: {
    flex: 1,
  },
  
  // Slider Styles
  sliderContainer: {
    height: height * 0.6,
    width: width,
  },
  slideItem: {
    width: width,
    height: height * 0.6,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  slideTagContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
  },
  slideTag: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  slideTagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  slideContent: {
    marginBottom: 60,
  },
  slideTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  slideDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  slideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 140,
    justifyContent: 'space-between',
  },
  slideButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sliderIndicators: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    height: 8,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  
  // About Section Styles
  aboutContainer: {
    padding: 20,
  },
  sectionTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 5,
  },
  aboutCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  aboutImageContainer: {
    height: 200,
    position: 'relative',
  },
  aboutImage: {
    width: '100%',
    height: '100%',
  },
  yearsContainer: {
    position: 'absolute',
    right: 20,
    bottom: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },
  yearsNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  yearsText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  aboutContent: {
    padding: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 20,
  },
  aboutStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  aboutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Destinations Styles
  destinationsContainer: {
    padding: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  destinationsScroll: {
    paddingBottom: 10,
  },
  destinationCard: {
    width: width * 0.8,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  destinationContent: {
    
  },
  destinationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  destinationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  destinationLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  destinationRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Experiences Styles
  experiencesContainer: {
    padding: 20,
  },
  experienceCard: {
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  experienceImage: {
    width: '100%',
    height: '100%',
  },
  experienceGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.8,
    justifyContent: 'center',
    padding: 20,
  },
  experienceContent: {
    
  },
  experienceSubtitleCard: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    letterSpacing: 1,
  },
  experienceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  exploreLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreLinkText: {
    color: '#fff',
    marginRight: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Services Styles
  servicesContainer: {
    padding: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
    height: 150,
    justifyContent: 'center',
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  serviceLinkContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  
  // CTA Styles
  ctaContainer: {
    padding: 20,
    marginBottom: 20,
  },
  ctaGradient: {
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 20,
  },
  ctaContent: {
    flex: 1,
    paddingRight: 10,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 160,
  },
  ctaButtonText: {
    color: '#0D47A1',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  ctaImage: {
    width: 100,
    height: '100%',
  },
  
  // Footer Styles
  footer: {
    backgroundColor: '#0D47A1',
    padding: 20,
    alignItems: 'center',
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    width: '100%',
  },
  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    elevation: 10,
  },
  modalScroll: {
    
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  highlightBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  highlightText: {
    color: '#1E88E5',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bestTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  bestTimeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  reserveButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Experience Modal Styles
  experienceGradientBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  experienceSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  durationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  includesContainer: {
    marginBottom: 20,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginVertical: 5,
  },
  pricePerson: {
    fontSize: 12,
    color: '#666',
  },
  
  // Service Modal Styles
  serviceModalContent: {
    alignItems: 'center',
    padding: 20,
  },
  serviceIconModal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 15,
    textAlign: 'center',
  },
  serviceModalDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  serviceFeatures: {
    width: '100%',
    marginBottom: 25,
  },
  serviceFeaturesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  serviceFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceFeatureText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default Principal;