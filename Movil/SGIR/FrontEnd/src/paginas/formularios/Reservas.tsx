import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";


const ReservationForm = () => {
  
  const [serviceType, setServiceType] = useState("");
  const [destinations, setDestinations] = useState<{ nombre: string; precio: number }[]>([]);
  const [hotels, setHotels] = useState<{ nombre: string; ubicacion: string; precio: number }[]>([]);
  const [comidas, setComidas] = useState<{ nombre: string; precio: number }[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedComida, setSelectedComida] = useState<string | null>(null);
  const [numPeople, setNumPeople] = useState("1");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Destinos: renombramos precioBase a precio
        const destinationsRes = await fetch("http://192.168.0.8:9700/api/destinos");
        const destinosRaw = await destinationsRes.json();
        const destinos = destinosRaw.map((d: any) => ({
          nombre: d.nombre,
          precio: d.precioBase,
        }));
        setDestinations(destinos);

        // Hoteles: ya vienen con precio
        const hotelsRes = await fetch("http://192.168.0.8:9700/api/hotels");
        const hotelsData = await hotelsRes.json();
        setHotels(hotelsData);

        // Comidas: ya vienen con precio
        const comidaRes = await fetch("http://192.168.0.8:9700/api/comida");
        const comidaData = await comidaRes.json();
        setComidas(comidaData);
      } catch (error) {
        Alert.alert("Error de conexión", "No se pudieron cargar los datos. Comprueba tu conexión e inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedDestination, selectedHotel, selectedComida, numPeople]);

  const calculateTotal = () => {
    const people = parseInt(numPeople) || 1;

    const hotelPrice = selectedHotel
      ? (hotels.find(h => h.nombre === selectedHotel)?.precio || 0) * people
      : 0;

    const comidaPrice = selectedComida
      ? (comidas.find(c => c.nombre === selectedComida)?.precio || 0) * people
      : 0;

    const travelPrice = selectedDestination
      ? (destinations.find(d => d.nombre === selectedDestination)?.precio || 0) * people
      : 0;

    setTotalPrice(hotelPrice + comidaPrice + travelPrice);
  };

  const handleReserve = () => {
    // Validación básica
    if (!serviceType) {
      Alert.alert("Información incompleta", "Por favor selecciona un tipo de servicio.");
      return;
    }

    if ((serviceType === "paquete" || serviceType === "excursion") && !selectedDestination) {
      Alert.alert("Información incompleta", "Por favor selecciona un destino.");
      return;
    }

    const reservaData = {
      servicio: serviceType,
      destino: selectedDestination,
      hotel: selectedHotel,
      comida: selectedComida,
      numeroPersonas: numPeople,
      precioTotal: totalPrice,
      fechaReserva: new Date().toISOString(),
    };

    setLoading(true);

    fetch("http://192.168.0.8:9700/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaData),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert(
          "Reserva Confirmada", 
          "Tu experiencia ha sido reservada exitosamente. Recibirás un correo con los detalles.",
          [{ text: "Excelente", style: "default" }]
        );
        
        // Resetear formulario
        setServiceType("");
        setSelectedDestination(null);
        setSelectedHotel(null);
        setSelectedComida(null);
        setNumPeople("1");
        setTotalPrice(0);
      })
      .catch((error) => {
        Alert.alert("Error en la reserva", "No pudimos procesar tu solicitud. Por favor intenta nuevamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={styles.loadingText}>Cargando opciones...</Text>
      </View>
    );
  }

  const formatCurrency = (amount: number = 0) => {
    return "$" + amount.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reserva tu experiencia</Text>
          <Text style={styles.subtitle}>Personaliza tu viaje ideal</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>¿Qué estás buscando?</Text>
          <View style={styles.optionsContainer}>
            {[
              { key: "hotel", icon: "bed", label: "HOTEL" },
              { key: "excursion", icon: "compass", label: "EXCURSIÓN" },
              { key: "paquete", icon: "gift", label: "PAQUETE" }
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.optionButton,
                  serviceType === option.key && styles.selectedOption
                ]}
                onPress={() => setServiceType(option.key)}
              >
                <Ionicons 
                  name={option.icon as any} 
                  size={24} 
                  color={serviceType === option.key ? "#ffffff" : "#0056b3"} 
                />
                <Text 
                  style={[
                    styles.optionText,
                    serviceType === option.key && styles.selectedOptionText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {serviceType && (
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Ionicons 
                name={
                  serviceType === "hotel" 
                    ? "bed" 
                    : serviceType === "excursion" 
                    ? "compass" 
                    : "gift"
                } 
                size={24} 
                color="#ffffff" 
              />
              <Text style={styles.formHeaderText}>
                {serviceType === "hotel" ? "Reserva de Hospedaje" : 
                 serviceType === "excursion" ? "Planifica tu Excursión" : 
                 "Configura tu Paquete"}
              </Text>
            </View>

            <View style={styles.formBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Número de personas</Text>
                <View style={styles.numberInputContainer}>
                  <TouchableOpacity 
                    style={styles.numberButton}
                    onPress={() => {
                      const currentNum = parseInt(numPeople) || 1;
                      if (currentNum > 1) setNumPeople((currentNum - 1).toString());
                    }}
                  >
                    <Text style={styles.numberButtonText}>−</Text>
                  </TouchableOpacity>
                  
                  <TextInput
                    style={styles.numberInput}
                    keyboardType="numeric"
                    value={numPeople}
                    onChangeText={(text) => {
                      // Solo permite números
                      const filtered = text.replace(/[^0-9]/g, '');
                      setNumPeople(filtered || "1");
                    }}
                  />
                  
                  <TouchableOpacity 
                    style={styles.numberButton}
                    onPress={() => {
                      const currentNum = parseInt(numPeople) || 1;
                      setNumPeople((currentNum + 1).toString());
                    }}
                  >
                    <Text style={styles.numberButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {(serviceType === "paquete" || serviceType === "excursion") && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Destino</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedDestination}
                        onValueChange={(itemValue) => {
                          setSelectedDestination(itemValue);
                          setSelectedHotel(null); // Reset hotel selection when destination changes
                        }}
                        style={styles.picker}
                        dropdownIconColor="#0056b3"
                      >
                        <Picker.Item label="Selecciona un destino" value={null} />
                        {destinations.map((dest, index) => (
                          <Picker.Item key={index} label={`${dest.nombre} (${formatCurrency(dest.precio)})`} value={dest.nombre} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  {selectedDestination && (
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Alojamiento</Text>
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={selectedHotel}
                          onValueChange={(itemValue) => setSelectedHotel(itemValue)}
                          style={styles.picker}
                          dropdownIconColor="#0056b3"
                        >
                          <Picker.Item label="Selecciona un hotel" value={null} />
                          {hotels
                            .filter((hotel) => hotel.ubicacion === selectedDestination)
                            .map((hotel, index) => (
                              <Picker.Item 
                                key={index} 
                                label={`${hotel.nombre} (${formatCurrency(hotel.precio)})`} 
                                value={hotel.nombre} 
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>
                  )}
                </>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Plan de comidas</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedComida}
                    onValueChange={(itemValue) => setSelectedComida(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#0056b3"
                  >
                    <Picker.Item label="Selecciona un plan de comidas" value={null} />
                    {comidas.map((comida, index) => (
                      <Picker.Item 
                        key={index} 
                        label={`${comida.nombre} (${formatCurrency(comida.precio)})`} 
                        value={comida.nombre} 
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.summarySection}>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL:</Text>
                <Text style={styles.totalAmount}>{formatCurrency(totalPrice)}</Text>
              </View>

              <TouchableOpacity 
                style={styles.reserveButton} 
                onPress={handleReserve}
                disabled={totalPrice === 0}
              >
                <Text style={styles.reserveText}>CONFIRMAR RESERVA</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    paddingTop:70,
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#0056b3",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#0056b3",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    backgroundColor: "#e6f0ff",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: "31%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d0e1ff",
  },
  selectedOption: {
    backgroundColor: "#0056b3",
    borderColor: "#0056b3",
  },
  optionText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0056b3",
    marginTop: 5,
  },
  selectedOptionText: {
    color: "#ffffff",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  formHeader: {
    backgroundColor: "#0056b3",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  formHeaderText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  formBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 8,
  },
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d0e1ff",
    borderRadius: 10,
    overflow: "hidden",
  },
  numberButton: {
    backgroundColor: "#e6f0ff",
    padding: 12,
    width: 50,
    alignItems: "center",
  },
  numberButtonText: {
    fontSize: 20,
    color: "#0056b3",
    fontWeight: "bold",
  },
  numberInput: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#003366",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d0e1ff",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f5f9ff",
  },
  picker: {
    height: 50,
    color: "#003366",
  },
  summarySection: {
    padding: 20,
    backgroundColor: "#f5f9ff",
  },
  divider: {
    height: 1,
    backgroundColor: "#d0e1ff",
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0056b3",
  },
  reserveButton: {
    backgroundColor: "#0056b3",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  reserveText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  }
});

export default ReservationForm;