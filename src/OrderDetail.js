import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import moment from "moment";
import { updateStatus } from "./actions/routeItems";
import { useDispatch } from "react-redux";

const OrderDetail = ({ route, navigation }) => {
  const order = route.params;
  const dispatch = useDispatch();
  const updateRoute = (updateItem) => {
    console.log("update item , ", updateItem);
    dispatch(updateStatus(updateItem));
    navigation.navigate("OrderList");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 4 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(198,199,210)",
            flex: 1,
            height: 48,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            marginRight: 8,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            updateRoute({
              id: order.id,
              order_status: 4,
            })
          }
        >
          <AntDesign name="closecircleo" size={24} color="white" />
          <Text style={{ color: "white", fontWeight: "bold" }}>Failed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#E13B0A",
            flex: 1,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            updateRoute({
              id: order.id,
              order_status: 3,
            })
          }
        >
          <AntDesign name="checkcircleo" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: 4,
          padding: 8,
        }}
      >
        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, flex: 1 }}>
            {moment(order.order_created_date).format("YYYY-MM-DD")}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {order.order_status === 1
              ? "New"
              : order.order_status === 2
              ? "Pending"
              : "Failed"}
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Order No.</Text>
          <Text>{order.id}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          <Text style={{ flex: 1 }}>Truck No.</Text>
          <Text>{order.truck_id}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Order Type</Text>
          <Text>{order.order_type === 1 ? "Hala" : "Non-Hala"}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Name</Text>
          <Text>{order.name}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Phone Number</Text>
          <Text>{order.phone_number}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Address</Text>
          <Text>{order.address}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Items</Text>
          <Text>{order.items}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Price</Text>
          <Text>{order.price}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ flex: 1 }}>Delivery Fee</Text>
          <Text>{order.delivery_fee}</Text>
        </View>

        <View style={{ height: 1, backgroundColor: "grey" }}></View>

        <View style={styles.rowStyle}>
          <Text style={{ flex: 1, fontWeight: "bold" }}>Total Price</Text>
          <Text style={{ fontWeight: "bold" }}>
            {parseInt(order.price) + parseInt(order.delivery_fee)}Ks
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(198,199,210)",
          width: "100%",
          height: 48,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() =>
          updateRoute({
            id: order.id,
            order_status: 2,
          })
        }
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Pending</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  rowStyle: { flexDirection: "row", marginVertical: 4 },
});

//make this component available to the app
export default OrderDetail;
