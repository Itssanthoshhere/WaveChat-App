import { Redirect } from "expo-router";
import { View, Text } from "react-native";

const AuthLayout = () => {
  const isauth = true;
  if (isauth) {
    return <Redirect href={"/(tabs)"} />;
  }
  
  return (
    <View className="flex-1 mt-20">
      <Text>AuthLayout</Text>
    </View>
  );
};

export default AuthLayout;
