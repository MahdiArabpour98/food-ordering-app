import { View } from "react-native";
import products from "@/assets/data/products";
import ProductListItems from "@/components/productListItem";

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItems product={products[0]} />
      <ProductListItems product={products[1]} />
    </View>
  );
}
