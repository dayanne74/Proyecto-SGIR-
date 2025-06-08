import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Habilitar animaciones en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Definir una interfaz para las secciones del acordeón
interface Seccion {
  titulo: string;
  contenido: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}

const PoliticaDePrivacidad: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const secciones: Seccion[] = [
    {
      titulo: '¿Qué tipo de información recopilamos?',
      contenido:
        'Recopilamos información personal como nombre, correo electrónico, número de teléfono, detalles de pago y de reserva de viaje.',
      icon: 'information-circle-outline'
    },
    {
      titulo: '¿Cómo usamos tu información?',
      contenido:
        'Utilizamos tu información para gestionar tus reservas, mejorar nuestros servicios, y mantenerte informado sobre actualizaciones y promociones.',
      icon: 'analytics-outline'
    },
    {
      titulo: '¿Compartimos tu información con terceros?',
      contenido:
        'No compartimos tu información personal, salvo en los casos de proveedores de servicios turísticos, pagos o cuando lo requiera la ley.',
      icon: 'share-outline'
    },
    {
      titulo: '¿Cómo protegemos tu información?',
      contenido:
        'Implementamos medidas de seguridad avanzadas, aunque no podemos garantizar una seguridad total debido a las limitaciones de la tecnología.',
      icon: 'shield-checkmark-outline'
    },
    {
      titulo: '¿Cuánto tiempo retenemos tu información?',
      contenido:
        'Retenemos tu información solo por el tiempo necesario para cumplir con los fines para los que fue recopilada, y conforme a los requisitos legales.',
      icon: 'time-outline'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerBrand}>Caminantes por Colombia</Text>
        <Text style={styles.header}>Política de Privacidad</Text>
        <Text style={styles.updatedDate}>Actualizado: 07 de Julio de 2024</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.introSection}>
          <Text style={styles.paragraph}>
            Bienvenido a <Text style={styles.brand}>Caminantes por Colombia</Text>. Aquí te explicamos cómo recopilamos, usamos y protegemos tu información personal.
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>1. Información que Recopilamos</Text>
        
        {secciones.map((item: Seccion, index: number) => (
          <View key={index} style={[
            styles.accordionItem, 
            activeIndex === index && styles.activeAccordionItem
          ]}>
            <TouchableOpacity 
              onPress={() => toggleAccordion(index)} 
              style={styles.accordionHeader}
              activeOpacity={0.7}
            >
              <View style={styles.accordionHeaderContent}>
                <Ionicons name={item.icon} size={22} color="#007BFF" style={styles.accordionIcon} />
                <Text style={styles.accordionTitle}>{item.titulo}</Text>
              </View>
              <Ionicons 
                name={activeIndex === index ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#007BFF" 
              />
            </TouchableOpacity>
            
            {activeIndex === index && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionText}>{item.contenido}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>2. Tus Derechos</Text>
        <View style={styles.rightSection}>
          <View style={styles.rightIconContainer}>
            <Ionicons name="shield-outline" size={30} color="#34A853" />
          </View>
          <View style={styles.rightTextContainer}>
            <Text style={styles.subTitle}>¿Cuáles son tus derechos sobre tu información personal?</Text>
            <Text style={styles.paragraph}>
              Puedes acceder, rectificar, eliminar o restringir el uso de tu información personal, entre otros derechos otorgados por la ley.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>3. Cookies y Tecnologías Similares</Text>
        <View style={styles.cookieSection}>
          <View style={styles.cookieIconContainer}>
            <Ionicons name="warning-outline" size={25} color="#FFA000" />
          </View>
          <Text style={styles.paragraph}>
            Usamos cookies para mejorar tu experiencia. Puedes configurar tu navegador para rechazarlas , pero esto puede afectar la funcionalidad de la plataforma.
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>4. Contacto</Text>
        <Text style={styles.subTitle}>¿Tienes más preguntas?</Text>
        <Text style={styles.paragraph}>Si tienes alguna duda sobre nuestra política de privacidad, contáctanos:</Text>
        
        <View style={styles.contactContainer}>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={22} color="#007BFF" />
            <Text style={styles.contact}>caminantesporcolombia@gmail.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={22} color="#007BFF" />
            <Text style={styles.contact}>312 2567578</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PoliticaDePrivacidad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingTop: 0,
  },
  headerContainer: {
    backgroundColor: '#007BFF',
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerBrand: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 5,
  },
  updatedDate: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 25,
    marginHorizontal: 16,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  introSection: {
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  brand: {
    color: '#007BFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 20,
    marginBottom: 12,
  },
  contact: {
    fontSize: 15,
    color: '#007BFF',
    marginLeft: 8,
  },
  accordionItem: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeAccordionItem: {
    borderColor: '#007BFF',
  },
  accordionHeader: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionIcon: {
    marginRight: 10,
  },
  accordionTitle: {
    color: '#2c3e50',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  accordionContent: {
    backgroundColor: '#f7faff',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  accordionText: {
    fontSize: 14,
    color: '#4a4a4a',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 15,
  },
  rightSection: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
  },
  rightIconContainer: {
    marginRight: 15,
    alignSelf: 'center',
  },
  rightTextContainer: {
    flex: 1,
  },
  cookieSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
  },
  cookieIconContainer: {
    marginRight: 15,
    alignSelf: 'center',
  },
  contactContainer: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
