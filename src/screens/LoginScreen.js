import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,AppState, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import styles from '../estilos/LoginScreenStyles'; // Import styles from an external file
import Button3 from '../componets/Buttons/Button3';
import LogOut from '../componets/Buttons/LogOut';
import * as Constantes from '../utils/constantes'; 
import { useInactividadSesion } from '../componets/Hooks/inactividad.js';// Import constants, assuming you have IP in a constants file

const LoginScreen = ({ navigation }) => {
  const ip = Constantes.IP; // Define API IP
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const animatedValue = new Animated.Value(0); // State for logo animation
  const { panHandlers, handleLogout } = useInactividadSesion(); // Hook para manejar inactividad y logout
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice de la imagen actual
  const appState = useRef(AppState.currentState); // Referencia al estado de la aplicación


  useEffect(() => {
    // Looping animation configuration
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );

    // Start the animation
    animation.start();

    // Clean up the animation when the component unmounts
    return () => {
      animation.stop();
    };
  }, []);

  // Interpolation for vertical translation animation of the logo
  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0],
  });

  // Function to handle login
  const handleLogin = async () => {
    // Check if username or password is empty
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, complete los campos de usuario y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('UsuarioCliente', username); // Add username to form data
      formData.append('clave', password); // Add password to form data
      
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logIn`; // URL for the request
      console.log('URL solicitada:', url); // To verify the URL

      // Make the API request
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text(); // Get the response as text

      try {
        const data = JSON.parse(responseText); // Try to parse the response as JSON
        if (data.status) {
          // Clear the input fields after successful login
          setUsername('');
          setPassword('');
          navigation.navigate('DashboardTabs'); // Navigate to the dashboard tabs screen
        } else {
          showLoginErrorAlert(); // Show a custom alert in case of an error
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError);
        console.error('Respuesta recibida:', responseText);
        Alert.alert('Error', 'Ocurrió un error al procesar la respuesta del servidor');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  // Function to redirect to the registration screen
  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  // Function to redirect to the password recovery screen
  const handleForgotPasswordRedirect = () => {
    navigation.navigate('PasswordRecovery');
  };

 

  // Function to show login error alert
  const showLoginErrorAlert = () => {
    Alert.alert(
      'Error de inicio de sesión',
      'Usuario o contraseña incorrectos',
      [
        {
          text: 'OK',
          style: 'default',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert dismissed'),
      }
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../img/calentamiento.png')}
        style={[styles.logo, { transform: [{ translateY }] }]}
      />
      <Text style={styles.title}>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword} // Ensure the password is secure
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      
      <Button3 style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button3>
      
      <TouchableOpacity onPress={handleRegisterRedirect}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={handleForgotPasswordRedirect}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
