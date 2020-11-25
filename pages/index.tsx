import React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import tailwind from "tailwind-rn";

import Buy from "../components/BuyWidget";

export default function Home() {
  return (
    <SafeAreaView style={tailwind("h-full")}>
      <View style={tailwind("pt-12 items-center")}>
        <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
          <Text style={tailwind("text-blue-800 font-semibold")}>
            Unipeer
          </Text>
        </View>
        <Buy/>
      </View>
    </SafeAreaView>
  );
}
