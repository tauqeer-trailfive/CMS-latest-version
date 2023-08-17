import { ApolloQueryResult, InMemoryCache } from "@apollo/client";
import buildApolloClient, {
  buildQuery as buildQueryFactory,
} from "ra-data-graphql-simple";
import { BuildQueryFactory } from "ra-data-graphql";
import { CREATE, DataProvider, DELETE } from "react-admin";
import gql from "graphql-tag";
import { IntrospectionType } from "graphql";
import { ApolloLink, concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import configFile from "../configFile";

const getGqlResource = (resource: string) => {
  switch (resource) {
    case "customers":
      return "Customer";

    case "categories":
      return "Category";

    case "commands":
      return "Command";

    case "products":
      return "Product";

    case "reviews":
      return "Review";

    case "invoices":
      return "Invoice";

    default:
      throw new Error(`Unknown resource ${resource}`);
  }
};

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (forward) {
    return forward(operation);
  } else {
    return null;
  }
});

const httpLink = new HttpLink({ uri: configFile.ip });

const customBuildQuery: BuildQueryFactory = (introspectionResults) => {
  const buildQuery = buildQueryFactory(introspectionResults);

  return (type, resource, params) => {
    if (resource === "User" && type === "GET_LIST") {
      let defaultORderBtCreation: string;
      if (params.filter.role === undefined) {
        params.filter.role = [
          "SUPERADMIN",
          "ADMIN",
          "USER",
          "ANON",
          "CONTENTCREATOR",
          "SERVICE",
          "QA",
        ];
      }
      if (params.sort.field === undefined && params.sort.order === undefined) {
        defaultORderBtCreation = "createdAt_ASC";
      } else {
        defaultORderBtCreation = `${params.sort.field}_${params.sort.order}`;
      }

      return {
        query: gql`
          query AllUsers(
            $filter: UserWhereInput
            $orderBy: UserOrderByInput
            $take: Int
            $skip: Int
          ) {
            data: allUsersV1(
              filter: $filter
              orderBy: $orderBy
              take: $take
              skip: $skip
            ) {
              id
              createdAt
              email
              name
              artistName
              role
              avatarUrl
              audioCorePluginAllowUser
              headerImage
              isValidated
              isDeveloper
              musicalInstruments {
                id
                name
                rank
              }
            }
            usersMeta(where: $filter) {
              count
            }
          }
        `,
        variables: {
          filter: {
            ...((params.filter.artistName || params.filter.q) && {
              artistName_contains: params.filter.artistName || params.filter.q,
            }),
            ...(params.filter.email && { email_contains: params.filter.email }),
            ...(params.filter.role && { role_in: params.filter.role }),
          },
          orderBy: defaultORderBtCreation,
          take: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.usersMeta.count,
          };
        },
      };
    }

    return buildQuery(type, resource, params);
  };
};

export default async () => {
  const dataProvider = await buildApolloClient({
    clientOptions: {
      link: concat(authMiddleware, httpLink) as any,
      cache: new InMemoryCache() as any,
    },
    introspection: {
      operationNames: {
        [DELETE]: (resource: IntrospectionType) => `remove${resource.name}`,
      },
    },
    buildQuery: customBuildQuery,
  });

  return new Proxy<DataProvider>(defaultDataProvider, {
    get: (target, name) => {
      if (typeof name === "symbol" || name === "then") {
        return;
      }
      return async (resource: string, params: any) => {
        return dataProvider[name](getGqlResource(resource), params);
      };
    },
  });
};
// Only used to initialize proxy
const defaultDataProvider: DataProvider = {
  create: () => Promise.reject({ data: null }), // avoids adding a context in tests
  delete: () => Promise.reject({ data: null }), // avoids adding a context in tests
  deleteMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
  getList: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
  getMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
  getManyReference: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
  getOne: () => Promise.reject({ data: null }), // avoids adding a context in tests
  update: () => Promise.reject({ data: null }), // avoids adding a context in tests
  updateMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
};
