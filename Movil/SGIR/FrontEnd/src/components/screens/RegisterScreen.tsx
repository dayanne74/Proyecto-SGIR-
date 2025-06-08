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

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ServiciosUsuario: undefined;
  Services: undefined;
};

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

const { width, height } = Dimensions.get('window');
const REGISTER_API = 'http://192.168.0.8:9700/api/auth/register';

const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegister = async () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !usuario.trim() ||
      !contrasena ||
      !documento.trim() ||
      !telefono.trim()
    ) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos para continuar');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(REGISTER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          correo: correo.trim(),
          usuario: usuario.trim(),
          contrasena,
          documento: documento.trim(),
          telefono: telefono.trim(),
        }),
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert('Registro exitoso', 'Bienvenido a Caminantes Por Colombia. Inicia sesión para comenzar tu aventura.');
        navigation.replace('LoginScreen');
      } else {
        Alert.alert('Error en el registro', json.message || 'No se pudo completar el registro. Intenta nuevamente.');
      }
    } catch (err: any) {
      Alert.alert('Error de conexión', err.message || 'Verifica tu conexión e intenta nuevamente');
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType: any = 'default',
    secure: boolean = false,
    toggleSecure?: () => void
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secure && secureTextEntry}
          autoCapitalize={keyboardType === 'email-address' || secure ? 'none' : 'words'}
        />
        {secure && (
          <TouchableOpacity onPress={toggleSecure} style={styles.eyeButton}>
            <Text>{secureTextEntry ? "👁️" : "🔒"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80' }}
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
              <View style={styles.logoPlaceholder}>
                <Image source={require('../../assets/logo.png')} style={{ width: 80, height: 70 }} resizeMode="contain" />
              </View>
              <Text style={styles.brandName}>Caminantes Por Colombia</Text>
              <Text style={styles.tagline}>Únete a nuestra comunidad de exploradores</Text>
            </View>

            {/* Tarjeta de Registro */}
            <View style={styles.registerCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Crear cuenta</Text>
                <View style={styles.cardDivider} />
              </View>

              <View style={styles.formContainer}>
                {/* Fila para nombre y apellido */}
                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, styles.halfInput]}>
                    <Text style={styles.inputLabel}>Nombre</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Tu nombre"
                        placeholderTextColor="#999"
                        value={nombre}
                        onChangeText={setNombre}
                      />
                    </View>
                  </View>
                  
                  <View style={[styles.inputGroup, styles.halfInput]}>
                    <Text style={styles.inputLabel}>Apellido</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Tu apellido"
                        placeholderTextColor="#999"
                        value={apellido}
                        onChangeText={setApellido}
                      />
                    </View>
                  </View>
                </View>

                {renderInputField(
                  'Correo electrónico',
                  'Correo electrónico',
                  correo,
                  setCorreo,
                  'email-address'
                )}

                {renderInputField(
                  'Nombre de usuario',
                  'Elige un usuario único',
                  usuario,
                  setUsuario
                )}

                {renderInputField(
                  'Contraseña',
                  'Crea una contraseña segura',
                  contrasena,
                  setContrasena,
                  'default',
                  true,
                  toggleSecureEntry
                )}

                {/* Fila para documento y teléfono */}
                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, styles.halfInput]}>
                    <Text style={styles.inputLabel}>Documento</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Número de ID"
                        placeholderTextColor="#999"
                        value={documento}
                        onChangeText={setDocumento}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  
                  <View style={[styles.inputGroup, styles.halfInput]}>
                    <Text style={styles.inputLabel}>Teléfono</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Tu número"
                        placeholderTextColor="#999"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.registerButtonText}>COMENZAR</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.loginLink}>Iniciar sesión</Text>
                  </TouchableOpacity>
                </View>
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
    paddingVertical: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: 10,
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
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
  registerCard: {
    width: '95%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    maxWidth: 450,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDivider: {
    width: 50,
    height: 3,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
    borderRadius: 1.5,
  },
  formContainer: {
    marginTop: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  halfInput: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    paddingLeft: 3,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 50,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#333',
  },
  eyeButton: {
    padding: 6,
  },
  registerButton: {
    height: 52,
    backgroundColor: 'rgba(29, 139, 128, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#277bc4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 10,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(29, 139, 128, 0.9)',
  },
  decorativeElement1: {
    position: 'absolute',
    top: '12%',
    right: '8%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: '15%',
    left: '7%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  decorativeElement3: {
    position: 'absolute',
    top: '35%',
    left: '5%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(29, 139, 128, 0.83)',
  },
});

export default RegisterScreen;