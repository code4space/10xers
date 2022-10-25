import { useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDataItems, getTokens } from "../store/actions/collectionAction";
import Card from "../components/card";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => {
    return state.collectionReducer.items;
  });
  useEffect(() => {
    dispatch(getDataItems());
    dispatch(getTokens());
  }, [dispatch]);
  const renderItem = ({ item }) => <Card item={item} navigation={navigation} />;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.title}>COOL NFT</Text>
        <Text style={styles.subtitle}>
          Digital objects that represent tangible and intangible goods
        </Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginTop: 30,
    fontWeight: "bold",
    color: "#a749f0",
  },
  subtitle: {
    fontWeight: "light",
    color: "#df6df4",
    fontSize: 13,
    marginBottom: 20,
  },
});
