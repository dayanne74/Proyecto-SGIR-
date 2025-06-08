import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'; 
const { width } = Dimensions.get('window');

const SobreNosotros = () => {
  // Función para abrir enlaces externos
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  // Sección de header con imagen de fondo y título
  const Header = () => (
    <View style={styles.headerContainer}>
      <Image
        source={{
          uri: 'https://scontent.fbog4-1.fna.fbcdn.net/v/t39.30808-6/487538257_1306005367712511_3025601080376526290_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeExnsg6PCSQgBZ-Sq7TC3Ajfb3DLwWgCeh9vcMvBaAJ6NVObPap7WLiCXdN9S4dQ1oDrLBIUeS31yaOLpbAY1PN&_nc_ohc=gGSxrGQ6-90Q7kNvwGLPPrQ&_nc_oc=Adl3JqlYpCutF9tNlDw4U_mz5WSEtFbrMvdasxUzi76SklLQMiMumsYNNi2IFo5CJp4&_nc_zt=23&_nc_ht=scontent.fbog4-1.fna&_nc_gid=7i3RRz92kWNqM2Vv7hnHEQ&oh=00_AfGDGOlMwEr0jxhckecFNKxPUJUmkhpqA6J6sUKBw8VgMg&oe=680D0B30',
        }}
        style={styles.headerImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Caminantes Por Colombia</Text>
        <Text style={styles.headerSubtitle}>Explora, siente y vive Colombia con expertos que conocen cada rincón como su hogar.</Text>
      </LinearGradient>
    </View>
  );

  // Sección Sobre Nosotros
  const AboutSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="groups" size={24} color="#FF6B6B" />
        <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
      </View>
      <View style={styles.sectionContent}>
      <Image
          source={require('../../../assets/grupo.jpg')}
          style={styles.sectionImage}
        />
        <Text style={styles.sectionText}>
        Caminantes por Colombia es una agencia de turismo que ofrece experiencias extraordinarias a través de caminatas escolares, excursiones, campamentos y deportes extremos. Se especializan en la creación de momentos memorables y emocionantes, diseñando programas que combinan aventura, educación y diversión para personas de todas las edades.
        </Text>
      </View>
    </View>
  );

  // Sección de Misión y Visión
  const MissionVisionSection = () => (
    <View style={styles.missionVisionContainer}>
      <View style={styles.missionVisionCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="compass" size={32} color="#4ECDC4" />
        </View>
        <Text style={styles.cardTitle}>Nuestra Misión</Text>
        <Text style={styles.cardText}>
        Facilitar experiencias de viaje únicas y educativas, inspirar la exploración, el aprendizaje y la conexión con la naturaleza, proporcionando aventuras emocionantes que dejan recuerdos duraderos.​
        </Text>
      </View>

      <View style={styles.missionVisionCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="eye" size={32} color="#4ECDC4" />
        </View>
        <Text style={styles.cardTitle}>Nuestra Visión</Text>
        <Text style={styles.cardText}>
          Ser reconocidos globalmente como la agencia líder en experiencias de viaje inmersivas y sostenibles 
          en Colombia, convirtiéndonos en embajadores del patrimonio cultural y natural de nuestro país.
        </Text>
      </View>
    </View>
  );

  // Sección de Valores
  const ValuesSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="stars" size={24} color="#FF6B6B" />
        <Text style={styles.sectionTitle}>Nuestros Valores</Text>
      </View>
      <View style={styles.valuesContainer}>
        <View style={styles.valueItem}>
          <FontAwesome5 name="heart" size={28} color="#FF6B6B" />
          <Text style={styles.valueTitle}>Pasión</Text>
          <Text style={styles.valueText}>Amamos lo que hacemos y lo transmitimos en cada experiencia.</Text>
        </View>

        <View style={styles.valueItem}>
          <FontAwesome5 name="leaf" size={28} color="#4ECDC4" />
          <Text style={styles.valueTitle}>Sostenibilidad</Text>
          <Text style={styles.valueText}>Cuidamos nuestro entorno natural y cultural para las futuras generaciones.</Text>
        </View>

        <View style={styles.valueItem}>
          <FontAwesome5 name="handshake" size={28} color="#FFD166" />
          <Text style={styles.valueTitle}>Autenticidad</Text>
          <Text style={styles.valueText}>Ofrecemos experiencias genuinas que representan la verdadera Colombia.</Text>
        </View>

        <View style={styles.valueItem}>
          <FontAwesome5 name="shield-alt" size={28} color="#6D8EA0" />
          <Text style={styles.valueTitle}>Confianza</Text>
          <Text style={styles.valueText}>La seguridad y bienestar de nuestros viajeros es nuestra prioridad.</Text>
        </View>
      </View>
    </View>
  );

  // Sección del Mapa
  const MapSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="location-on" size={24} color="#FF6B6B" />
        <Text style={styles.sectionTitle}>Encuéntranos</Text>
      </View>
      <View style={styles.mapContainer}>
        <WebView
          source={{
            html: `
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7953.87894268715!2d-74.1945229064209!3d4.604860600000025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e433e00999f%3A0x647ba8f9fb082b52!2sCL%2065%20Sur%20-%20KR%2079C!5e0!3m2!1ses-419!2sco!4v1744754206267!5m2!1ses-419!2sco" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
              </iframe>
            `,
          }}
          style={styles.map}
        />
        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={20} color="#FF6B6B" />
            <Text style={styles.addressText}>Bosa Centro Calle 65 No 79 C 04 Sur Oficina 02-03-04 SOTANO </Text>
          </View>
          <View style={styles.addressRow}>
            <Ionicons name="call" size={20} color="#FF6B6B" />
            <Text style={styles.addressText}>+57 310 8037969</Text>
          </View>
          <View style={styles.addressRow}>
            <Ionicons name="mail" size={20} color="#FF6B6B" />
            <Text style={styles.addressText}>leoncaminantes@gmail.com</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const openWhatsApp = () => {
    Linking.openURL('https://wa.link/gfh11y').catch(err => console.error('Error abriendo WhatsApp:', err));
  };
  
  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/caminantesporcolombia').catch(err => console.error('Error abriendo Facebook:', err));
  };
  
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/caminantesporcolombia').catch(err => console.error('Error abriendo Instagram:', err));
  };
  
  // Sección de Call to Action
  const CtaSection = () => (
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
  );

  // Footer
  const Footer = () => (
    <View style={styles.footer}>
      <View style={styles.socialContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
  <TouchableOpacity onPress={openWhatsApp} style={{ marginHorizontal: 10 }}>
    <Icon name="logo-whatsapp" size={25} color="#D4E3E2" />
  </TouchableOpacity>

  <TouchableOpacity onPress={openFacebook} style={{ marginHorizontal: 10 }}>
    <Icon name="logo-facebook" size={25} color="#D4E3E2" />
  </TouchableOpacity>

  <TouchableOpacity onPress={openInstagram} style={{ marginHorizontal: 10 }}>
    <Icon name="logo-instagram" size={25} color="#D4E3E2" />
  </TouchableOpacity>
</View>
      </View>
      <Text style={styles.footerText}>
        © {new Date().getFullYear()} SGIR Todos los derechos reservados.
      </Text>
      <Text style={styles.footerLinks}>
        Política de Privacidad | Términos y Condiciones
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Header />
      <AboutSection />
      <MissionVisionSection />
      <ValuesSection />
      <MapSection />
      <CtaSection />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  sectionContent: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionImage: {
    width: '100%',
    height: 200,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    padding: 15,
  },
  missionVisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    flexWrap: 'wrap',
  },
  missionVisionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 15,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  mapContainer: {
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  testimonialScroll: {
    paddingVertical: 10,
  },
  testimonialCard: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  testimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  testimonialText: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
  footer: {
    backgroundColor: '#EB7049',
    padding: 20,
    alignItems: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  footerLinks: {
    color: '#4ECDC4',
    fontSize: 14,
  },
});

export default SobreNosotros;