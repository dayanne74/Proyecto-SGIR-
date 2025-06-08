// ------------------------
// INTERFAZ DEL COMENTARIO  
// ------------------------
interface Comentario {
    _id: string;
    nombreCompleto: string;
    valoracion: string;
    opinion: string;
    fecha?: string; // Añadido para mostrar cuándo se publicó el comentario
  }
  
  // ------------------------
  // COMPONENTE: ReseñasViajeros
  // ------------------------
  import React, { useState, useEffect } from 'react';
  import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    Alert, 
    ActivityIndicator, 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    ScrollView
  } from 'react-native';
  import axios from 'axios';
  import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar expo/vector-icons si no lo tienes
  
  const ReseñasViajeros: React.FC = () => {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [valoracion, setValoracion] = useState("");
    const [opinion, setOpinion] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // URL de la API
    const API_URL = "http://192.168.0.8:9700/api/comentarios";
  
    // Cargar todos los comentarios de la API
    const cargarComentarios = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Comentario[]>(API_URL);
        setComentarios(res.data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar las reseñas de viajeros");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      cargarComentarios();
    }, []);
  
    // Colores para los avatares
    const avatarColors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572', '#5352ED',
      '#20BF55', '#FC5C65', '#FD9644', '#2E86DE', '#8854D0'
    ];
  
    // Obtener un color basado en el nombre
    const getColorForName = (name: string) => {
      const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return avatarColors[sum % avatarColors.length];
    };
  
    // Renderizar estrellas basadas en la valoración
    const renderEstrellas = (valoracion: string) => {
      // Extraer el número de la valoración (suponiendo formato "X estrellas")
      const numEstrellas = parseInt(valoracion.split(' ')[0]) || 0;
      
      return (
        <View style={styles.estrellas}>
          {[1, 2, 3, 4, 5].map((num) => (
            <Ionicons 
              key={num}
              name={num <= numEstrellas ? "star" : "star-outline"} 
              size={18} 
              color={num <= numEstrellas ? "#FFD700" : "#CCCCCC"} 
              style={styles.estrella}
            />
          ))}
        </View>
      );
    };
  
    // Enviar o actualizar comentario
    const enviarComentario = async () => {
      if (!nombreCompleto || !valoracion || !opinion) {
        return Alert.alert("Campos incompletos", "Por favor completa todos los campos para compartir tu experiencia");
      }
      
      try {
        setLoading(true);
        if (editingId) {
          // Actualizar comentario (PUT)
          await axios.put(`${API_URL}/${editingId}`, {
            nombreCompleto,
            valoracion,
            opinion,
          });
          setEditingId(null);
        } else {
          // Crear comentario (POST)
          await axios.post(API_URL, { 
            nombreCompleto, 
            valoracion, 
            opinion,
            fecha: new Date().toISOString() // Guardar la fecha actual
          });
        }
        
        // Limpiar campos del formulario
        setNombreCompleto("");
        setValoracion("");
        setOpinion("");
        cargarComentarios();
        
        Alert.alert(
          "¡Gracias por tu opinión!", 
          editingId ? "Tu reseña ha sido actualizada." : "Tu experiencia ha sido compartida con éxito."
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo procesar tu reseña. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
  
    // Preparar formulario para editar un comentario
    const editarComentario = (item: Comentario) => {
      setEditingId(item._id);
      setNombreCompleto(item.nombreCompleto);
      setValoracion(item.valoracion);
      setOpinion(item.opinion);
    };
  
    // Eliminar comentario
    const eliminarComentario = async (id: string) => {
      Alert.alert(
        "Eliminar reseña",
        "¿Estás seguro de que deseas eliminar esta reseña?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Eliminar", 
            style: "destructive",
            onPress: async () => {
              try {
                setLoading(true);
                await axios.delete(`${API_URL}/${id}`);
                cargarComentarios();
              } catch (error) {
                Alert.alert("Error", "No se pudo eliminar la reseña");
              } finally {
                setLoading(false);
              }
            }
          }
        ]
      );
    };
  
    // Función para formatear la fecha
    const formatearFecha = (fechaISO?: string) => {
      if (!fechaISO) return "";
      
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
      });
    };
  
    const opcionesValoracion = [
      "1 estrella", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"
    ];
  
    // URL de la imagen de fondo para el banner de turismo (bus turístico)
    const bannerBackgroundUrl = "https://img.freepik.com/free-photo/tourist-bus-road_1127-3076.jpg";
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#00264D" />
        
        <ScrollView style={styles.container}>
          {/* Banner de cabecera con imagen de bus turístico */}
          <ImageBackground
            source={{ uri: bannerBackgroundUrl }}
            style={styles.banner}
            resizeMode="cover"
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerContent}>
              <Ionicons name="bus" size={40} color="#FFFFFF" />
              <Text style={styles.mainTitle}>Reseñas de Viajeros</Text>
              <Text style={styles.subtitle}>Tu opinión nos mueve hacia la excelencia</Text>
            </View>
          </ImageBackground>
          
          {/* Formulario de comentario */}
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Ionicons name="create" size={22} color="#FFFFFF" />
              <Text style={styles.formTitle}>
                {editingId ? "Editar experiencia" : "Comparte tu experiencia"}
              </Text>
            </View>
            
            <View style={styles.formBody}>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
                placeholderTextColor="#888"
              />
              
              <Text style={styles.labelText}>Tu valoración</Text>
              <View style={styles.ratingSelector}>
                {opcionesValoracion.map((opcion, index) => {
                  const num = index + 1;
                  return (
                    <TouchableOpacity 
                      key={opcion}
                      style={[
                        styles.ratingOption,
                        valoracion === opcion && styles.selectedRating
                      ]}
                      onPress={() => setValoracion(opcion)}
                    >
                      <Ionicons 
                        name={valoracion === opcion ? "star" : "star-outline"} 
                        size={24} 
                        color={valoracion === opcion ? "#FFFFFF" : "#666666"} 
                      />
                      <Text style={[
                        styles.ratingText,
                        valoracion === opcion && styles.selectedRatingText
                      ]}>
                        {num}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              <TextInput
                style={styles.textArea}
                placeholder="Describe tu experiencia de viaje con nosotros..."
                value={opinion}
                onChangeText={setOpinion}
                multiline
                numberOfLines={4}
                placeholderTextColor="#888"
              />
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={enviarComentario}
                  disabled={loading}
                >
                  <Ionicons name={editingId ? "save" : "send"} size={20} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.submitButtonText}>
                    {editingId ? "Actualizar reseña" : "Publicar reseña"}
                  </Text>
                </TouchableOpacity>
                
                {editingId && (
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setEditingId(null);
                      setNombreCompleto("");
                      setValoracion("");
                      setOpinion("");
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#666666" style={styles.buttonIcon} />
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          
          {/* Lista de comentarios */}
          <View style={styles.commentsContainer}>
            <View style={styles.commentsHeaderContainer}>
              <Ionicons name="people" size={24} color="#00356B" />
              <Text style={styles.commentsTitle}>
                {comentarios.length > 0 
                  ? `${comentarios.length} opiniones de viajeros` 
                  : "Sé el primero en compartir tu experiencia"}
              </Text>
            </View>
            
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={50} color="#F48024" />
                <Text style={styles.loadingText}>Cargando reseñas...</Text>
              </View>
            )}
            
            <FlatList
              data={comentarios}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                // Alternancia de colores
                const isEven = index % 2 === 0;
                const cardColor = isEven ? '#FFFFFF' : '#F0F7FF';
                const avatarColor = getColorForName(item.nombreCompleto);
                
                return (
                  <View style={[styles.commentCard, { backgroundColor: cardColor }]}>
                    <View style={styles.commentHeader}>
                      <View style={styles.userInfo}>
                        <View style={[styles.avatarCircle, { backgroundColor: avatarColor }]}>
                          <Text style={styles.avatarText}>
                            {item.nombreCompleto.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.commentUser}>{item.nombreCompleto}</Text>
                          <Text style={styles.commentDate}>{formatearFecha(item.fecha)}</Text>
                        </View>
                      </View>
                      {renderEstrellas(item.valoracion)}
                    </View>
                    
                    <Text style={styles.commentText}>{item.opinion}</Text>
                    
                    <View style={styles.commentActions}>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => editarComentario(item)}
                      >
                        <View style={[styles.actionBubble, { backgroundColor: '#00356B' }]}>
                          <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                        </View>
                        <Text style={styles.actionButtonText}>Editar</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => eliminarComentario(item._id)}
                      >
                        <View style={[styles.actionBubble, { backgroundColor: '#E63946' }]}>
                          <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.actionButtonText, styles.deleteText]}>
                          Eliminar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={
                !loading ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="bus-outline" size={80} color="#CCCCCC" />
                    <Text style={styles.emptyText}>
                      No hay reseñas disponibles. ¡Sé el primero en compartir tu experiencia de viaje!
                    </Text>
                  </View>
                ) : null
              }
            />
          </View>
          
          {/* Footer decorativo con tema de turismo */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tu opinión impulsa nuestros servicios
            </Text>
            <View style={styles.footerIcons}>
              <Ionicons name="bus" size={18} color="#FFFFFF" style={styles.footerIcon} />
              <Ionicons name="map" size={18} color="#FFFFFF" style={styles.footerIcon} />
              <Ionicons name="compass" size={18} color="#FFFFFF" style={styles.footerIcon} />
              <Ionicons name="location" size={18} color="#FFFFFF" style={styles.footerIcon} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // ------------------------
  // ESTILOS
  // ------------------------
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F7F9FC',
      paddingTop: StatusBar.currentHeight || 40, // Espacio adicional para evitar la cámara
    },
    container: {
      flex: 1,
    },
    banner: {
      height: 200,
      position: 'relative',
      marginBottom: 20,
    },
    bannerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 36, 77, 0.7)', // Color azul oscuro semi-transparente
    },
    bannerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    mainTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 10,
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    subtitle: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
      marginTop: 5,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1,
    },
    formContainer: {
      margin: 16,
      borderRadius: 15,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      overflow: 'hidden',
      marginBottom: 24,
    },
    formHeader: {
      backgroundColor: '#F48024', // Color naranja relacionado con turismo
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    formTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: 10,
    },
    formBody: {
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D1E3F0',
      borderRadius: 12,
      padding: 14,
      marginBottom: 16,
      fontSize: 16,
      backgroundColor: '#F8FAFC',
      color: '#333',
    },
    labelText: {
      fontSize: 15,
      color: '#00356B',
      marginBottom: 10,
      fontWeight: '600',
    },
    ratingSelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    ratingOption: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D1D1D1',
    },
    selectedRating: {
      backgroundColor: '#F48024',
      borderColor: '#F48024',
    },
    ratingText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#666',
      marginTop: 2,
    },
    selectedRatingText: {
      color: '#FFFFFF',
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#D1E3F0',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: '#F8FAFC',
      height: 120,
      textAlignVertical: 'top',
      color: '#333',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    submitButton: {
      backgroundColor: '#00A896', // Verde turquesa
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      
    },
    buttonIcon: {
      marginRight: 8,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButton: {
      backgroundColor: '#E6E6E6',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      flex: 0.4,
    },
    cancelButtonText: {
      color: '#666666',
      fontSize: 14,
      fontWeight: '500',
    },
    commentsContainer: {
      padding: 16,
      paddingTop: 0,
    },
    commentsHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    commentsTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#00356B',
      marginLeft: 10,
    },
    loadingContainer: {
      alignItems: 'center',
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      color: '#666',
      fontSize: 14,
    },
    commentCard: {
      borderRadius: 15,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      borderLeftWidth: 6,
      borderLeftColor: '#00356B', // Azul relacionado con viajes
    },
    commentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatarCircle: {
      width: 45,
      height: 45,
      borderRadius: 23,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      elevation: 3,
    },
    avatarText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
    },
    commentUser: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
    },
    commentDate: {
      fontSize: 12,
      color: '#666',
      marginTop: 2,
    },
    estrellas: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    estrella: {
      marginLeft: 2,
    },
    commentText: {
      fontSize: 15,
      lineHeight: 22,
      color: '#333',
      marginBottom: 16,
    },
    commentActions: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#EFEFEF',
      paddingTop: 12,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      padding: 4,
    },
    actionBubble: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6,
    },
    actionButtonText: {
      fontSize: 14,
      color: '#333',
      fontWeight: '500',
    },
    deleteText: {
      color: '#E63946',
    },
    emptyContainer: {
      alignItems: 'center',
      padding: 30,
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    emptyText: {
      fontSize: 15,
      color: '#666',
      textAlign: 'center',
      lineHeight: 22,
      marginTop: 10,
    },
    footer: {
      backgroundColor: '#00356B',
      padding: 20,
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 10,
    },
    footerIcons: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerIcon: {
      marginHorizontal: 10,
    },
  });
  
  export default ReseñasViajeros;