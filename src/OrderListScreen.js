import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./actions/routeItems";
import moment from "moment/moment";

const OrderListScreen = ({ navigation }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusOptions] = useState(["Pending", "Complete", "Failed"]);
  const [term, changeTerm] = useState("");

  useEffect(() => {
    dispatch(fetchItems(term));
    console.log("refresh ...");
  }, [plannedOrders]);

  const dispatch = useDispatch();
  const plannedOrders = useSelector((state) => state.items.items);

  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    filterRoute();
    console.log("refreshed ....");
  }, [plannedOrders]);

  //('3=done', '4=failed', '2=pending for decision',0 is newly added,1 is assigned routes
  const filterRoute = () => {
    let filter = plannedOrders.filter((order) => order.order_status !== 3);
    setFilteredOrders(filter);
  };

  // Function to filter orders based on user input
  const handleSearch = () => {
    dispatch(fetchItems(term));
    changeTerm("");
    console.log("handle search", term);
  };

  // Render item for FlatList
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        navigation.navigate("OrderDetail", item);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text>Order No: {item.id}</Text>
        <Text>Truck No: {item.truck_id}</Text>
        <Text>Address : {item.address}</Text>
      </View>

      <View style={{ flexDirection: "column" }}>
        <Text>{moment(item.order_created_date).format("YYYY-MM-DD")}</Text>
        <Text>
          {item.order_status === 2
            ? "Pending"
            : item.order_status === 4
            ? "Failed"
            : "New"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.totalCounts}>
        <Text style={styles.countStyle}>
          New:{" "}
          {plannedOrders.filter((order) => order.order_status === 1).length}
        </Text>

        <Text style={styles.countStyle}>
          Pending:{" "}
          {plannedOrders.filter((order) => order.order_status === 2).length}
        </Text>
        <Text style={styles.countStyle}>
          Done:{" "}
          {plannedOrders.filter((order) => order.order_status === 3).length}
        </Text>
        <Text style={styles.countStyle}>
          Failed:{" "}
          {plannedOrders.filter((order) => order.order_status === 4).length}
        </Text>
      </View>

      <View style={styles.filters}>
        <View style={styles.backgroundStyle}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Search"
            value={term}
            onChangeText={(value) => changeTerm(value)}
          />
          <Feather
            name="search"
            style={styles.iconStyle}
            onPress={handleSearch}
          />
        </View>
      </View>

      {/* List of orders */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalCounts: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  countStyle: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 4,
    justifyContent: "center",
    alignSelf: "center",
  },
  list: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
  },
  orderItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "white",
    flex: 1,
    height: 50,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 8,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 8,
  },
  iconStyle: {
    fontSize: 24,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default OrderListScreen;
