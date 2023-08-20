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
    case "users":
      return "User";
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
      //console.log("in GetList Users", params);
      //console.log(params.filter.role);
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
            ...(params.filter.name && {
              name_contains: params.filter.name,
            }),
            ...(params.filter.artistName && {
              artistName_contains: params.filter.artistName,
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
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    // if (resource === "User" && type === "UPDATE") {
    //   delete params.data.id;
    //   delete params.data.__typename;
    //   delete params.data.createdAt;
    //   if (
    //     (params.previousData.isValidated === null ||
    //       params.previousData.isValidated === false) &&
    //     params.data.isValidated === false
    //   ) {
    //     params.data.isValidated = false;
    //   } else {
    //     // const decodedToken = decodeJwt(localStorage.getItem("token"));
    //     // params.data.validatedBy = { connect: { id: decodedToken.userId } };
    //     params.data.validatedBy = {
    //       connect: { id: localStorage.getItem("user_id") },
    //     };
    //   }

    //   if (
    //     params.data.musicalInstruments
    //     //  && params.data.tracks.length !== 0
    //   ) {
    //     params.data.musicalInstruments = updateInstrumentsinUser(
    //       params.data.musicalInstruments,
    //       params.previousData.musicalInstruments
    //     );
    //   }
    //   return {
    //     query: gql`
    //       mutation updateUser(
    //         $data: UserUpdateInput!
    //         $where: UserWhereUniqueInput!
    //       ) {
    //         data: updateUser(data: $data, where: $where) {
    //           id
    //           email
    //           name
    //           artistName
    //           role
    //           avatarUrl
    //           audioCorePluginAllowUser
    //           headerImage
    //           isDeveloper
    //           isValidated
    //           musicalInstruments {
    //             id
    //             name
    //             rank
    //           }
    //         }
    //       }
    //     `,

    //     variables: {
    //       data: {
    //         name: params.data.name,
    //         email: params.data.email,
    //         artistName: params.data.artistName,
    //         role: params.data.role,
    //         // avatarUrl: params.data.avatarUrl,
    //         musicalInstruments: params.data.musicalInstruments,
    //       },
    //       where: { id: params.id },
    //     },
    //     options: { fetchPolicy: "network-only" },
    //     // tslint:disable-next-line:object-literal-sort-keys
    //     parseResponse: (response: any) => {
    //       localStorage.removeItem("avatar_url");
    //       return {
    //         data: response.data.data,
    //         total: response.data.data.length,
    //       };
    //     },
    //   };
    // }

    // if (resource === "User" && type === "GET_MANY") {
    //   return {
    //     query: gql`
    //       query AllUsers($filter: UserWhereInput, $orderBy: UserOrderByInput) {
    //         data: allUsersV1(filter: $filter, orderBy: $orderBy) {
    //           id
    //           createdAt
    //           email
    //           name
    //           artistName
    //           role
    //           avatarUrl
    //           audioCorePluginAllowUser
    //           headerImage
    //           isValidated
    //           isDeveloper
    //           musicalInstruments {
    //             id
    //             name
    //             rank
    //           }
    //         }
    //         usersMeta(where: $filter) {
    //           count
    //         }
    //       }
    //     `,
    //     variables: {
    //       filter: { id_in: params.ids },
    //       // data: params,
    //       // orderBy: `${params.sort.order}`,
    //       // where: {name_contains: params.filter.name},
    //       // where:{
    //       // name_contains: (params.filter.name || params.filter.q),
    //       // // role_in: params.filter.role,
    //       // },
    //     },
    //     options: { fetchPolicy: "network-only" },
    //     // tslint:disable-next-line:object-literal-sort-keys
    //     parseResponse: (response: any) => {
    //       return {
    //         data: response.data.data,
    //         total: response.data.usersMeta.count,
    //       };
    //     },
    //   };
    // }

    // if (resource === "User" && type === "DELETE") {
    //   return {
    //     query: gql`
    //       mutation deleteUser($where: UserWhereUniqueInput!) {
    //         data: deleteUser(where: $where) {
    //           id
    //           createdAt
    //           email
    //           name
    //           artistName
    //           role
    //           isValidated
    //           avatarUrl
    //           audioCorePluginAllowUser
    //           headerImage
    //         }
    //       }
    //     `,
    //     variables: { where: { id: params.id } },
    //     options: { fetchPolicy: "network-only" },
    //     // tslint:disable-next-line:object-literal-sort-keys
    //     parseResponse: (response: any) => {
    //       return {
    //         data: response.data.data,
    //         // total: response.data.data.length,
    //       };
    //     },
    //   };
    // }

    // if (resource === "User" && type === "DELETE_MANY") {
    //   return {
    //     query: gql`
    //       mutation deleteUsers($where: UserWhereInput!) {
    //         data: deleteUsers(where: $where) {
    //           count
    //         }
    //       }
    //     `,
    //     variables: {
    //       where: { id_in: params.ids },
    //     },
    //     options: { fetchPolicy: "network-only" },
    //     // tslint:disable-next-line:object-literal-sort-keys
    //     parseResponse: (response: any) => {
    //       return {
    //         data: [response.data.data],
    //         // total: response.data.data.length,
    //       };
    //     },
    //   };
    // }

    // if (resource === "User" && type === "CREATE") {
    //   let randomAvatar =
    //     RandomAvatars[Math.floor(Math.random() * RandomAvatars.length)];
    //   //console.log("randomAvatar", randomAvatar);
    //   return {
    //     query: gql`
    //       mutation createUserByCMS(
    //         $password: String!
    //         $email: String!
    //         $artistName: String!
    //         $role: UserRoles!
    //         $name: String!
    //         $avatarUrl: String!
    //       ) {
    //         data: createUserByCMS(
    //           password: $password
    //           email: $email
    //           artistName: $artistName
    //           role: $role
    //           name: $name
    //           avatarUrl: $avatarUrl
    //         ) {
    //           user {
    //             id
    //             email
    //             name
    //             artistName
    //             role
    //             isValidated
    //             avatarUrl
    //             audioCorePluginAllowUser
    //             headerImage
    //           }
    //         }
    //       }
    //     `,
    //     // variables: params.data,
    //     variables: {
    //       password: params.data.password,
    //       email: params.data.email,
    //       artistName: params.data.artistName,
    //       role: params.data.role,
    //       name: params.data.name,
    //       avatarUrl: randomAvatar,
    //       // audioCorePluginAllowUser: params.data.audioCorePluginAllowUser,
    //     },
    //     options: { fetchPolicy: "network-only" },
    //     // tslint:disable-next-line:object-literal-sort-keys
    //     parseResponse: (response: any) => {
    //       //console.log("Response From create", response);
    //       return {
    //         data: response.data.data.user,
    //         // total: response.data.data.length,
    //       };
    //     },
    //   };
    // }

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
