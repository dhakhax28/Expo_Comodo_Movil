import React, { useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Cards1 from '../componets/Cards1'; // Asegúrate de que la ruta aquí sea correcta
import styles from '../estilos/ProductoScreenStyles';

const ProductoScreen = () => {
  const [searchText, setSearchText] = useState('');

  const products = [
    {
      title: 'Tenis Adidas',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://originalselsalvador.com/wp-content/uploads/2024/01/calzado-blazer-mid-77-vintage-nw30B2-min.png',
    },
    {
      title: 'Tenis Ardidas',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/calzado-air-force-1-07-jBrhbr.png',
    },
    {
      title: 'Tenis Kike',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022c7053-5c55-4bc4-8cdc-72c6e8f95a5e/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP.png',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c20afd60-b230-4815-bfd2-6768c875f6cd/calzado-air-force-1-07-J7xw5P.png',
    },
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus productos..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <Cards1 products={filteredProducts} />
    </ScrollView>
  );
};

export default ProductoScreen;
