import { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailItem,
  getDataTokens,
  getDataStats,
} from "../store/actions/collectionAction";
import { LineChart } from "react-native-chart-kit";
import CollectionToken from "../components/collectionToken";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation, route }) {
  const chartConfig = {
    barRadius: 0,
    backgroundGradientFrom: "#edf8ff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#7a77ff",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `#7a77ff`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const { id } = route.params;
  const dispatch = useDispatch();
  const detail = useSelector((state) => {
    return state.collectionReducer.detail;
  });
  const stats = useSelector((state) => {
    return state.collectionReducer.stats;
  });
  const tokens = useSelector((state) => {
    return state.collectionReducer.tokens;
  });
  const [statsLocal, setStatsLocal] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      dispatch(getDetailItem(id));
      dispatch(getDataTokens());
      dispatch(getDataStats(id)).then(() => {
        setLoading((state) => {
          return (state = false);
        });
        setStatsLocal((state) => {
          return (state = stats);
        });
      });
    }, [])
  );

  function roundTheNumber(number) {
    return Math.round(number * 10) / 10;
  }
  function getDataForChart(array) {
    let x = [];
    let y = [];
    let temp = "";
    for (let i = 0; i < 31 || i < array.length; i++) {
      temp = array[i].timestamp.split(" ");
      x.push(`${temp[0]}`);
      y.push(`${+array[i].floor_price_eth}`);
    }
    return { x, y };
  }
  function ownedTokens(name, select) {
    let result = tokens.filter((element) =>
      element.collection_json.includes(name)
    );
    if (select == "image") {
      return result;
    } else {
      return result.length;
    }
  }
  function getTextStyle(number) {
    if (number > 0) {
      return {
        color: "#399ae7",
      };
    }
    if (number < 0) {
      return {
        color: "#e04f60",
      };
    }
  }
  const renderItem = ({ item }) => (
    <CollectionToken item={item} navigation={navigation} />
  );
  if (loading || !stats.length) {
    return <ActivityIndicator size="large" color="red" />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Image
          source={{ uri: detail.banner_image_url }}
          style={styles.headerBackground}
          blurRadius={2}
        ></Image>
        <Text>{console.log(getDataForChart(stats))}</Text>
        <Image
          source={{ uri: detail.image_url }}
          style={styles.profile}
        ></Image>
      </View>
      <View style={styles.dataProfile}>
        <View style={styles.control}>
          <Text style={styles.title}>ITEMS</Text>
          <Text style={styles.description}>{ownedTokens(detail.name)}</Text>
        </View>
        <View style={styles.control}>
          <Text style={styles.title}>FLOOR</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 20, width: 20 }}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png",
              }}
            ></Image>
            <Text style={styles.description}>
              {roundTheNumber(detail.one_day_volume)}
            </Text>
          </View>
        </View>
        <View style={styles.control}>
          <Text style={styles.title}>TOTAL FLOOR</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 20, width: 20 }}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png",
              }}
            ></Image>
            <Text style={styles.descriptrion}>
              {roundTheNumber(detail.total_volume)}
            </Text>
          </View>
        </View>
        <View style={styles.control}>
          <Text style={styles.title}>1 DAY</Text>
          <Text style={getTextStyle(+roundTheNumber(detail.one_day_change))}>
            {roundTheNumber(detail.one_day_change)}
          </Text>
        </View>
      </View>
      <LineChart
        data={{
          datasets: [
            {
              data: getDataForChart(stats).y,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2, // optional
            },
          ],
          legend: ["Sales"], // optional
        }}
        width={400}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <Text style={styles.recentActivity}>Recent Activity</Text>
      <FlatList
        horizontal={true}
        data={ownedTokens(detail.name, "image")}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  recentActivity: {
    marginLeft: 10,
    fontSize: 25,
    color: "#313132",
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: "grey",
    borderBottomEndRadius: 10,
    paddingBottom: 3,
  },
  chart: {
    marginLeft: 20,
    marginTop: 41,
  },
  headerBackground: {
    width: "100%",
    height: 200,
  },
  profile: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 25,
    left: 170,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 20,
  },
  dataProfile: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 30,
    width: 400,
    height: 60,
    top: 170,
    left: 24,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  control: {
    marginHorizontal: 17,
    alignItems: "center",
  },
  title: {
    color: "grey",
  },
  description: {
    fontWeight: "bold",
    fontSize: 16,
  },
  blue: {
    color: "blue",
  },
  red: {
    color: "red",
  },
});
