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
import { musicallnstrumentConnector, RandomAvatars } from "../utils/utils";

const getGqlResource = (resource: string) => {
  switch (resource) {
    case "users":
      return "User";
    case "musicalInstruments":
      return "Instrument";
    case "genres":
      return "Genre";
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
    /* User */
    if (resource === "User" && type === "GET_LIST") {
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
            ...((params.filter.name || params.filter.q) && {
              name_contains: params.filter.name,
            }),
            ...((params.filter.artistName || params.filter.q) && {
              artistName_contains: params.filter.artistName,
            }),
            ...(params.filter.email && { email_contains: params.filter.email }),
            ...(params.filter.role && { role_in: params.filter.role }),
          },
          orderBy: `${params.sort.field}_${params.sort.order}`,
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

    if (resource === "User" && type === "GET_ONE") {
      return {
        query: gql`
          query User($filter: UserWhereUniqueInput) {
            data: UserV1(filter: $filter) {
              createdAt
              email
              name
              artistName
              role
              id
              isValidated
              avatarUrl
              audioCorePluginAllowUser
              headerImage
              musicalInstruments {
                id
                name
                rank
              }
            }
          }
        `,
        variables: { filter: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "User" && type === "UPDATE") {
      const UIns: { id: string; name: string; rank: number }[] =
        params.data.musicalInstruments;
      const PIns: { id: string; name: string; rank: number }[] =
        params.previousData.musicalInstruments;
      return {
        query: gql`
          mutation updateUser(
            $data: UserUpdateInput!
            $where: UserWhereUniqueInput!
          ) {
            data: updateUser(data: $data, where: $where) {
              id
            }
          }
        `,

        variables: {
          data: {
            name: params.data.name,
            email: params.data.email,
            artistName: params.data.artistName,
            role: params.data.role,
            audioCorePluginAllowUser: params.data.audioCorePluginAllowUser,
            musicalInstruments: musicallnstrumentConnector(UIns, PIns),
          },
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          localStorage.removeItem("avatar_url");
          return {
            data: response.data.data,
            total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "User" && type === "GET_MANY") {
      return {
        query: gql`
          query AllUsers($filter: UserWhereInput, $orderBy: UserOrderByInput) {
            data: allUsersV1(filter: $filter, orderBy: $orderBy) {
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
          filter: { id_in: params.ids },
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

    if (resource === "User" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteUser($where: UserWhereUniqueInput!) {
            data: deleteUser(where: $where) {
              id
            }
          }
        `,
        variables: { where: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "User" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteUsers($where: UserWhereInput!) {
            data: deleteUsers(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: [response.data.data],
          };
        },
      };
    }

    if (resource === "User" && type === "CREATE") {
      const randomAvatar =
        RandomAvatars[Math.floor(Math.random() * RandomAvatars.length)];
      return {
        query: gql`
          mutation createUserByCMS(
            $password: String!
            $email: String!
            $artistName: String!
            $role: UserRoles!
            $name: String!
            $avatarUrl: String!
          ) {
            data: createUserByCMS(
              password: $password
              email: $email
              artistName: $artistName
              role: $role
              name: $name
              avatarUrl: $avatarUrl
            ) {
              user {
                id
                email
                name
                artistName
                role
                isValidated
                avatarUrl
                audioCorePluginAllowUser
                headerImage
              }
            }
          }
        `,
        variables: {
          password: params.data.password,
          email: params.data.email,
          artistName: params.data.artistName,
          role: params.data.role,
          name: params.data.name,
          avatarUrl: randomAvatar,
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data.user,
          };
        },
      };
    }

    /* Instruments */
    if (resource === "Instrument" && type === "GET_LIST") {
      return {
        query: gql`
          query MusicalInstruments(
            $orderBy: MusicalInstrumentOrderByInput
            $where: MusicalInstrumentWhereInput
            $take: Int
            $skip: Int
          ) {
            data: musicalInstruments(
              orderBy: $orderBy
              where: $where
              take: $take
              skip: $skip
            ) {
              id
              name
              rank
              createdAt
            }
            musicalInstrumentMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
          where: {
            ...((params.filter.name || params.filter.q) && {
              name_contains: params.filter.name || params.filter.q,
            }),
          },
          take: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.musicalInstrumentMeta.count,
          };
        },
      };
    }

    if (resource === "Instrument" && type === "GET_ONE") {
      return {
        query: gql`
          query MusicalInstrument($where: MusicalInstrumentWhereUniqueInput!) {
            data: musicalInstrument(where: $where) {
              id
              createdAt
              name
              rank
            }
          }
        `,
        variables: { where: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Instrument" && type === "GET_MANY") {
      return {
        query: gql`
          query MusicalInstruments(
            $orderBy: MusicalInstrumentOrderByInput
            $where: MusicalInstrumentWhereInput
          ) {
            data: musicalInstruments(orderBy: $orderBy, where: $where) {
              id
              name
              rank
              createdAt
            }
            musicalInstrumentMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.musicalInstrumentMeta.count,
          };
        },
      };
    }

    if (resource === "Instrument" && type === "DELETE") {
      return {
        query: gql`
          mutation DeleteMusicalInstrument(
            $where: MusicalInstrumentWhereUniqueInput!
          ) {
            data: deleteMusicalInstrument(where: $where) {
              id
              createdAt
              name
              rank
            }
          }
        `,
        variables: {
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Instrument" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation DeleteMusicalInstruments(
            $where: MusicalInstrumentWhereInput
          ) {
            data: deleteMusicalInstruments(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        parseResponse: (response: any) => {
          return {
            data: [response.data.data],
          };
        },
      };
    }

    if (resource === "Instrument" && type === "CREATE") {
      return {
        query: gql`
          mutation CreateMusicalInstrument(
            $data: MusicalInstrumentCreateInput!
          ) {
            data: createMusicalInstrument(data: $data) {
              id
              createdAt
              name
              rank
            }
          }
        `,
        options: { fetchPolicy: "network-only" },
        variables: params,
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Instrument" && type === "UPDATE") {
      return {
        query: gql`
          mutation UpdateMusicalInstrument(
            $where: MusicalInstrumentWhereUniqueInput!
            $data: MusicalInstrumentUpdateInput
          ) {
            data: updateMusicalInstrument(where: $where, data: $data) {
              id
              name
              rank
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            rank: params.data.rank,
          },
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    /* Genres */
    if (resource === "Genre" && type === "GET_LIST") {
      return {
        query: gql`
          query genres(
            $orderBy: GenreOrderByInput
            $where: GenreWhereInput
            $first: Int
            $skip: Int
          ) {
            data: genres(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              createdAt
              name
              description
              rank
            }
            genresMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
          where: {
            ...((params.filter.name || params.filter.q) && {
              name_contains: params.filter.name || params.filter.q,
            }),
          },
          first: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.genresMeta.count,
          };
        },
      };
    }

    if (resource === "Genre" && type === "GET_ONE") {
      return {
        query: gql`
          query genre($where: GenreWhereUniqueInput!) {
            data: genre(where: $where) {
              id
              createdAt
              name
              description
              rank
            }
          }
        `,
        variables: { where: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Genre" && type === "GET_MANY") {
      return {
        query: gql`
          query genres($orderBy: GenreOrderByInput, $where: GenreWhereInput) {
            data: genres(orderBy: $orderBy, where: $where) {
              id
              name
              createdAt
              rank
              description
            }
          }
        `,
        variables: {},
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Genre" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteGenre($where: GenreWhereUniqueInput!) {
            data: deleteGenre(where: $where) {
              id
              name
              createdAt
              description
            }
          }
        `,
        variables: {
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Genre" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteGenres($where: GenreWhereInput!) {
            data: deleteGenres(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        parseResponse: (response: any) => {
          return {
            data: [response.data.data],
          };
        },
      };
    }

    if (resource === "Genre" && type === "CREATE") {
      return {
        query: gql`
          mutation createGenre($data: GenreCreateInput!) {
            data: createGenre(data: $data) {
              name
              id
              createdAt
              description
              rank
            }
          }
        `,
        options: { fetchPolicy: "network-only" },
        variables: {
          data: {
            name: params.data.name,
            description: params.data.description,
            rank: params.data.rank,
          },
        },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Genre" && type === "UPDATE") {
      delete params.data.id;
      delete params.data.__typename;
      delete params.data.createdAt;
      return {
        query: gql`
          mutation updateGenre(
            $data: GenreUpdateInput!
            $where: GenreWhereUniqueInput!
          ) {
            data: updateGenre(data: $data, where: $where) {
              name
              id
              rank
              createdAt
              description
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            description: params.data.description,
            rank: params.data.rank,
          },
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.data.length,
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
