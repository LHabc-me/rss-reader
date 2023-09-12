import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, FAB, RadioButton, Searchbar, SegmentedButtons, Switch, Text, ToggleButton } from "react-native-paper";
import { Modal } from "react-native-paper";
import { ThemeContext } from "../utils/ThemeContext";

function EssaySettings(props) {
  const {
    visible,
    hideModal,
    searchQuery,
    onSearchQueryChange,
    sortRule,
    onSortRuleChange,
    filter,
    onFilterChange,
    useDarkMode,
    onUseDarkModeChange,
  } = props;
  const style = {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
  };
  if (!useDarkMode) {
    style.backgroundColor = "white";
  }
  return (
    <Modal visible={visible}
           onDismiss={hideModal}
           style={style}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Searchbar placeholder={"搜索文章"}
                   onChangeText={onSearchQueryChange}
                   value={searchQuery} />
      </View>
      <Divider />
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text variant={"titleMedium"} style={{ paddingBottom: 10 }}>
          排序规则
        </Text>
        <SegmentedButtons
          value={sortRule}
          onValueChange={onSortRuleChange}
          buttons={[
            {
              value: "new",
              label: "最新的优先",
            },
            {
              value: "old",
              label: "最久的优先",
            },
          ]}
        />
      </View>
      <Divider />
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text variant={"titleMedium"} style={{ paddingBottom: 10 }}>
          过滤器
        </Text>
        <SegmentedButtons density={"small"}
                          value={filter}
                          onValueChange={onFilterChange}
                          buttons={[
                            {
                              value: "all",
                              label: "全部文章",
                            },
                            {
                              value: "read",
                              label: "已读文章",
                            },
                            {
                              value: "unread",
                              label: "未读文章",
                            },
                          ]}
        />
      </View>
      <Divider />
      <View style={{
        paddingHorizontal: 20, paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Text variant={"titleMedium"} style={{ paddingBottom: 10 }}>
          夜间模式
        </Text>
        <Switch value={useDarkMode} onValueChange={onUseDarkModeChange} />
      </View>
    </Modal>
  );
}


function Home() {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortRule, setSortRule] = useState("new");
  const [filter, setFilter] = useState("all");
  const [useDarkMode, setUseDarkMode] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <EssaySettings visible={visible}
                     hideModal={hideModal}
                     searchQuery={searchQuery}
                     onSearchQueryChange={setSearchQuery}
                     sortRule={sortRule}
                     onSortRuleChange={setSortRule}
                     filter={filter}
                     onFilterChange={setFilter}
                     useDarkMode={useDarkMode}
                     onUseDarkModeChange={(value) => {
                       setUseDarkMode(value);
                       toggleTheme(value ? "dark" : "light");
                     }}
      />
      <FAB icon={"cog"}
           style={{
             position: "absolute",
             margin: 16,
             right: 0,
             bottom: 0,
           }}
           onPress={() => setVisible(!visible)}
      />
    </>
  );
}


export default Home;
