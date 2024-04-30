import { NavigationContainer } from "@react-navigation/native";

import React, { useEffect, useState } from "react";

import RootNavigator from "./navigators/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
