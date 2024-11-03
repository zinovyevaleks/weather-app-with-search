import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.weather.yandex.ru/graphql/query",
    headers: {
      "X-Yandex-Weather-Key": "29216791-a6b3-4840-bc06-64ca80debb6d",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
