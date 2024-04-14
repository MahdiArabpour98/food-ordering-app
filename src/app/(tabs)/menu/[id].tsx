import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/productListItem";
import { useState } from "react";
import Button from "@/components/Button";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState("M");

  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn("added", selectedSize);
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectedSize === size ? "gainsboro" : "white" },
            ]}
          >
            <Text style={[styles.sizeText, { color: selectedSize === size ? "black" : "gray" }]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button onPress={addToCart} text="Add to cart" />
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
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
