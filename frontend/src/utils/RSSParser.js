import * as rssParser from "react-native-rss-parser";


async function parse(link) {
  const response = await fetch(link).then((response) => response.text());
  return await rssParser.parse(response);
}

export { parse };

