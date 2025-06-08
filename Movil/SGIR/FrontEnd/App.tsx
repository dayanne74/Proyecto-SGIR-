import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Principal from './src/components/screens/Principal';
import servicesRE from './src/components/forms/servicesRE';
import LoginScreen from './src/components/screens/LoginScreen';
import RegisterScreen from './src/components/screens/RegisterScreen';
import ReservationForm from './src/paginas/formularios/Reservas';
import Contacto from './src/paginas/formularios/Contacto';
import SobreNosotros from './src/components/screens/SobreNosotros';
import Servicios from './src/components/screens/Servicios';
import Reseñas from './src/components/screens/Reseñas';
import Privacidad from './src/components/screens/Informacion/Privacidad';
import Terminos from './src/components/screens/Informacion/Terminos';
import PerfilScreen from "./src/components/forms/PerfilScreen";
import WishlistScreen from './src/components/forms/Favoritos';
import PersonalizedOffers from './src/components/forms/Explore';
import DetailsScreen from './src/components/forms/DetailsScreen';

export type RootStackParamList = {
  Principal: undefined;
  servicesRE: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ReservationForm: undefined;
  Contacto: undefined;
  SobreNosotros: undefined;
  Servicios: undefined;
  Reseñas: undefined;
  Privacidad: undefined;
  Terminos: undefined;
  PerfilScreen: undefined;
  Offers: undefined;
  Wishlist: { wishlist: any[] }; // O define el tipo correcto para wishlist
  DetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Principal">
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="servicesRE" component={servicesRE} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ReservationForm" component={ReservationForm} />
      <Stack.Screen name="Contacto" component={Contacto} />
      <Stack.Screen name="SobreNosotros" component={SobreNosotros} />
      <Stack.Screen name="Servicios" component={Servicios} />
      <Stack.Screen name="Reseñas" component={Reseñas} />
      <Stack.Screen name="Privacidad" component={Privacidad} />
      <Stack.Screen name="Terminos" component={Terminos} />
      <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
      <Stack.Screen 
        name="Offers" 
        component={PersonalizedOffers} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Wishlist" 
        component={WishlistScreen}
        options={{ 
          title: 'Mis Favoritos',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen 
        name="DetailsScreen" 
        component={DetailsScreen} 
        options={{ 
          title: 'Detalles',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;