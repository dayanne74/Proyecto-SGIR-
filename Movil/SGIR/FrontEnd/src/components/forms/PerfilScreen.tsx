import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  KeyboardTypeOptions,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getToken } from '../../../services/AuthService';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
const PERFIL_API = 'http://192.168.0.8:9700/api/auth/perfil';
const UPDATE_API = 'http://192.168.0.8:9700/api/auth/updateProfile';

const { width } = Dimensions.get('window');
type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  Principal: undefined;
  ReservationForm: undefined;
  Contacto: undefined;
  sobrenosotros: undefined;
  Servicios: undefined;
  Reseñas: undefined;
  Privacidad: undefined;
  Terminos: undefined;
  PerfilScreen: undefined;
}
type Props = NativeStackScreenProps<RootStackParamList, "PerfilScreen">;
type Perfil = {
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  documento: string;
  telefono: string;
};

type ValidationErrors = Record<string, string>;

type ValidateResult = {
  isValid: boolean;
  errors: ValidationErrors;
};

type Field = {
  label: string;
  value: string;
  setter: (text: string) => void;
  editable: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon: string;
};

const PerfilScreen: React.FC<Props> = ({ navigation }) => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [documento, setDocumento] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [contrasenaActual, setContrasenaActual] = useState<string>('');
  const [nuevaContrasena, setNuevaContrasena] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => { 
    StatusBar.setBarStyle('light-content');
    fetchPerfil(); 
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPerfil();
    setRefreshing(false);
  };

  const fetchPerfil = async () => {
    const token = await getToken();
    if (!token) { Alert.alert('Error', 'No se encontró el token. Por favor, inicia sesión nuevamente.'); return; }
    setLoading(true);
    try {
      const response = await fetch(PERFIL_API, { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
      const data: Perfil = await response.json();
      if (response.ok) {
        setPerfil(data);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setCorreo(data.correo);
        setDocumento(data.documento);
        setTelefono(data.telefono);
      } else {
        Alert.alert('Error', (data as any).message || 'Problema al obtener perfil');
      }
    } catch {
      Alert.alert('Error', 'Hubo un problema al obtener el perfil');
    } finally { setLoading(false); }
  };

  const validateForm = (): ValidateResult => {
    const errors: ValidationErrors = {};
    let isValid = true;
    if (!nombre.trim()) { errors.nombre = 'El nombre es obligatorio'; isValid = false; }
    if (!apellido.trim()) { errors.apellido = 'El apellido es obligatorio'; isValid = false; }
    if (!correo.trim()) { errors.correo = 'El correo es obligatorio'; isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) { errors.correo = 'El correo no es válido'; isValid = false; }
    if (nuevaContrasena && nuevaContrasena !== confirmPassword) { errors.confirmPassword = 'Las contraseñas no coinciden'; isValid = false; }
    if (nuevaContrasena && !contrasenaActual) { errors.contrasenaActual = 'Se requiere la contraseña actual'; isValid = false; }
    return { isValid, errors };
  };

  const handleSave = async () => {
    const { isValid, errors } = validateForm();
    if (!isValid) { Alert.alert('Error de validación', Object.values(errors).join('\n')); return; }
    const token = await getToken();
    if (!token) { Alert.alert('Error', 'No se encontró el token. Por favor, inicia sesión nuevamente.'); return; }
    setLoading(true);
    try {
      const body: any = {
        nuevoNombre: nombre,
        nuevoApellido: apellido,
        nuevoEmail: correo,
        nuevoDocumento: documento,
        nuevoTelefono: telefono,
      };
      if (contrasenaActual && nuevaContrasena) {
        body.contrasenaActual = contrasenaActual;
        body.nuevaContrasena = nuevaContrasena;
      }
      const response = await fetch(UPDATE_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', result.message);
        setEditMode(false);
        setExpandedSection(null);
        setContrasenaActual('');
        setNuevaContrasena('');
        setConfirmPassword('');
        fetchPerfil();
      } else {
        Alert.alert('Error', result.message || 'Problema al actualizar perfil');
      }
    } catch {
      Alert.alert('Error', 'Hubo un problema al actualizar el perfil');
    } finally { setLoading(false); }
  };

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0984e3" />
      <Text style={styles.loadingText}>Cargando datos...</Text>
    </View>
  );

  if (!perfil) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>No se encontró la información del perfil.</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchPerfil}>
        <Text style={styles.retryButtonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );

  const options = [
    { key: 'info', icon: 'person-outline', label: 'Información Personal' },
    { key: 'history', icon: 'time-outline', label: 'Historial de Reservas' },
    { key: 'support', icon: 'help-circle-outline', label: 'Ayuda y Soporte' },
  ];

  const personalFields: Field[] = [
    { label: 'Nombre', value: nombre, setter: setNombre, editable: editMode, keyboardType: 'default', icon: 'person-outline' },
    { label: 'Apellido', value: apellido, setter: setApellido, editable: editMode, keyboardType: 'default', icon: 'people-outline' },
    { label: 'Usuario', value: perfil.usuario, setter: () => {}, editable: false, icon: 'at-outline' },
    { label: 'Correo', value: correo, setter: setCorreo, editable: editMode, keyboardType: 'email-address', icon: 'mail-outline' },
    { label: 'Documento', value: documento, setter: setDocumento, editable: editMode, keyboardType: 'default', icon: 'card-outline' },
    { label: 'Teléfono', value: telefono, setter: setTelefono, editable: editMode, keyboardType: 'phone-pad', icon: 'call-outline' },
  ];

  const passwordFields = [
    { label: 'Contraseña Actual', value: contrasenaActual, setter: setContrasenaActual, required: nuevaContrasena, icon: 'lock-closed-outline' },
    { label: 'Nueva Contraseña', value: nuevaContrasena, setter: setNuevaContrasena, required: false, icon: 'key-outline' },
    { label: 'Confirmar Contraseña', value: confirmPassword, setter: setConfirmPassword, required: false, icon: 'checkmark-circle-outline' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0984e3', '#74b9ff']}
        style={styles.gradientHeader}
      >
        <View style={styles.headerContent}>
          <View style={styles.initialsBadge}>
            <Text style={styles.initialsText}>{perfil.nombre.charAt(0)}{perfil.apellido.charAt(0)}</Text>
          </View>
          <Text style={styles.profileName}>{perfil.nombre} {perfil.apellido}</Text>
          <View style={styles.usernameBadge}>
            <Ionicons name="at-outline" size={14} color="#0984e3" />
            <Text style={styles.usernameText}>{perfil.usuario}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0984e3']} />}
      >
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Mi Cuenta</Text>
            <Text style={styles.profileEmail}>{perfil.correo}</Text>
          </View>

          <View style={styles.accordionContainer}>
            {options.map(opt => (
              <View key={opt.key} style={[
                styles.accordionWrapper,
                expandedSection === opt.key && styles.expandedAccordion
              ]}>
                <TouchableOpacity
                  style={[styles.accordionHeader, expandedSection === opt.key && styles.accordionHeaderActive]}
                  onPress={() => setExpandedSection(prev => (prev === opt.key ? null : opt.key))}
                >
                  <View style={styles.accordionIconWrapper}>
                    <Ionicons name={opt.icon as any} size={22} color="#fff" />
                  </View>
                  <Text style={styles.accordionLabel}>{opt.label}</Text>
                  <Ionicons
                    name={expandedSection === opt.key ? 'chevron-up-outline' : 'chevron-down-outline'}
                    size={20} color="#95a5a6" />
                </TouchableOpacity>

                {expandedSection === 'info' && opt.key === 'info' && (
                  <View style={styles.accordionContent}>
                    {personalFields.map(field => (
                      <View key={field.label} style={styles.fieldContainer}>
                        <Text style={styles.label}>
                          {field.label}
                          {editMode && field.editable && <Text style={styles.requiredMark}>*</Text>}
                        </Text>
                        <View style={styles.inputWrapper}>
                          <Ionicons name={field.icon as any} size={20} color="#0984e3" style={styles.inputIcon} />
                          <TextInput
                            style={[
                              styles.input, 
                              !field.editable && styles.readOnly, 
                              editMode && field.editable && styles.editableInput
                            ]}
                            value={field.value}
                            onChangeText={field.setter}
                            editable={field.editable}
                            keyboardType={field.keyboardType}
                            placeholderTextColor="#b2bec3"
                            placeholder={`Ingrese ${field.label.toLowerCase()}`}
                          />
                        </View>
                      </View>
                    ))}
                    
                    {editMode && (
                      <View style={styles.passwordSection}>
                        <View style={styles.sectionHeader}>
                          <Ionicons name="lock-closed-outline" size={20} color="#0984e3" />
                          <Text style={styles.passwordSectionTitle}>Cambiar Contraseña</Text>
                        </View>
                        <View style={styles.separator} />
                        
                        {passwordFields.map(field => (
                          <View key={field.label} style={styles.fieldContainer}>
                            <Text style={styles.label}>
                              {field.label}
                              {field.required && <Text style={styles.requiredMark}>*</Text>}
                            </Text>
                            <View style={styles.inputWrapper}>
                              <Ionicons name={field.icon as any} size={20} color="#0984e3" style={styles.inputIcon} />
                              <TextInput
                                style={styles.input}
                                value={field.value}
                                onChangeText={field.setter}
                                secureTextEntry
                                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                placeholderTextColor="#b2bec3"
                              />
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    <View style={styles.buttonContainer}>
                      {editMode ? (
                        <>
                          <TouchableOpacity style={[styles.button, styles.saveBtn]} onPress={handleSave}>
                            <Ionicons name="save-outline" size={20} color="#fff" />
                            <Text style={styles.btnText}>Guardar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.button, styles.cancelBtn]} 
                            onPress={() => { 
                              setEditMode(false); 
                              setNombre(perfil.nombre); 
                              setApellido(perfil.apellido); 
                              setCorreo(perfil.correo); 
                              setDocumento(perfil.documento); 
                              setTelefono(perfil.telefono); 
                              setContrasenaActual(''); 
                              setNuevaContrasena(''); 
                              setConfirmPassword(''); 
                            }}
                          >
                            <Ionicons name="close-outline" size={20} color="#fff" />
                            <Text style={styles.btnText}>Cancelar</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)}>
                          <Ionicons name="pencil-outline" size={20} color="#fff" />
                          <Text style={styles.btnText}>Editar</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}

                {expandedSection === 'history' && opt.key === 'history' && (
                  <View style={styles.accordionContent}>
                    <View style={styles.noDataContainer}>
                      <Ionicons name="calendar" size={50} color="#b2bec3" />
                      <Text style={styles.noDataText}>No hay reservas recientes</Text>
                      <TouchableOpacity style={styles.newReservationButton}>
                        <Text style={styles.newReservationText}>Hacer una reserva</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {expandedSection === 'support' && opt.key === 'support' && (
                  <View style={styles.accordionContent}>
                    <View style={styles.supportWrapper}>
                      {[
                        { icon: 'chatbubble-ellipses-outline', title: 'Chat de soporte', desc: 'Conversación en vivo con un agente' },
                        { icon: 'mail-outline', title: 'Correo electrónico', desc: 'soporte@empresa.com' },
                        { icon: 'call-outline', title: 'Línea telefónica', desc: '01 8000 123 456' },
                      ].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.supportItem}>
                          <View style={styles.supportIconContainer}>
                            <Ionicons name={item.icon as any} size={24} color="#0984e3" />
                          </View>
                          <View style={styles.supportTextContainer}>
                            <Text style={styles.supportTitle}>{item.title}</Text>
                            <Text style={styles.supportDesc}>{item.desc}</Text>
                          </View>
                          <Ionicons name="chevron-forward" size={20} color="#95a5a6" />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Principal')}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.3</Text>
        </View>
        <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
      

      </ScrollView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,       // separa verticalmente del resto
  },
  
  logo: {
    width: 100,       // 50% del ancho de la pantalla
    height: 100,      // altura proporcional al ancho
  },
  gradientHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : 90,
    paddingBottom: 0,
  },
  headerContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f9fc',
    padding: 0,
    paddingTop: 10,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: -20,
    marginHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0984e3',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  initialsBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  initialsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#636e72',
  },
  usernameBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  usernameText: {
    fontSize: 14,
    color: '#0984e3',
    marginLeft: 4,
    fontWeight: '500',
  },
  accordionContainer: {
    paddingHorizontal: 16,
  },
  accordionWrapper: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expandedAccordion: {
    backgroundColor: '#fff',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  accordionHeaderActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
    backgroundColor: '#fff',
  },
  accordionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0984e3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accordionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  accordionContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#636e72',
  },
  requiredMark: {
    color: '#e74c3c',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 15,
  },
  readOnly: {
    backgroundColor: '#f7f9fc',
    color: '#636e72',
  },
  editableInput: {
    borderColor: '#0984e3',
    backgroundColor: '#f8faff',
  },
  passwordSection: {
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: '#f8faff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e3f2fd',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#dfe6e9',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0984e3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 120,
  },
  saveBtn: {
    backgroundColor: '#27ae60',
  },
  cancelBtn: {
    backgroundColor: '#e74c3c',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  noDataContainer: {
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 12,
    marginBottom: 16,
  },
  newReservationButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  newReservationText: {
    color: '#fff',
    fontWeight: '500',
  },
  supportWrapper: {
    marginVertical: 8,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
  },
  supportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  supportTextContainer: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2d3436',
    marginBottom: 2,
  },
  supportDesc: {
    fontSize: 13,
    color: '#636e72',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#95a5a6',
  },
});

export default PerfilScreen;