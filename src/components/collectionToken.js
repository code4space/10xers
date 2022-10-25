import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataTokens } from "../store/actions/collectionAction";

export default function CollectionToken({ item, navigation }) {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => {
    return state.collectionReducer.tokens;
  });
  function ownedTokens(name) {
    name = name.split(" ");
    let result = tokens.filter((element) =>
      element.collection_json.includes(name[0])
    );
    return result.length;
  }

  useEffect(() => {
    dispatch(getDataTokens());
  }, [dispatch]);
  if (!tokens) {
    return <Text>loading</Text>;
  }
  return (
    <View>
      <View style={[styles.container, styles.shadow]}>
        <Image source={{ uri: item.image_url }} style={styles.card} />
        <View style={styles.tokenId}>
          <View style={styles.backgroundBlack} />
          <Image
            source={{
              uri: "https://www.pngmart.com/files/1/Transparent-Diamond-PNG.png",
            }}
            style={{ height: 20, width: 20, marginLeft: 5 }}
          ></Image>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 17,
              marginLeft: 6,
            }}
          >
            #{item.token_id}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 13,
  },
  card: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  shadow: {
    elevation: 4,
    shadowColor: "blue",
  },
  tokenId: {
    position: "absolute",
    flexDirection: "row",
    top: 160,
    left: 100,
    alignItems: "center",
  },
  backgroundBlack: {
    backgroundColor: "black",
    width: 90,
    height: 30,
    opacity: 0.8,
    position: "absolute",
    borderRadius: 20,
  },
});
