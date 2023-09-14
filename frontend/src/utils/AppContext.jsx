import React, { createContext, useEffect, useState } from "react";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext("app");

function AppProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  const [info, setInfo] = useState({
    sortRule: "new",
    filter: "all",
    searchQuery: "",
    theme: {
      name: "light",
      value: MD3LightTheme,
    },
    feeds: {
      all: [
        {
          title: "知乎每日精选",
          link: "https://www.zhihu.com/rss",
        },
        {
          title: "阮一峰的网络日志",
          link: "https://www.ruanyifeng.com/blog/atom.xml",
        },
        {
          title: "阮一峰的网络日志",
          link: "http://feeds.feedburner.com/ruanyifeng",
        },
        {
          title: "少数派",
          link: "https://sspai.com/feed",
        },
        {
          title: "美团技术团队",
          link: "https://rsshub.app/meituan/tech/home",
        },
        {
          title: "V2EX",
          link: "https://v2ex.com/index.xml",
        },
        {
          title: "酷 壳 – CoolShell",
          link: "http://coolshell.cn/feed",
        },
        {
          title: "爱范儿",
          link: "https://www.ifanr.com/feed",
        },
      ],
      subscribed: [],
    },
    news: {
      read: [],// 已读
    },
  });

  const toggleTheme = (theme) => {
    switch (theme.toLowerCase()) {
      case "light":
        setInfo({
          ...info,
          theme: {
            name: "light",
            value: MD3LightTheme,
          },
        });
        break;
      case "dark":
        setInfo({
          ...info,
          theme: {
            name: "dark",
            value: MD3DarkTheme,
          },
        });
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const infoStorage = await AsyncStorage.getItem("info");
      if (infoStorage) {
        setInfo(JSON.parse(infoStorage));
      }
      setIsReady(true);

      let feedsAll = JSON.parse(await (await fetch("http://www.kina0630.xyz:8080/rss-reader/get")).json());
      if (!feedsAll || !feedsAll.length) return;
      feedsAll = [...info.feeds.all, ...feedsAll.fliter((item) => !info.feeds.all.includes(item))];
      setInfo({ ...info, feeds: { ...info.feeds, all: feedsAll } });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem("info", JSON.stringify(info));
    }
  }, [info, isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AppContext.Provider value={{ info, setInfo, toggleTheme }}>
      <PaperProvider theme={info.theme.value}>
        {children}
      </PaperProvider>
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
