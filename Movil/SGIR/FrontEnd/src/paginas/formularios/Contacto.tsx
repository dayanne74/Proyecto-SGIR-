import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ImageBackground } from "react-native";
import axios from "axios";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!nombre || !correo || !asunto || !mensaje) {
      Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
      return;
    }

    // Ajustamos el objeto para que coincida con lo que espera el backend
    const contactoData = {
      nombre_apellido: nombre, // Corregido: Se envía como 'nombre_apellido'
      correo,
      asunto,
      mensaje,
      fechaActual: new Date().toISOString().slice(0, 10), // Corregido: Se envía como 'fechaActual'
    };

    try {
      setLoading(true);
      await axios.post("http://192.168.0.8:9700/api/contactos", contactoData);
      Alert.alert("Éxito", "Tu mensaje ha sido enviado.");
      resetForm();
    } catch (error) {
      console.error("Error al enviar contacto:", error);
      Alert.alert("Error", "Hubo un problema al enviar tu mensaje.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNombre("");
    setCorreo("");
    setAsunto("");
    setMensaje("");
  };

  return (
    <ImageBackground
      source={require("../../assets/contactofondo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Contáctanos</Text>

              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor="#ccc"
                value={nombre}
                onChangeText={setNombre}
              />

              <Text style={styles.label}>Correo:</Text>
              <TextInput
                style={styles.input}
                placeholder="tu@correo.com"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
              />

              <Text style={styles.label}>Asunto:</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Escribe tu asunto aquí..."
                placeholderTextColor="#ccc"
                multiline
                numberOfLines={4}
                value={asunto}
                onChangeText={setAsunto}
              />

              <Text style={styles.label}>Mensaje:</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Escribe tu mensaje aquí..."
                placeholderTextColor="#ccc"
                multiline
                numberOfLines={4}
                value={mensaje}
                onChangeText={setMensaje}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: "cover",
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  container: {
    padding: 20,
    paddingTop: 145, // Agregado padding superior para evitar que la cámara tape el contenido
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#fff",
    marginTop: 5,
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
    letterSpacing: 1.5,
  },
  button: {
    backgroundColor: "deepskyblue",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Contacto;