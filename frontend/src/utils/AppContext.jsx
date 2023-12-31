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
      all: [],
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
  const save = () => AsyncStorage.setItem("info", JSON.stringify(info));

  useEffect(() => {
    const fetchData = async () => {
      const infoStorage = await AsyncStorage.getItem("info");
      if (infoStorage) {
        setInfo(JSON.parse(infoStorage));
      }
      setIsReady(true);

      let feedsAll = await (await fetch("http://www.kina0630.xyz:8080/rss-reader/get", {
        method: "GET",
      })).text();

      feedsAll = JSON.parse(feedsAll);
      if (!feedsAll || !feedsAll.length) return;
      feedsAll = [...info.feeds.all, ...feedsAll
        .filter(({ title, link }) => {
          return !info.feeds.all.find(f => f.title === title && f.link === link);
        })
        .map(({ title, link }) => {
          return {
            title, link,
          };
        })];
      setInfo(info => {
        return { ...info, feeds: { ...info.feeds, all: feedsAll } };
      });
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (isReady) {
      save();
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
