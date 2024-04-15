import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/productListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/cartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  const { addItem } = useCart();

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
