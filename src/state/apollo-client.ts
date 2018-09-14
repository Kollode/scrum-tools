import ApolloClient, {
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import * as fetch from "isomorphic-fetch";

interface ApolloStateWindow extends Window {
  __APOLLO_STATE__: NormalizedCacheObject;
}

const apolloClient = new ApolloClient({
  clientState: {
    defaults: {
      messages: []
    },
    resolvers: {}
  },
  fetch,
  cache:
    typeof window !== "undefined"
      ? new InMemoryCache().restore(
          (window as ApolloStateWindow).__APOLLO_STATE__
        )
      : undefined
});

export { apolloClient };
