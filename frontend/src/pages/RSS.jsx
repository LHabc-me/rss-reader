import { Searchbar, Text, Button, Snackbar, TextInput, Dialog, ActivityIndicator } from "react-native-paper";
import { FlatList, Platform, ScrollView, View } from "react-native";
import { AppContext } from "../utils/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";


function Feed(props) {
  const { feed, onSubscribe, onUnsubscribe, setSnackbarText } = props;
  const { info, setInfo } = useContext(AppContext);
  const { feeds, theme } = info;
  const swipeable = useRef(null);
  const renderRightActions = () => {
    return (
      <Button
        style={{ justifyContent: "center", alignItems: "center" }}
        mode={"text"}
        textColor={theme.value.colors.error}
        onPress={() => {
          setInfo({
              ...info,
              feeds: {
                all: feeds.all.filter(({ title, link }) => title !== feed.title && link !== feed.link),
                subscribed: feeds.subscribed.filter(({ title, link }) => title !== feed.title && link !== feed.link),
              },
            },
          );
          swipeable.current.close();
          setSnackbarText(`成功删除 ${feed.title}`);
        }}>
        删除
      </Button>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} ref={swipeable} overshootRight={false}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text style={{ flex: 5 }} variant={"titleMedium"}>
            {feed.title}
          </Text>
          <Text style={{ flex: 2 }} variant={"bodySmall"}>
            {feed.link}
          </Text>
        </View>
        <View
          style={{
            flex: 4,
          }}
        >
          {
            feeds.subscribed.find(
              ({ title, link }) => title === feed.title && link === feed.link,
            ) ? (
              <Button mode={"text"} onPress={() => onUnsubscribe(feed)} style={{ justifyContent: "center", alignItems: "center" }}>
                取消订阅
              </Button>
            ) : (
              <Button mode={"text"} onPress={() => onSubscribe(feed)} style={{ justifyContent: "center", alignItems: "center" }}>
                订阅
              </Button>
            )
          }
        </View>
      </View>
    </Swipeable>
  );
}

function RSS() {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = query => setSearchQuery(query);
  const { info, setInfo } = useContext(AppContext);
  const { feeds } = info;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  useEffect(() => {
    if (!snackbarText) return;
    setSnackbarVisible(true);
  }, [snackbarText]);

  const onSubscribe = (feed) => {
    if (feeds.subscribed.find(({ title, link }) => title === feed.title && link === feed.link)) {
      setSnackbarText("订阅源已存在");
      return;
    }
    setInfo({
      ...info,
      feeds: {
        ...feeds,
        subscribed: [...feeds.subscribed, feed],
      },
    });
    setSnackbarText(`成功订阅 ${feed.title}`);
  };
  const onUnsubscribe = (feed) => {
    setInfo({
      ...info,
      feeds: {
        ...feeds,
        subscribed: feeds.subscribed.filter(({ title, link }) => title !== feed.title || link !== feed.link),
      },
    });
    setSnackbarText(`成功取消订阅 ${feed.title}`);
  };

  const [newFeedDialogVisiable, setNewFeedDialogVisiable] = useState(false);
  const [newFeed, setNewFeed] = useState({
    title: "",
    link: "",
  });
  const feedsView = feeds.all
    .filter(feed => feed.title.includes(searchQuery) || feed.link.includes(searchQuery))
    .map((feed, index) => {
      return (
        <Feed key={index}
              feed={feed}
              onSubscribe={onSubscribe}
              onUnsubscribe={onUnsubscribe}
              setSnackbarText={setSnackbarText} />
      );
    });

  const renderItem = ({ item }) => {
    return (
      <Feed feed={item}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
            setSnackbarText={setSnackbarText} />
    );
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setData(feeds.all);
    } else {
      setData(feeds.all.filter(feed =>
        feed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feed.link.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery, feeds.all]);

  return (
    <View style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <Searchbar placeholder={"搜索订阅源"}
                 onChangeText={onChangeSearch}
                 value={searchQuery}
                 mode={"view"} />
      <Button mode={"text"} onPress={() => setNewFeedDialogVisiable(true)}>
        添加订阅源
      </Button>
      <FlatList data={data}
                renderItem={renderItem}
                initialNumToRender={15}
                windowSize={15} // 渲染区域高度
                removeClippedSubviews={Platform.OS === "android"}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
      ></FlatList>

      <Dialog visible={newFeedDialogVisiable} onDismiss={() => setNewFeedDialogVisiable(false)}>
        <Dialog.Title>添加订阅源</Dialog.Title>
        <Dialog.Actions>
          <View style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}>
            <TextInput label={"名称"} value={newFeed.title} onChangeText={(text) => setNewFeed({
              ...newFeed,
              title: text,
            })}>
            </TextInput>
            <TextInput label={"link"} value={newFeed.link} onChangeText={(text) => setNewFeed({
              ...newFeed,
              link: text,
            })}>
            </TextInput>
            <View style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}>
              <Button mode={"text"}
                      onPress={() => {
                        if (newFeed.title === "" || newFeed.link === "") {
                          setSnackbarText("订阅源名称和link不能为空");
                          return;
                        }
                        if (feeds.all.find(({ link }) => link === newFeed.link)) {
                          setSnackbarText("订阅源已存在");
                          return;
                        }
                        setInfo({
                          ...info,
                          feeds: {
                            ...feeds,
                            all: [newFeed, ...feeds.all],
                          },
                        });
                        setSnackbarText(`成功添加 ${newFeed.title}`);
                        setNewFeedDialogVisiable(false);
                      }}>
                添加
              </Button>
              <Button mode={"text"} onPress={() => setNewFeedDialogVisiable(false)}>取消</Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
      <Snackbar visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={Snackbar.DURATION_SHORT}
                action={{
                  label: "关闭",
                  onPress: () => setSnackbarVisible(false),
                }}>
        {snackbarText}
      </Snackbar>
    </View>
  );
}


export default RSS;
