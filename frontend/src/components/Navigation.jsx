import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Home from "../pages/Home";
import RSS from "../pages/RSS";

function Naviagtion() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "RSS", title: "RSS", focusedIcon: "rss" },
  ]);


  const renderScene = BottomNavigation.SceneMap({
    Home: () => <Home />,
    RSS: () => <RSS />,
  });

  return (
    <BottomNavigation navigationState={{ index, routes }}
                      onIndexChange={setIndex}
                      renderScene={renderScene}
                      sceneAnimationEnabled
                      sceneAnimationType={"shifting"}
    />
  );
}

export default Naviagtion;
