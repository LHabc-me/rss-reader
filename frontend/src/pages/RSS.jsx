import * as React from "react";
import { Searchbar, List } from "react-native-paper";
import { Text, View } from "react-native";

const RSS = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View>
      <Searchbar
        placeholder={"搜索订阅源"}
        onChangeText={onChangeSearch}
        value={searchQuery}
        mode={"view"}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />

      {
        new Array(100).fill(0).map((_, index) => (
          <List.Item title={index} key={index}>
            {index}
          </List.Item>
        ))
      }
    </View>
  );
};

export default RSS;
