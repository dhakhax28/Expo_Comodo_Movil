import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 42,
      backgroundColor: '#F8F9FA',
    },
    backButton: {
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 20,
      marginBottom: 20,
      resizeMode: 'cover',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    colorOptions: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    colorOption: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    sizeOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    sizeOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    sizeText: {
      fontSize: 16,
      color: '#333',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#333',
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
      color: '#666',
    },
    detailsContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    detailsLabel: {
      fontSize: 16,
      color: '#666',
    },
    detailsValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    addButton: {
      backgroundColor: '#3046BC',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    addButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    alerta: {
      backgroundColor: '#E0E0E0',
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignSelf: 'center',
      borderRadius: 10,
      position: 'absolute',
      top: 20,
      zIndex: 1,
    },
    alertaTexto: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  });

  export default styles;  