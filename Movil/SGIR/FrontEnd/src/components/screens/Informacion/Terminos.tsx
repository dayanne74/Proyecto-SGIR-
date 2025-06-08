import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Seccion {
  titulo: string;
  contenido: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}

const Terminos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const secciones: Seccion[] = [
    {
      titulo: 'Aceptación de los Términos',
      contenido:
        'Al utilizar Caminantes por Colombia, aceptas cumplir con estos Términos de Uso y todas las leyes y regulaciones aplicables. Si no aceptas estos términos, no deberías utilizar nuestros servicios.',
      icon: 'checkmark-circle-outline',
    },
    {
      titulo: 'Modificaciones de los Términos',
      contenido:
        'Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en la plataforma. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.',
      icon: 'refresh-outline',
    },
    {
      titulo: 'Descripción del Servicio',
      contenido:
        'Caminantes por Colombia proporciona una plataforma para la reserva y compra de servicios turísticos ofrecidos por diferentes proveedores. Los servicios incluyen, pero no se limitan a, reservas de vuelos, hoteles, tours y actividades.',
      icon: 'briefcase-outline',
    },
    {
      titulo: 'Uso de la Plataforma',
      contenido:
        'Para utilizar ciertos servicios, es posible que debas registrarte y crear una cuenta. Eres responsable de mantener la confidencialidad de tu información de cuenta y de todas las actividades que ocurran bajo tu cuenta. Te comprometes a no utilizar la plataforma para fines ilegales o no autorizados. No debes, en el uso del servicio, violar ninguna ley en tu jurisdicción.',
      icon: 'phone-portrait-outline',
    },
    {
      titulo: 'Reservas y Pagos',
      contenido:
        'Reservas: Todas las reservas están sujetas a disponibilidad y confirmación del proveedor correspondiente. Nos reservamos el derecho de rechazar cualquier reserva que realices con nosotros.\n\nPagos: Los pagos deben realizarse de acuerdo con las políticas establecidas en la plataforma. No somos responsables de ningún error en los detalles de pago proporcionados por ti.',
      icon: 'card',
    },
    {
      titulo: 'Cancelaciones y Reembolsos',
      contenido:
        'Las políticas de cancelación y reembolso varían según el proveedor del servicio turístico. Es tu responsabilidad revisar y aceptar estas políticas antes de realizar cualquier reserva. No somos responsables de los reembolsos, que son gestionados directamente por el proveedor.',
      icon: 'close-circle-outline',
    },
    {
      titulo: 'Limitación de Responsabilidad',
      contenido:
        'No garantizamos la exactitud o la integridad de la información proporcionada por los proveedores de servicios turísticos. Entiendes y aceptas que cualquier reclamo en relación con los servicios debe dirigirse directamente al proveedor correspondiente.',
      icon: 'alert-circle-outline',
    },
    {
      titulo: 'Propiedad Intelectual',
      contenido:
        'Todo el contenido y software en la plataforma son propiedad de Caminantes por Colombia o de nuestros licenciantes y están protegidos por las leyes de propiedad intelectual. No puedes copiar, modificar, distribuir, vender o arrendar cualquier parte de nuestros servicios o software.',
      icon: 'document-lock-outline',
    },
    {
      titulo: 'Privacidad',
      contenido:
        'Tu privacidad es importante para nosotros. Por favor, revisa nuestra Política de Privacidad, que describe cómo recopilamos, utilizamos y protegemos tu información personal.',
      icon: 'lock-closed-outline',
    },
    {
      titulo: 'Enlaces a Terceros',
      contenido:
        'La plataforma puede contener enlaces a sitios web de terceros que no son operados por nosotros. No tenemos control sobre el contenido y las prácticas de estos sitios y no aceptamos responsabilidad por ellos.',
      icon: 'link-outline',
    },
    {
      titulo: 'Terminación',
      contenido:
        'Nos reservamos el derecho de suspender o terminar tu acceso a la plataforma en cualquier momento, sin previo aviso, por cualquier motivo, incluyendo, sin limitación, la violación de estos términos.',
      icon: 'ban-outline',
    },
    {
      titulo: 'Ley Aplicable y Jurisdicción',
      contenido:
        'Estos términos se regirán e interpretarán de acuerdo con las leyes de Colombia. Cualquier disputa que surja de o en relación con estos términos será resuelta por los tribunales de Colombia.',
      icon: 'globe-outline',
    },
    {
      titulo: 'Contacto',
      contenido:
        'Si tienes alguna pregunta sobre estos Términos de Uso, por favor contáctanos en caminantesporcolombia@gmail.com.',
      icon: 'mail-outline',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerBrand}>Caminantes por Colombia</Text>
        <Text style={styles.header}>Términos de Uso</Text>
        <Text style={styles.updatedDate}>Actualizado: 07 de Julio de 2024</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.introSection}>
          <Text style={styles.paragraph}>
            Bienvenido a <Text style={styles.brand}>Caminantes por Colombia</Text>. Estos Términos de Uso rigen el acceso y uso de nuestra plataforma. Al acceder y utilizar nuestros servicios, aceptas estos términos en su totalidad. Si no estás de acuerdo con estos términos, por favor, no utilices nuestra plataforma.
          </Text>
        </View>

        {secciones.map((item, index) => (
          <View
            key={index}
            style={[
              styles.accordionItem,
              activeIndex === index && styles.activeAccordionItem,
            ]}>
            <TouchableOpacity
              onPress={() => toggleAccordion(index)}
              style={styles.accordionHeader}
              activeOpacity={0.7}>
              <View style={styles.accordionHeaderContent}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#007BFF"
                  style={styles.accordionIcon}
                />
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

        <View style={styles.contactContainer}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color="#007BFF"
            style={styles.contactHeaderIcon}
          />
          <Text style={styles.contactHeader}>¿Necesitas ayuda adicional?</Text>
          <Text style={styles.paragraph}>
            Si tienes dudas sobre nuestros términos de uso o necesitas asistencia, contáctanos:
          </Text>

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

export default Terminos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
    marginBottom: 20,
  },
  brand: {
    color: '#007BFF',
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 22,
    marginBottom: 12,
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
  contactContainer: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 15,
    marginTop: 25,
    alignItems: 'center',
  },
  contactHeaderIcon: {
    marginBottom: 5,
  },
  contactHeader: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  contact: {
    fontSize: 15,
    color: '#007BFF',
    marginLeft: 8,
  },
});
