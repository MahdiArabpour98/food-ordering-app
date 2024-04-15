import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/providers/cartProvider";
import CartListItem from "@/components/cartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      <Text style={styles.total}>Total: {total}</Text>
      <Button text="Checkout" />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
});
