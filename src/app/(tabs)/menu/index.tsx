import { FlatList, View } from "react-native";
import products from "@assets/data/products";
import ProductListItems from "@components/productListItem";

export default function TabOneScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item, index }) => <ProductListItems product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
