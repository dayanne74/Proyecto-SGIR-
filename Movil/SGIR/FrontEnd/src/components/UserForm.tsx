// components/UserForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { User } from '../components/models/User';

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (user: Omit<User, '_id'>) => void;
  buttonText: string;
  disabled?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, buttonText, disabled }) => {
  const [formData, setFormData] = useState<Omit<User, '_id'>>({
    numeroDocumento: initialData?.numeroDocumento || '',
    nombre: initialData?.nombre || '',
    apellido: initialData?.apellido || '',
    correo: initialData?.correo || '',
    contrasena: initialData?.contrasena || '',
  });

  const [errors, setErrors] = useState<Partial<User>>({});

  const handleChange = (field: keyof User, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<User> = {};
    
    if (!formData.numeroDocumento) newErrors.numeroDocumento = 'Requerido';
    if (!formData.nombre) newErrors.nombre = 'Requerido';
    if (!formData.apellido) newErrors.apellido = 'Requerido';
    if (!formData.correo) {
      newErrors.correo = 'Requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido';
    }
    if (!formData.contrasena) {
      newErrors.contrasena = 'Requerido';
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'Mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.numeroDocumento && styles.errorInput]}
        placeholder="Número de Documento"
        value={formData.numeroDocumento}
        onChangeText={(text) => handleChange('numeroDocumento', text)}
      />
      {errors.numeroDocumento && <Text style={styles.errorText}>{errors.numeroDocumento}</Text>}

      <TextInput
        style={[styles.input, errors.nombre && styles.errorInput]}
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

      <TextInput
        style={[styles.input, errors.apellido && styles.errorInput]}
        placeholder="Apellido"
        value={formData.apellido}
        onChangeText={(text) => handleChange('apellido', text)}
      />
      {errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}

      <TextInput
        style={[styles.input, errors.correo && styles.errorInput]}
        placeholder="Correo"
        value={formData.correo}
        onChangeText={(text) => handleChange('correo', text)}
        keyboardType="email-address"
      />
      {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}

      <TextInput
        style={[styles.input, errors.contrasena && styles.errorInput]}
        placeholder="Contraseña"
        value={formData.contrasena}
        onChangeText={(text) => handleChange('contrasena', text)}
        secureTextEntry
      />
      {errors.contrasena && <Text style={styles.errorText}>{errors.contrasena}</Text>}

      <Button 
        title={buttonText} 
        onPress={handleSubmit} 
        disabled={disabled} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontSize: 12,
  },
});

export default UserForm;