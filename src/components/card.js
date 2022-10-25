import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataTokens } from "../store/actions/collectionAction";

export default function Card({ item, navigation }) {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => {
    return state.collectionReducer.tokens;
  });
  const goToDetails = () => {
    navigation.navigate("detail", {
      id: item.id,
    });
  };

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
      <TouchableHighlight
        style={[styles.card, styles.shadow]}
        onPress={goToDetails}
      >
        <View>
          <Image
            source={{
              uri: item.banner_image_url,
            }}
            style={styles.image}
            blurRadius={5}
          />
          <Image style={styles.darken} />
          <Image
            source={{
              uri: item.image_url,
            }}
            style={styles.profile}
          />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.total}>{ownedTokens(item.name)} Owned</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 150,
    borderRadius: 20,
    marginVertical: 15,
  },
  shadow: {
    elevation: 4,
    shadowColor: "blue",
  },
  image: {
    width: 400,
    height: 150,
    borderRadius: 20,
  },
  darken: {
    width: 400,
    height: 150,
    borderRadius: 20,
    backgroundColor: "black",
    opacity: 0.4,
    position: "absolute",
  },
  profile: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 30,
    left: 20,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 20,
  },
  name: {
    position: "absolute",
    top: 30,
    left: 130,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    borderColor: "black",
    textShadowColor: "#585858",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 0.3,
  },
  total: {
    position: "absolute",
    top: 80,
    left: 130,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "black",
    textShadowColor: "#585858",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 0.3,
  },
});
