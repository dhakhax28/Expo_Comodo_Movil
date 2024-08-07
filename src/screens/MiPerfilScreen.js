import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../estilos/MiPerfilScreenStyles'; 
import * as Constantes from '../utils/constantes';
import InputMiPerfil from '../componets/Inputs/InputMiPerfil'; // Asegúrate de que esta ruta sea correcta

const MiPerfilScreen = () => {
  const ip = Constantes.IP;

  // Estados para los datos del perfil
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 13.6929,
    longitude: -89.2182,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [editando, setEditando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Referencias para los TextInput
  const nombreRef = useRef(null);
  const usernameRef = useRef(null);
  const correoRef = useRef(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);

  // Función para obtener y mostrar el perfil del usuario
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/cliente.php?action=readProfile`);
      const data = await response.json();

      console.log('Perfil Data:', data);

      if (data.status) {
        setNombre(data.dataset.nombre);
        setUsername(data.dataset.usuario);
        setCorreo(data.dataset.correo);
        setDireccion(data.dataset.direccion_cliente);
        setTelefono(data.dataset.telefono);

        // Utiliza Nominatim para obtener las coordenadas reales de la dirección
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.dataset.direccion_cliente)}`;
        const geoResponse = await fetch(url);
        const geoData = await geoResponse.json();

        console.log('Geocode Data:', geoData);

        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];
          const newRegion = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          console.log('New Region:', newRegion);
        } else {
          setRegion({
            latitude: 13.6929,
            longitude: -89.2182,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          console.log('Default Region:', region);
          Alert.alert('Error', 'No se encontró la ubicación');
        }
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para manejar la actualización de los datos del perfil
  const handleUpdate = async () => {
    try {
      // Crea un objeto con los datos del perfil
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', correo);
      formData.append('username', username);
      formData.append('telefono', telefono);
      formData.append('direccion', direccion);

      // URL de la API para actualizar el perfil
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=editProfile`;

      // Realiza la solicitud POST para actualizar el perfil
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseJson = await response.json();
      console.log('API Response:', responseJson); // Imprime la respuesta JSON

      // Manejo de la respuesta
      if (responseJson.status === 1) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
        setEditando(false); // Desactiva el modo de edición
      } else {
        // Muestra un mensaje de error si el perfil no se pudo actualizar
        Alert.alert('Error', responseJson.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      // Muestra un mensaje de error en caso de que ocurra un problema
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Función para manejar la cancelación y limpiar los campos
  const handleDelete = () => {
    setNombre('');
    setUsername('');
    setCorreo('');
    setDireccion('');
    setTelefono('');

    nombreRef.current.clear();
    usernameRef.current.clear();
    correoRef.current.clear();
    direccionRef.current.clear();
    telefonoRef.current.clear();
    setEditando(false);
    fetchProfile(); // Actualiza los datos del perfil al cancelar
  };

  // Función para obtener la dirección basada en las coordenadas
  const reverseGeocode = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log('Reverse Geocode Data:', data);

      if (data && data.address) {
        const address = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
        setDireccion(address);
      } else {
        Alert.alert('Error', 'No se encontró la dirección para esta ubicación');
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener la dirección');
    }
  };

  // Función para manejar el clic en el mapa para cambiar la ubicación
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (editando) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      reverseGeocode(latitude, longitude); // Actualiza la dirección basada en las nuevas coordenadas
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Datos personales</Text>

        {/* Contenedor para la imagen de perfil */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg' }}
            style={styles.profileImage}
          />
        </View>

        {/* Contenedor para el campo Nombre */}
        <InputMiPerfil
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          editable={editando}
          ref={nombreRef}
        />

        {/* Contenedor para el campo Usuario */}
        <InputMiPerfil
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          editable={editando}
          ref={usernameRef}
        />

        {/* Contenedor para el campo Correo */}
        <InputMiPerfil
          label="Correo"
          value={correo}
          onChangeText={setCorreo}
          editable={editando}
          ref={correoRef}
        />

        {/* Contenedor para el campo Teléfono */}
        <InputMiPerfil
          label="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          editable={editando}
          ref={telefonoRef}
        />

        {/* Contenedor para el campo Dirección */}
        <InputMiPerfil
          label="Dirección"
          value={direccion}
          onChangeText={setDireccion}
          editable={editando}
          ref={direccionRef}
        />

        {/* Contenedor para el mapa */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            <Marker coordinate={region} />
          </MapView>
        </View>

        {/* Contenedor para los botones */}
        <View style={styles.buttonContainer}>
          {editando ? (
            <>
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => setEditando(true)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MiPerfilScreen;
