import React, { useContext, useEffect, useRef, useState } from "react";
import { RefreshControl, ScrollView, useWindowDimensions, View, Animated, FlatList } from "react-native";
import { ActivityIndicator, Divider, FAB, Searchbar, SegmentedButtons, Switch, Text } from "react-native-paper";
import { AppContext } from "../utils/AppContext";
import { parse } from "../utils/RSSParser";
import NewsButton from "../components/NewsButton";
import NewsDetail from "../components/NewsDetail";

function EssaySettings(props) {
  const {
    visible,
    searchQuery,
    onSearchQueryChange,
    sortRule,
    onSortRuleChange,
    filter,
    onFilterChange,
    useDarkMode,
    onUseDarkModeChange,
  } = props;

  const animationValue = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) {
      // Button appears with animation
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Button disappears with animation
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });


  return (
    <Animated.View style={{
      display: visible ? "flex" : "none",
      transform: [{ translateY }],
    }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Searchbar placeholder={"搜索文章"}
                   onChangeText={onSearchQueryChange}
                   value={searchQuery} />
      </View>
      <Divider />
      {/*<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>*/}
      {/*  <Text variant={"titleMedium"} style={{ paddingBottom: 10 }}>*/}
      {/*    排序规则*/}
      {/*  </Text>*/}
      {/*  <SegmentedButtons*/}
      {/*    value={sortRule}*/}
      {/*    onValueChange={onSortRuleChange}*/}
      {/*    buttons={[*/}
      {/*      {*/}
      {/*        value: "new",*/}
      {/*        label: "最新的优先",*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: "old",*/}
      {/*        label: "最久的优先",*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<Divider />*/}
      {/*<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>*/}
      {/*  <Text variant={"titleMedium"} style={{ paddingBottom: 10 }}>*/}
      {/*    过滤器*/}
      {/*  </Text>*/}
      {/*  <SegmentedButtons density={"small"}*/}
      {/*                    value={filter}*/}
      {/*                    onValueChange={onFilterChange}*/}
      {/*                    buttons={[*/}
      {/*                      {*/}
      {/*                        value: "all",*/}
      {/*                        label: "全部文章",*/}
      {/*                      },*/}
      {/*                      {*/}
      {/*                        value: "read",*/}
      {/*                        label: "已读文章",*/}
      {/*                      },*/}
      {/*                      {*/}
      {/*                        value: "unread",*/}
      {/*                        label: "未读文章",*/}
      {/*                      },*/}
      {/*                    ]}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<Divider />*/}
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
    </Animated.View>
  );
}


function Home(props) {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);

  const { info, toggleTheme, setInfo } = useContext(AppContext);
  const { searchQuery, sortRule, filter, theme, feeds } = info;
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const reloadNews = async () => {
    const newNews = [];
    const works = feeds.subscribed.map(async ({ title, link }) => {
      try {
        const r = await parse(link);
        newNews.push(
          ...r.items.map((i) => {
            return {
              ...i,
              source: title,
            };
          }),
        );
        setNews(newNews);
      } catch (e) {
        console.log(e);
      }
    });
    await Promise.all(works);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    if (news.length === 0) {
      setLoading(true);
    }
    reloadNews();
  }, [feeds.subscribed]);

  const [rootHeight, setRootHeight] = useState(0);
  const windowHeight = useWindowDimensions().height;

  const [showDetail, setShowDetail] = useState(false);
  const [detailTitle, setDetailTitle] = useState("");
  const [detailContent, setDetailContent] = useState("");

  const renderItem = ({ item }) => (
    <NewsButton
      config={item}
      style={{
        marginVertical: 4,
        marginHorizontal: 10,
        padding: 10,
      }}
      onPress={() => {
        setDetailTitle(item.title);
        setDetailContent(item.content ?? item.description);
        setShowDetail(true);
      }}
    />
  );

  return (
    <View style={{ height: "100%" }} onLayout={(e) => setRootHeight(e.nativeEvent.layout.height)}>
      <EssaySettings
        searchQuery={searchQuery}
        sortRule={sortRule}
        filter={filter}
        useDarkMode={theme.name === "dark"}
        onSearchQueryChange={(value) => setInfo({ ...info, searchQuery: value })}
        onSortRuleChange={(value) => setInfo({ ...info, sortRule: value })}
        onFilterChange={(value) => setInfo({ ...info, filter: value })}
        onUseDarkModeChange={() => {
          toggleTheme(theme.name === "dark" ? "light" : "dark");
        }}
        visible={visible}
        hideModal={hideModal}
      />

      <FlatList
        data={news.filter((item) => {
          return (
            item.title.includes(searchQuery) ||
            item.description.includes(searchQuery) ||
            item.categories.map((c) => c.name).join(" ").includes(searchQuery)
          );
        })}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              reloadNews();
            }}
            colors={[theme.value.colors.primary.toString()]}
            color={theme.value.colors.primary}
          />
        }
        ListEmptyComponent={() =>
          news.length === 0 && !loading && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                height: rootHeight ?? windowHeight / 3,
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
                  欢迎使用 RSS Reader
                </Text>
              </View>
              <Text variant={"titleMedium"}>没有文章</Text>
              <Text variant={"bodySmall"}>请点击右下角的按钮添加订阅</Text>
            </View>
          )
        }
        ListFooterComponent={() =>
          loading && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                height: rootHeight ?? windowHeight / 3,
              }}
            >
              <ActivityIndicator animating={loading} size={"large"} />
            </View>
          )
        }
      />
      {
        showDetail && (
          <View>
            <NewsDetail source={{ html: detailContent }}
                        onBack={() => {
                          setShowDetail(false);
                        }}
                        title={detailTitle}>
            </NewsDetail>
          </View>
        )
      }
      {
        !showDetail && (
          <FAB icon={"cog"}
               style={{
                 position: "absolute",
                 margin: 16,
                 right: 0,
                 bottom: 0,
               }}
               onPress={() => setVisible(!visible)}
          />
        )
      }
    </View>
  );
}

export default Home;
