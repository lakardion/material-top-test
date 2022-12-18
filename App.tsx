import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import {
  EventListenerCallback,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const A = () => {
  return <Text>Hello</Text>;
};

const B = () => {
  return <Text>B</Text>;
};
const C = () => {
  return <Text>C</Text>;
};

const screens = ["A", "B", "C"];

const AppInner = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{ fontSize: 20 }}>The current tab is... {currentTab}</Text>
      </View>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <Tab.Navigator
          tabBarPosition="bottom"
          screenListeners={{
            state: ({ data }) => {
              const anyData = data as any;
              console.log("data here??", data);
              setCurrentTab(anyData.state.index);
            },
          }}
          tabBar={({ navigation }) => {
            return (
              <Pressable
                onPress={() => {
                  if (currentTab + 1 > screens.length) {
                    console.log("do something else like submit");
                  }
                  navigation.navigate(screens[currentTab + 1]);
                }}
              >
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "yellow",
                    borderRadius: 10,
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{currentTab}</Text>
                </View>
              </Pressable>
            );
          }}
        >
          <Tab.Screen name="A" component={A} />
          <Tab.Screen name="B" component={B} />
          <Tab.Screen name="C" component={C} />
        </Tab.Navigator>
      </View>
      <Text>Holla desde abajo</Text>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppInner />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
