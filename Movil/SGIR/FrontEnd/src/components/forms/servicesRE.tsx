import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
  StatusBar,
  Linking,
  Animated,
  Easing
} from 'react-native';


import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Rating } from 'react-native-ratings';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  servicesRE: undefined;
  Principal: undefined;
  ReservationForm: undefined;
  Contacto: undefined;
  sobrenosotros: undefined;
  Servicios: undefined;
  Reseñas: undefined;
  Privacidad: undefined;
  Terminos: undefined;
  Services: undefined;
  Favoritos: undefined;
  Explore: undefined;
  PerfilScreen: undefined;
  Offers:undefined;
  
  
}
type Props = NativeStackScreenProps<RootStackParamList, 'servicesRE'>;
// Definición de tipos para los paquetes turísticos
type TourPackage = {
  id: string;
  title: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  category: 'paquetes' | 'excursiones' | 'hoteles';
  duration?: string;
  departureDates?: string[] | 'Diario';
  inclusions?: string[];
  exclusions?: string[];
  amenities?: string[];
  location?: string;
  contact: string;
  whatsappLink: string;
};
const windowDimensions = Dimensions.get('window');
const { width, height } = windowDimensions;
// Datos de ejemplo con tipado correcto
const tourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Circuito Caribe y Valle: Cartagena, Barranquilla y Cali',
    images: [
      'https://lh3.googleusercontent.com/gps-cs-s/AB5caB-NwIWCzwCuv_NdGZvCmF37OydxDDgdu3QgX-dOzLp7otmGmxlQuVL7th3fP124qblwufvAw2XH2Uoh6nTAVw3LkJjQ_kuzVMpLGeGqQgwVisgOSytWtiSvUNIXjjTYLKUbml_h=w675-h390-n-k-no',
      'https://agenciamahaltour.com.co/wp-content/uploads/2022/05/barranquilla.jpg',
      'https://www.semana.com/resizer/v2/5DVGZ2YGIJBCLA5QMD7DCKWLHI.jpg?auth=a1c257dfb2110b9982e1dc5f5dabf39d4be0b843ec48c01697e329337982a492&smart=true&quality=75&width=1280&height=720'
    ],
    shortDescription: 'Disfruta de historia, cultura y ritmo entre la costa y el valle',
    fullDescription: 'Este paquete de 7 días y 6 noches te ofrece:\n\n- Cartagena: Recorrido por la Ciudad Amurallada y atardecer en Café del Mar\n- Barranquilla: Visita al Museo del Carnaval y paseo por la Ventana al Mundo\n- Cali: Clases de salsa y tour gastronómico por San Antonio\n\nIncluye:\n✔ Hospedaje en hoteles 4 estrellas\n✔ Desayuno buffet diario\n✔ Transportes internos en minibús climatizado\n✔ Guías locales certificados\n✔ Entradas a atracciones principales',
    price: '$1,850,000 COP',
    originalPrice: '$2,200,000 COP',
    rating: 4.8,
    reviews: 142,
    category: 'paquetes',
    duration: '7 días / 6 noches',
    departureDates: ['2025-06-01', '2025-07-15', '2025-08-10'],
    inclusions: [
      'Alojamiento',
      'Desayunos',
      'Transporte interno',
      'Guías locales',
      'Entradas'
    ],
    exclusions: [
      'Vuelos internacionales',
      'Almuerzos y cenas',
      'Gastos personales',
      'Propinas'
    ],
    contact: '+57 312 555 0101',
    whatsappLink: 'https://wa.me/573125550101'
  },
  {
    id: '2',
    title: 'Excursión a Tayrona',
    images: [
      'https://randomtrip.es/wp-content/uploads/2019/03/Ines_Playa_Piscina_Tayrona.jpg',
      'https://cdn.turisapps.com/site-1072/a5036f71-b585-4af0-9a9f-2e257fafd159/main.webp',
      'https://media.istockphoto.com/id/1135422837/es/foto/parque-nacional-tayrona.jpg?s=612x612&w=0&k=20&c=PpaTqabmDgfEdiyhmUwobx8btmjhMAEP3XUWCSr1GL8='
    ],
    shortDescription: 'Parque Natural con playas cristalinas',
    fullDescription: 'Excursión de día completo al Parque Nacional Tayrona:\n\n- Recorrido por senderos ecológicos\n- Visita a las playas de Arrecifes, La Piscina y Cabo San Juan\n- Almuerzo típico con pescado fresco\n- Tiempo libre para snorkeling (equipo incluido)\n- Observación de flora y fauna local\n\nIncluye:\n✔ Transporte ida y vuelta desde Santa Marta\n✔ Guía especializado\n✔ Refrigerio y almuerzo\n✔ Seguro básico\n✔ Entrada al parque',
    price: '$350,000 COP',
    originalPrice: '$420,000 COP',
    rating: 4.9,
    reviews: 215,
    category: 'excursiones',
    duration: '1 día',
    departureDates: ['Diario'],
    inclusions: [
      'Transporte',
      'Alimentación',
      'Guía',
      'Entrada al parque',
      'Seguro básico'
    ],
    exclusions: [
      'Gastos adicionales',
      'Propinas',
      'Actividades extras'
    ],
    contact: '+57 310 555 5678',
    whatsappLink: 'https://wa.me/573105555678'
  },
  {
    id: '3',
    title: 'Hotel Boutique Bogotá',
    images: [
      'https://static.wixstatic.com/media/e46769_79365ea4bc8a4bdca1df7792dd2d0b7e~mv2.jpg/v1/fill/w_640,h_476,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e46769_79365ea4bc8a4bdca1df7792dd2d0b7e~mv2.jpg',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/265326396.jpg?k=8f781459a7b04aeff9ff4bce223895f0f718824cec490a4d1c73358c51b4fd61&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/215249220.jpg?k=c290823f824547fc02e67c5fe7d1de6c0a671e41b4d5fe30a6ae5c82a2641a12&o=&hp=1'
    ],
    shortDescription: 'Estadía de lujo en la capital',
    fullDescription: 'Hotel boutique ubicado en el exclusivo sector de Usaquén, Bogotá:\n\n- Habitaciones con acabados coloniales y modernos\n- Restaurante gourmet con cocina fusión\n- Bar en la terraza con vista panorámica\n- Spa con tratamientos locales\n- Servicio de conserjería 24/7\n\nServicios incluidos:\n✔ Desayuno buffet internacional\n✔ WiFi de alta velocidad\n✔ Gimnasio equipado\n✔ Servicio a la habitación\n✔ Lavandería (con costo adicional)',
    price: '$450,000 COP/noche',
    originalPrice: '$520,000 COP/noche',
    rating: 4.7,
    reviews: 178,
    category: 'hoteles',
    amenities: [
      'Piscina',
      'Spa',
      'Restaurante',
      'Gimnasio',
      'Bar',
      'WiFi',
      'Estacionamiento'
    ],
    location: 'Calle 120 # 7-45, Usaquén, Bogotá',
    contact: '+57 1 555 1234',
    whatsappLink: 'https://wa.me/5715551234'
  },
  {
    id: '4',
    title: 'Tradición Andina: Bogotá, Zipaquirá y Villa de Leyva',
    images: [
      'https://media.istockphoto.com/id/1215185965/es/foto/vista-de-montserrate-en-bogot%C3%A1-colombia.jpg?s=612x612&w=0&k=20&c=zHjbgBdTdK5Xtm-0ZqPVr_fSHPJfoD_Nq4rqc6VyiEY=',
      'https://hotelcaciquereal.com/img/noticias/6.jpg',
      'https://www.triviantes.com/wp-content/uploads/2021/12/Turismo-en-Villa-de-Leyva-1.jpg'
    ],
    shortDescription: 'Historia, leyendas y arquitectura colonial en el altiplano',
    fullDescription: 'Este paquete de 5 días y 4 noches incluye:\n\n- Bogotá: Tour por el Museo del Oro y Monserrate\n- Zipaquirá: Visita a la Catedral de Sal\n- Villa de Leyva: Recorrido por el centro histórico y el Fossil Park\n\nIncluye:\n✔ Hospedaje en hoteles boutique 3–4 estrellas\n✔ Desayuno diario\n✔ Transporte privado con guía bilingüe\n✔ Entradas a museos y catedrales\n✔ Seguro de viaje básico',
    price: '$1,200,000 COP',
    originalPrice: '$1,450,000 COP',
    rating: 4.7,
    reviews:  90,
    category: 'paquetes',
    duration: '5 días / 4 noches',
    departureDates: ['2025-05-10', '2025-06-20', '2025-09-01'],
    inclusions: [
      'Alojamiento',
      'Desayunos',
      'Transporte',
      'Guías',
      'Entradas'
    ],
    exclusions: [
      'Vuelos nacionales',
      'Almuerzos y cenas',
      'Gastos personales',
      'Propinas'
    ],
    contact: '+57 313 555 0202',
    whatsappLink: 'https://wa.me/573135550202'
  },
  {
    id: '5',
    title: 'Hotel San Pedro Medellín',
    images: [
      'https://hotelsanpedrodelfuerte.com/wp-content/uploads/2022/02/Hotel_san_Pedro_del_fuerte_hoteles_en_medellin63.jpg',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/189391488.jpg?k=c89e4a8ae7f639224b1b45a3c4e421fa80e2d7a8480e16a020aff418971aaaba&o=&hp=1',
      'https://media.staticontent.com/media/pictures/59a3076d-3667-4209-8453-d3417a48c7a1'
    ],
    shortDescription: 'Confort y modernidad en El Poblado',
    fullDescription: 'Moderno hotel situado en la exclusiva zona de El Poblado en Medellín:\n\n- Piscina en la terraza con vista a la ciudad\n- Gimnasio completo con equipos de última generación\n- Restaurante de alta cocina colombiana\n- Habitaciones con tecnología inteligente\n- Servicio de conserjería personalizado\n\nServicios incluidos:\n✔ Desayuno continental\n✔ WiFi ultra rápido\n✔ Servicio de limpieza diario\n✔ Recepción 24 horas\n✔ Traslado al aeropuerto (con costo adicional)',
    price: '$380,000 COP/noche',
    originalPrice: '$450,000 COP/noche',
    rating: 4.5,
    reviews: 156,
    category: 'hoteles',
    amenities: [
      'Piscina',
      'Gimnasio',
      'Restaurante',
      'Bar',
      'WiFi',
      'Spa',
      'Estacionamiento'
    ],
    location: 'Carrera 43A # 7 Sur-150, El Poblado, Medellín',
    contact: '+57 4 555 5678',
    whatsappLink: 'https://wa.me/5745555678'
  },
  {
    id: '6',
    title: 'Excursión a Guatapé',
    images: [
      'https://www.viajesyfotografia.com/wp-content/uploads/2018/02/guatape-13h42m00s56.jpg',
      'https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/03/07/65e9dd6eb5e78.jpeg',
      'https://media.traveler.es/photos/6137776bb57001fc862c8f2b/master/pass/106157.jpg'
    ],
    shortDescription: 'Visita el Peñol y el pueblo colorido',
    fullDescription: 'Disfruta de un día completo visitando Guatapé:\n\n- Subida a la Piedra del Peñol (740 escalones)\n- Recorrido en lancha por el embalse\n- Almuerzo típico paisa\n- Tiempo libre en el pueblo de Guatapé\n- Visita a los famosos zócalos pintados\n\nIncluye:\n✔ Transporte ida y vuelta desde Medellín\n✔ Guía turístico\n✔ Almuerzo típico\n✔ Entrada a la Piedra del Peñol\n✔ Recorrido en lancha',
    price: '$200,000 COP',
    originalPrice: '$250,000 COP',
    rating: 4.8,
    reviews: 342,
    category: 'excursiones',
    duration: '1 día',
    departureDates: ['Diario'],
    inclusions: [
      'Transporte',
      'Alimentación',
      'Guía',
      'Entradas',
      'Actividades'
    ],
    exclusions: [
      'Gastos adicionales',
      'Compras personales',
      'Propinas'
    ],
    contact: '+57 300 555 4321',
    whatsappLink: 'https://wa.me/573005554321'
  },
  {
    id: '7',
    title: 'Corazón Cafetero: Pereira, Salento y Manizales',
    images: [
      'https://mediaim.expedia.com/destination/1/f9b4450f3959b79aaaf8874540460183.jpg',
      'https://www.triviantes.com/wp-content/uploads/2022/01/que-hacer-en-salento-15.jpg',
      'https://www.triviantes.com/wp-content/uploads/2022/11/turismo-en-manizales-1.jpg'
    ],
    shortDescription: 'Paisajes de café, montañas y cultura cafetera',
    fullDescription: 'Este paquete de 6 días y 5 noches te ofrece:\n\n- Pereira: City tour y visita al Parque del Café\n- Salento: Caminata por el Valle del Cocora\n- Manizales: Termales de Santa Rosa y tour panorámico\n\nIncluye:\n✔ Hospedaje en finca tradicional y hotel 4 estrellas\n✔ Pensiones completas\n✔ Transporte interciudades\n✔ Guía experto en café\n✔ Entradas a fincas y termales',
    price: '$1,650,000 COP',
    originalPrice: '$1,900,000 COP',
    rating: 4.9,
    reviews: 188,
    category: 'paquetes',
    duration: '6 días / 5 noches',
    departureDates: ['2025-04-20', '2025-05-25', '2025-07-05'],
    inclusions: [
      'Alojamiento',
      'Todas las comidas',
      'Transporte',
      'Guías',
      'Entradas'
    ],
    exclusions: [
      'Vuelos nacionales',
      'Gastos personales',
      'Propinas'
    ],
    contact: '+57 314 555 0303',
    whatsappLink: 'https://wa.me/573145550303'
  },
  {
    id: '8',
    title: 'Paraíso Insular: San Andrés, Providencia y Rosario',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Panor%C3%A1mica_de_San_Andres.JPG/1200px-Panor%C3%A1mica_de_San_Andres.JPG',
      'https://viajasanandres.com/wp-content/uploads/2023/01/como-llegar-a-providencia-desde-san-andres.jpg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/86/86/c7/isla-del-sol.jpg?w=600&h=400&s=1'
    ],
    shortDescription: 'Playas turquesas, arrecifes y cultura isleña',
    fullDescription: 'Este paquete de 6 días y 5 noches te incluye:\n\n- San Andrés: Tour en moto acuática y Hoyo Soplador\n- Providence: Snorkeling y visita a Mc Bean Lagoon\n- Rosario: Recorrido en lancha y tiempo libre en Playa Blanca\n\nIncluye:\n✔ Hospedaje en resorts 3–4 estrellas frente al mar\n✔ Desayuno continental\n✔ Traslados marítimos y terrestres\n✔ Guías locales\n✔ Equipo de snorkel',
    price: '$2,100,000 COP',
    originalPrice: '$2,450,000 COP',
    rating: 4.8,
    reviews: 205,
    category: 'paquetes',
    duration: '6 días / 5 noches',
    departureDates: ['2025-06-05', '2025-07-20', '2025-08-15'],
    inclusions: [
      'Alojamiento',
      'Desayunos',
      'Transportes marítimos',
      'Guías',
      'Equipo snorkel'
    ],
    exclusions: [
      'Vuelos nacionales',
      'Almuerzos y cenas',
      'Gastos personales',
      'Propinas'
    ],
    contact: '+57 315 555 0404',
    whatsappLink: 'https://wa.me/573155550404'
  },
  {
    id: '9',
    title: 'Amazonas y Planicie: Leticia, Mocoa y Florencia',
    images: [
      'https://encuentradestinos.com/wp-content/uploads/2024/05/que-ver-en-leticia.jpg',
      'https://www.mocoa-putumayo.gov.co/MiMunicipio/PublishingImages/Paginas/Presentacion/Panoramica%20Centro%20Mocoa.jpeg',
      'https://i.ytimg.com/vi/2F1N6oZelbY/maxresdefault.jpg'
    ],
    shortDescription: 'Selva amazónica, cascadas y cultura surcolombiana',
    fullDescription: 'Descubre el sur de Colombia en 8 días y 7 noches:\n\n- Leticia: Noche en lodge y paseo por el río Amazonas\n- Mocoa: Visita a las Cascadas de Fin del Mundo\n- Florencia: Tour cultural y gastronomía local\n\nIncluye:\n✔ Hospedaje en lodge y hotel 3 estrellas\n✔ Pensiones completas\n✔ Transporte fluvial y terrestre\n✔ Guía indígena y local\n✔ Seguro de viaje',
    price: '$2,500,000 COP',
    originalPrice: '$2,900,000 COP',
    rating: 4.7,
    reviews:  156,
    category: 'paquetes',
    duration: '8 días / 7 noches',
    departureDates: ['2025-09-10', '2025-10-15', '2025-11-05'],
    inclusions: [
      'Alojamiento',
      'Todas las comidas',
      'Transporte',
      'Guías',
      'Seguro de viaje'
    ],
    exclusions: [
      'Vuelos internacionales',
      'Gastos personales',
      'Propinas'
    ],
    contact: '+57 316 555 0505',
    whatsappLink: 'https://wa.me/573165550505'
  },
    // Excursiones (continuación)
    {
      id: '10',
      title: 'Visita a Caño Cristales',
      images: [
        'https://lirp.cdn-website.com/088ca3db/dms3rep/multi/opt/tours+a+can%CC%83o+cristales-640w.jpg',
        'https://awake.travel/blog/wp-content/uploads/2017/05/Cano-cristalitos.png',
        'https://lirp.cdn-website.com/088ca3db/dms3rep/multi/opt/tours+a+can%CC%83o+cristales-640w.jpg'
      ],
      shortDescription: 'El río de los cinco colores',
      fullDescription: 'Excursión de un día a Caño Cristales:\n\n- Senderismo por el río multicolor\n- Observación de flora endémica\n- Almuerzo campestre\n\nIncluye:\n✔ Transporte ida y vuelta desde La Macarena\n✔ Guía especializado\n✔ Almuerzo típico\n✔ Seguro básico\n✔ Entrada al parque',
      price: '$450,000 COP',
      originalPrice: '$550,000 COP',
      rating: 4.9,
      reviews: 128,
      category: 'excursiones',
      duration: '1 día',
      departureDates: ['Diario'],
      inclusions: [
        'Transporte',
        'Guía',
        'Almuerzo',
        'Entrada al parque',
        'Seguro básico'
      ],
      exclusions: [
        'Gastos personales',
        'Propinas',
        'Equipo de snorkeling'
      ],
      contact: '+57 312 555 2233',
      whatsappLink: 'https://wa.me/573125552233'
    },
    {
      id: '11',
      title: 'Tour por la Laguna de Guatavita',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/cf/a0/04/caption.jpg?w=1200&h=-1&s=1',
        'https://visitaguatavita.com/wp-content/uploads/2024/08/laguna-guatavita.jpg',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/0f/50/8e/50.jpg'
      ],
      shortDescription: 'Mito de la leyenda de El Dorado',
      fullDescription: 'Excursión de día completo a la laguna sagrada:\n\n- Sendero ecológico hasta la laguna\n- Charla sobre la leyenda muisca\n- Almuerzo campestre\n\nIncluye:\n✔ Transporte ida y vuelta desde Bogotá\n✔ Guía experto en cultura Muisca\n✔ Almuerzo típico\n✔ Entrada a la reserva\n✔ Seguro básico',
      price: '$320,000 COP',
      originalPrice: '$400,000 COP',
      rating: 4.8,
      reviews: 123,
      category: 'excursiones',
      duration: '1 día',
      departureDates: ['Diario'],
      inclusions: [
        'Transporte',
        'Guía cultural',
        'Almuerzo',
        'Entrada',
        'Seguro básico'
      ],
      exclusions: [
        'Gastos personales',
        'Propinas',
        'Equipo fotográfico'
      ],
      contact: '+57 313 555 3344',
      whatsappLink: 'https://wa.me/573135553344'
    },
    {
      id: '12',
      title: 'Trekking en la Sierra Nevada (Minca)',
      images: [
        'https://www.colombiatctravel.com/wp-content/uploads/2019/10/gallery-minca-sierra-nevada-tour-1-dia-1-comp.jpg',
        'https://laperlaapp.s3.us-east-2.amazonaws.com/gallery/6570/conversions/ceKSGkkE4VK2G2Slh21nNZmbNbSDlnu4NaVanx8m-thumb.webp',
        'https://lajorara.com/wp-content/uploads/2020/04/Tour-Minca-Sierra-Nevada-de-Santa-Marta-caminata-de-naturaleza-a-Pozo-Azul.jpg'
      ],
      shortDescription: 'Senderos verdes y cascadas escondidas',
      fullDescription: 'Día de aventura en Minca:\n\n- Caminata a Pozo Azul y Cascada Marinka\n- Visita a finca de café orgánico\n- Almuerzo tradicional\n\nIncluye:\n✔ Transporte desde Santa Marta\n✔ Guía local bilingüe\n✔ Almuerzo típico\n✔ Entrada a senderos\n✔ Seguro básico',
      price: '$280,000 COP',
      originalPrice: '$350,000 COP',
      rating: 4.7,
      reviews: 212,
      category: 'excursiones',
      duration: '1 día',
      departureDates: ['Diario'],
      inclusions: [
        'Transporte',
        'Guía',
        'Almuerzo',
        'Entrada',
        'Seguro básico'
      ],
      exclusions: [
        'Gastos personales',
        'Propinas',
        'Equipo de trekking'
      ],
      contact: '+57 314 555 5566',
      whatsappLink: 'https://wa.me/573145555566'
    },
    {
      id: '13',
      title: 'Día en Barichara y Guane',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/a5/cd/19/caption.jpg?w=1200&h=1200&s=1',
        'https://images.mnstatic.com/b1/c6/b1c6dee81de57c3058243eb226cfc9ab.jpg?quality=75&format=png&fit=crop&width=980&height=880&aspect_ratio=980%3A880',
        'https://www.patoneando.com/wp-content/uploads/2017/02/Barichara-y-Guane-Patoneando-blog-de-viajes-2.jpg'
      ],
      shortDescription: 'Pueblos coloniales de Piedras Blancas',
      fullDescription: 'Excursión de día completo:\n\n- Paseo por las calles empedradas de Barichara\n- Visita a Guane y su mirador\n- Almuerzo típico santandereano\n\nIncluye:\n✔ Transporte terrestre\n✔ Guía local\n✔ Almuerzo campestre\n✔ Seguro básico\n✔ Entrada a miradores',
      price: '$260,000 COP',
      originalPrice: '$320,000 COP',
      rating: 4.6,
      reviews:  92,
      category: 'excursiones',
      duration: '1 día',
      departureDates: ['Diario'],
      inclusions: [
        'Transporte',
        'Guía',
        'Almuerzo',
        'Seguro básico',
        'Entradas'
      ],
      exclusions: [
        'Propinas',
        'Gastos personales',
        'Equipo fotográfico'
      ],
      contact: '+57 316 555 8899',
      whatsappLink: 'https://wa.me/573165558899'
    },
    
    // Hoteles (continuación)
    {
      id: '14',
      title: 'Hotel Plaza Cartagena',
      images: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/53277272.jpg?k=78027ca66ea8e4887cf3ca46fcdd0655b91930607e89c8db0b126938529f9c1f&o=&hp=1',
        'https://images.trvl-media.com/lodging/2000000/1540000/1533600/1533589/d744cea4.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        'https://cdn2.paraty.es/em-cartagena/images/f6a2ca737f30a23=s1900'
      ],
      shortDescription: 'Elegancia colonial junto al mar',
      fullDescription: 'Hotel de 5 estrellas en el centro histórico de Cartagena:\n\n- Piscina en la azotea\n- Spa de lujo\n- Restaurante de cocina regional\n- Suites con vista al mar\n- Servicio de concierge 24/7',
      price: '$520,000 COP/noche',
      originalPrice: '$600,000 COP/noche',
      rating: 4.9,
      reviews: 210,
      category: 'hoteles',
      amenities: [
        'Piscina',
        'Spa',
        'Restaurante',
        'Bar',
        'WiFi',
        'Terraza'
      ],
      location: 'Cra 2 #39-78, Cartagena, Bolívar',
      contact: '+57 5 555 3344',
      whatsappLink: 'https://wa.me/5755553344'
    },
    {
      id: '15',
      title: 'Selina Bogotá',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/8b/e7/0a/restaurante.jpg?w=900&h=500&s=1',
        'https://images.trvl-media.com/lodging/28000000/27440000/27436500/27436405/992aac4f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        'https://ghl-comfort-los-heroes.hotels-bogota.net/data/Pics/OriginalPhoto/12838/1283851/1283851456/ghl-comfort-hotel-los-heroes-bogota-pic-14.JPEG'
      ],
      shortDescription: 'Estilo bohemio y espacios de coworking',
      fullDescription: 'Hostel & hotel híbrido en La Candelaria:\n\n- Áreas de coworking\n- Terraza con bar\n- Habitaciones privadas y compartidas\n- Actividades culturales diarias',
      price: '$280,000 COP/noche',
      originalPrice: '$330,000 COP/noche',
      rating: 4.6,
      reviews: 322,
      category: 'hoteles',
      amenities: [
        'Coworking',
        'Bar',
        'WiFi',
        'Lockers',
        'Actividades'
      ],
      location: 'Cra 3 #26-41, Bogotá, Cundinamarca',
      contact: '+57 1 555 6677',
      whatsappLink: 'https://wa.me/5715556677'
    },
    {
      id: '16',
      title: 'Sunrise San Andrés',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/11/3f/3b/ghl-relax-hotel-sunrise.jpg?w=900&h=500&s=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/298757281.jpg?k=5bdee895096becaca712d907a9febc885092efa726da207e2e4f460274261d2e&o=&hp=1',
        'https://images.trvl-media.com/lodging/2000000/1350000/1349900/1349853/1942e346.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill'
      ],
      shortDescription: 'Frente al mar con playa privada',
      fullDescription: 'Resort 4 estrellas en San Andrés:\n\n- Playa privada con sillas y sombrillas\n- Piscina infinita\n- Spa y masajes\n- Actividades acuáticas',
      price: '$400,000 COP/noche',
      originalPrice: '$450,000 COP/noche',
      rating: 4.7,
      reviews: 198,
      category: 'hoteles',
      amenities: [
        'Playa privada',
        'Piscina',
        'Spa',
        'Restaurante',
        'WiFi'
      ],
      location: 'Av Colombia #4, San Andrés, Archipiélago',
      contact: '+57 5 555 7788',
      whatsappLink: 'https://wa.me/5755557788'
    },
    {
      id: '29',
      title: 'Hotel Colonial Popayán',
      images: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/190751467.jpg?k=aacfcd261533e1b8820ee390af4ff8700ef6a2c5d0781f962121ca75080d5346&o=&hp=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/237320414.jpg?k=5319d4bc97592786e059a9cc45b04c6373e5443e3004fb28f2fa7ada0fea4c1f&o=&hp=1',
        'https://y.cdrst.com/foto/hotel-sf/ca2717b/granderesp/foto-hotel-ca266d1.jpg'
      ],
      shortDescription: 'Encanto histórico con comodidades modernas',
      fullDescription: 'Hotel 4 estrellas en el centro histórico:\n\n- Patio interior colonial\n- Restaurante gourmet\n- Habitaciones amplias',
      price: '$260,000 COP/noche',
      originalPrice: '$300,000 COP/noche',
      rating: 4.5,
      reviews: 102,
      category: 'hoteles',
      amenities: [
        'WiFi',
        'Desayuno incluido',
        'Restaurante',
        'Bar',
        'Estacionamiento'
      ],
      location: 'Calle 8 #3-40, Popayán, Cauca',
      contact: '+57 2 555 3344',
      whatsappLink: 'https://wa.me/5725553344'
    },
    
  ];
  
  const ServicesRE: React.FC<Props> = ({ navigation}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'paquetes' | 'excursiones' | 'hoteles'>('todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TourPackage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Animación para cambiar imágenes
  const animateImageChange = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const nextImage = () => {
    if (!selectedItem) return;
    animateImageChange();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % selectedItem.images.length
    );
  };

  const prevImage = () => {
    if (!selectedItem) return;
    animateImageChange();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + selectedItem.images.length) % selectedItem.images.length
    );
  };

  // Función para filtrar los elementos según la búsqueda por nombre y categoría
  const filteredItems = tourPackages.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Función para mostrar detalles al hacer clic
  const showItemDetails = (item: TourPackage) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setModalVisible(true);
  };
  // Renderizar cada elemento de la lista
  const renderItem = ({ item }: { item: TourPackage }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => showItemDetails(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.cardGradient}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.shortDescription}</Text>
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardOriginalPrice}>{item.originalPrice}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardBadge}>
        <Text style={styles.badgeText}>
          {item.category === 'paquetes' ? 'Paquete' : 
           item.category === 'excursiones' ? 'Excursión' : 'Hotel'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      

      {/* Banner principal con animación */}
      <View style={styles.bannerContainer}>
      <Image
        source={require('../../../assets/inicio.jpg')}
        style={styles.bannerImage}
      />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.bannerGradient}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerText}>Descubre la magia de Colombia</Text>
          <Text style={styles.bannerSubtext}>Experiencias únicas que quedarán en tu memoria</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explorar Destinos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar destinos, hoteles, actividades..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categorías */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'todos' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('todos')}
          >
            <Icon 
              name="earth" 
              size={20} 
              color={selectedCategory === 'todos' ? '#fff' : '#0092CC'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === 'todos' && styles.categoryTextActive
            ]}>Todos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'paquetes' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('paquetes')}
          >
            <Icon 
              name="briefcase" 
              size={20} 
              color={selectedCategory === 'paquetes' ? '#fff' : '#0092CC'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === 'paquetes' && styles.categoryTextActive
            ]}>Paquetes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'excursiones' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('excursiones')}
          >
            <Icon 
              name="walk" 
              size={20} 
              color={selectedCategory === 'excursiones' ? '#fff' : '#0092CC'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === 'excursiones' && styles.categoryTextActive
            ]}>Excursiones</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'hoteles' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('hoteles')}
          >
            <Icon 
              name="bed" 
              size={20} 
              color={selectedCategory === 'hoteles' ? '#fff' : '#0092CC'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === 'hoteles' && styles.categoryTextActive
            ]}>Hoteles</Text>
          </TouchableOpacity>
          
          
        </ScrollView>
      </View>

      {/* Contador de resultados */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'} encontrados
        </Text>
      </View>

      {/* Lista de elementos */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Icon name="sad-outline" size={50} color="#888" />
          <Text style={styles.noResultsText}>No encontramos resultados</Text>
          <Text style={styles.noResultsSubtext}>Intenta con otros términos de búsqueda</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
            }}
          >
            <Text style={styles.resetButtonText}>Reiniciar búsqueda</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón flotante de reserva */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('ReservationForm')}
      >
        <Icon name="calendar" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>Reservar</Text>
        
      </TouchableOpacity>

      {/* Modal de detalles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                {/* Carrusel de imágenes */}
                <View style={styles.imageCarousel}>
                  <Animated.Image 
                    source={{ uri: selectedItem.images[currentImageIndex] }} 
                    style={[styles.modalImage, { opacity: fadeAnim }]} 
                  />
                  <TouchableOpacity 
                    style={[styles.carouselButton, styles.prevButton]}
                    onPress={prevImage}
                  >
                    <Icon name="chevron-back" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.carouselButton, styles.nextButton]}
                    onPress={nextImage}
                  >
                    <Icon name="chevron-forward" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.imageCounter}>
                    <Text style={styles.imageCounterText}>
                      {currentImageIndex + 1}/{selectedItem.images.length}
                    </Text>
                  </View>
                </View>
                
                <ScrollView style={styles.modalScrollView}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                    <View style={styles.modalRatingContainer}>
                      <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={20}
                        readonly
                        startingValue={selectedItem.rating}
                        style={styles.ratingStars}
                      />
                      <Text style={styles.modalRatingText}>{selectedItem.rating} ({selectedItem.reviews} reseñas)</Text>
                    </View>
                  </View>
                  
                  {/* Información destacada */}
                  <View style={styles.highlightInfo}>
                    <View style={styles.highlightItem}>
                      <Icon name="time-outline" size={20} color="#0092CC" />
                      <Text style={styles.highlightText}>
                        {selectedItem.duration || (selectedItem.category === 'hoteles' ? 'Por noche' : '1 día')}
                      </Text>
                    </View>
                    {selectedItem.departureDates && (
                      <View style={styles.highlightItem}>
                        <Icon name="calendar-outline" size={20} color="#0092CC" />
                        <Text style={styles.highlightText}>
                          {Array.isArray(selectedItem.departureDates) ? 
                           (selectedItem.departureDates[0] === 'Diario' ? 'Salidas diarias' : 
                            `Próximas salidas: ${selectedItem.departureDates.join(', ')}`) : 
                           'Consultar fechas'}
                        </Text>
                      </View>
                    )}
                    {selectedItem.location && (
                      <View style={styles.highlightItem}>
                        <Icon name="location-outline" size={20} color="#0092CC" />
                        <Text style={styles.highlightText}>{selectedItem.location}</Text>
                      </View>
                    )}
                  </View>
                  
                  {/* Precio con descuento */}
                  <View style={styles.priceContainer}>
                    <Text style={styles.modalOriginalPrice}>{selectedItem.originalPrice}</Text>
                    <Text style={styles.modalPrice}>{selectedItem.price}</Text>
                    {selectedItem.category !== 'hoteles' && (
                      <Text style={styles.priceNote}>Precio por persona</Text>
                    )}
                  </View>
                  
                  {/* Descripción */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <Text style={styles.modalDescription}>{selectedItem.fullDescription}</Text>
                  </View>
                  
                  {/* Incluye/No incluye */}
                  <View style={styles.inclusionsContainer}>
                    <View style={styles.inclusionsColumn}>
                      <Text style={styles.inclusionsTitle}>Incluye</Text>
                      {selectedItem.inclusions?.map((item, index) => (
                        <View key={index} style={styles.inclusionItem}>
                          <Icon name="checkmark-circle" size={16} color="#4CAF50" />
                          <Text style={styles.inclusionText}>{item}</Text>
                        </View>
                      )) || (
                        <Text style={styles.noInclusionsText}>No especificado</Text>
                      )}
                    </View>
                    <View style={styles.inclusionsColumn}>
                      <Text style={styles.exclusionsTitle}>No incluye</Text>
                      {selectedItem.exclusions?.map((item, index) => (
                        <View key={index} style={styles.inclusionItem}>
                          <Icon name="close-circle" size={16} color="#F44336" />
                          <Text style={styles.inclusionText}>{item}</Text>
                        </View>
                      )) || (
                        <Text style={styles.noInclusionsText}>No especificado</Text>
                      )}
                    </View>
                  </View>
                  
                  {/* Amenidades (para hoteles) */}
                  {selectedItem.amenities && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Amenidades</Text>
                      <View style={styles.amenitiesContainer}>
                        {selectedItem.amenities.map((amenity, index) => (
                          <View key={index} style={styles.amenityItem}>
                            <Icon name="checkmark" size={16} color="#0092CC" />
                            <Text style={styles.amenityText}>{amenity}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  
                  {/* Contacto */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contacto</Text>
                    <Text style={styles.contactText}>{selectedItem.contact}</Text>
                    <TouchableOpacity 
                      style={styles.whatsappButton}
                      onPress={() => Linking.openURL(selectedItem.whatsappLink)}
                    >
                      <Icon name="logo-whatsapp" size={20} color="#fff" />
                      <Text style={styles.whatsappButtonText}>Contactar por WhatsApp</Text>
                    
                    </TouchableOpacity>

                  </View>

                </ScrollView>
                
                
                
                
                {/* Botón para cerrar */}
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Menú inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("servicesRE")}>
          <Icon name="home" size={24} color="#0092CC" />
          <Text style={[styles.menuText, { color: '#0092CC' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Offers")}>
          <Icon name="compass" size={24} color="#888" />
          <Text style={styles.menuText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PerfilScreen")}>
          <Icon name="person" size={24} color="#888" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerContainer: {
    height: 200,
    marginBottom: 10,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtext: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 15,
  },
  exploreButton: {
    backgroundColor: '#386e7d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 10,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0092CC',
  },
  categoryButtonActive: {
    backgroundColor: '#0092CC',
    borderColor: '#0092CC',
  },
  categoryText: {
    fontSize: 14,
    color: '#0092CC',
    fontWeight: '600',
    marginLeft: 5,
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  noResultsText: {
    fontSize: 18,
    color: '#333',
    marginTop: 15,
    fontWeight: '600',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0092CC',
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardOriginalPrice: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  reviewsText: {
    marginLeft: 4,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  cardBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,146,204,0.9)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: height * 0.85,
  },
  imageCarousel: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },
  prevButton: {
    left: 15,
  },
  nextButton: {
    right: 15,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 12,
  },
  modalScrollView: {
    padding: 20,
    paddingBottom: 80,
  },
  modalHeader: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modalRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingStars: {
    marginRight: 10,
  },
  modalRatingText: {
    fontSize: 14,
    color: '#666',
  },
  highlightInfo: {
    backgroundColor: '#f5f9ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  priceContainer: {
    marginBottom: 20,
  },
  modalOriginalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0092CC',
    marginTop: 5,
  },
  priceNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  modalDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  inclusionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inclusionsColumn: {
    flex: 1,
  },
  inclusionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  exclusionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 10,
  },
  inclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inclusionText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
    flex: 1,
  },
  noInclusionsText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  whatsappButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  saveButtonText: {
    color: '#0092CC',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reserveButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#FF6B00',
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
});

export default ServicesRE;