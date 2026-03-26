import { ScrollView, Text } from "react-native"; 
// import * as Sentry from "@sentry/react-native";

const ChatsTab = () => {
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Chats Tab</Text>
      {/* // Uncomment the code below to test Sentry error tracking in the ChatsTab
      component */}
      {/* <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
      /> */}
    </ScrollView>
  );
};

export default ChatsTab;
