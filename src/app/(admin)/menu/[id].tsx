import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/productListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/cartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ProductDetailsScreen = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
