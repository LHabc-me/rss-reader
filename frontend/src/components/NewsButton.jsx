import { View, useWindowDimensions } from "react-native";
import { Text, Chip, Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { useContext } from "react";
import { AppContext } from "../utils/AppContext";

// 去除连续的br标签和换行符，去除首尾的空白和br标签，替换所有img标签为[图片]，保留前 n 个字符，> n 个字符的部分用 ... 表示
function trim(str, n = 300) {
  const s = str.replace(/<br\s*\/?>/g, "\n")
    .replace(/\n+/g, "<br>")
    .replace(/^\s+|\s+$/g, "")
    .replace(/<br\s*\/?>$/, "")
    .replace(/<img.*?\/?>/g, "")
    .slice(0, 200)
    .trim()
    .replace(/<br\s*\/?>$/, "");
  if (str.length > n) {
    return s + "...";
  }
  return s;
}

function NewsButton(props) {
  const { title, content, description, categories, authors, source } = props.config;
  const { info } = useContext(AppContext);
  const { theme } = info;
  const windowWidth = useWindowDimensions().width;
  return (
    <Card {...props}>
      <Text variant={"titleMedium"}>{title}</Text>
      <RenderHTML source={{ html: trim(content ?? description ?? "") }}
                  contentWidth={windowWidth}
                  enableExperimentalBRCollapsing
                  enableExperimentalGhostLinesPrevention
                  baseStyle={{
                    color: theme.value.colors.inverseSurface,
                    fontSize: 14,
                    fontWeight: "normal",
                    fontStyle: "normal",
                  }}
      />

      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        {
          categories.map(({ name }, index) => {
            return (
              <Chip key={index} compact style={{
                margin: 3,
              }}>
                {name}
              </Chip>
            );
          })
        }
      </View>
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}>
        <View style={{
          display: "flex",
          flexDirection: "column",
        }}>
          <Text>来源 {source}</Text>
          <Text>作者 {authors.map(a => a.name).join(" ")}</Text>
        </View>
      </View>
    </Card>
  );
}

export default NewsButton;
