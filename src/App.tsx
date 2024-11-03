import { Provider } from "react-redux";
import store from "./store/store";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";
import WeatherApp from "./WeatherApp";

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <WeatherApp />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
