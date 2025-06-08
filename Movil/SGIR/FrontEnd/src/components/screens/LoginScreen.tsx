import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define tipos de navegación
type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  Services: undefined;
  ForgotPasswordScreen: undefined;
  servicesRE: undefined;
};

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const { width, height } = Dimensions.get('window');
// Endpoint de autenticación
const LOGIN_API = 'http://192.168.0.8:9700/api/auth/login';

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (!usuario.trim() || !contrasena) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      console.log('Enviando a login:', { usuario: usuario.trim(), contrasena });
      const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: usuario.trim(), contrasena }),
      });
      console.log('Status de respuesta:', response.status);
      const json = await response.json();
      console.log('Respuesta JSON:', json);
      if (response.ok && json.token) {
        console.log('Guardando token:', json.token);
        await AsyncStorage.setItem('token', json.token);
        console.log('Token guardado, navegando a Inicio');
        navigation.replace('servicesRE');
      } else {
        console.log('Error de autenticación:', json.message);
        Alert.alert('Error', json.message || 'Credenciales inválidas');
      }
    } catch (err: any) {
      console.log('Error de red en login:', err);
      Alert.alert('Error de red', err.message || 'Intenta nuevamente');
    } finally {
      setLoading(false);
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80' }}
      style={styles.backgroundImage}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.overlay}>
            {/* Sección del Logo */}
            <View style={styles.logoContainer}>
              {/* Aquí coloca tu logo real en lugar del placeholder */}
              <View style={styles.logoPlaceholder}>
                <Image source={require('../../assets/logo.png')}style={{ width: 120, height: 100, marginLeft: 'auto', paddingTop:70 }}  resizeMode="contain" />
              </View>
              <Text style={styles.brandName}>Caminantes Por Colombia</Text>
              <Text style={styles.tagline}>Experiencias exclusivas que te transformarán</Text>
            </View>

            {/* Tarjeta de Inicio de Sesión */}
            <View style={styles.loginCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Bienvenido</Text>
                <View style={styles.cardDivider} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Usuario</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ingresa tu usuario"
                    placeholderTextColor="#999"
                    value={usuario}
                    onChangeText={setUsuario}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#999"
                    secureTextEntry={secureTextEntry}
                    value={contrasena}
                    onChangeText={setContrasena}
                  />
                  <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeButton}>
                    <Text>{secureTextEntry ? "👁️" : "🔒"}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              

              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>INICIAR </Text>
                )}
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿Eres nuevo en Caminantes Por Colombia? </Text>
                <TouchableOpacity 
                
                
                
                
                
                
                
                >
                  <Text style={styles.registerLink}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Elementos decorativos */}
            <View style={styles.decorativeElement1} />
            <View style={styles.decorativeElement2} />
            <View style={styles.decorativeElement3} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: 15,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 5,
    fontStyle: 'italic',
  },
  loginCard: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    maxWidth: 400,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardDivider: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
    borderRadius: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    paddingLeft: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 55,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: 'rgba(29, 139, 128, 0.83)',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 55,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#277bc4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    flexWrap: 'wrap',
  },
  registerText: {
    fontSize: 15,
    color: '#666',
  },
  registerLink: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(29, 139, 128, 0.83)',
  },
  decorativeElement1: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: '20%',
    left: '8%',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  decorativeElement3: {
    position: 'absolute',
    top: '40%',
    left: '5%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
  },
});

export default LoginScreen;