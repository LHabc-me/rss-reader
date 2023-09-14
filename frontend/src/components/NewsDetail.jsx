import RenderHTML from "react-native-render-html";
import { BackHandler, ScrollView, useWindowDimensions, View } from "react-native";
import { Button, Text, Appbar } from "react-native-paper";
import { useEffect } from "react";

function NewsDetail(props) {
  const { source, title, onBack } = props;
  const windowWidth = useWindowDimensions().width;
  useEffect(() => {
    const backHandler = () => {
      onBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
  }, []);
  return (
    <View {...props}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={onBack} />
        </Appbar.Header>
        <Text style={{
          flex: 1,
          fontSize: 20,
          fontWeight: "bold",
          paddingRight: 20,
        }}>
          {title}
        </Text>
      </View>
      <ScrollView>
        <RenderHTML source={source} contentWidth={windowWidth} baseStyle={{ padding: 10 }} />
      </ScrollView>
    </View>
  );
}

export default NewsDetail;
