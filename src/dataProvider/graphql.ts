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
import {
  effectConnectorOnCreatePreset,
  effectConnectorOnEditPreset,
  musicallnstrumentConnector,
  RandomAvatars,
} from "../utils/utils";

const getGqlResource = (resource: string) => {
  switch (resource) {
    case "contests":
      return "Contest";
    case "users":
      return "User";
    case "musicalInstruments":
      return "Instrument";
    case "genres":
      return "Genre";
    case "effects":
      return "Effects";
    case "presets":
      return "PreSet";
    case "bpmTemp":
      return "Samples_BPM";
    case "projectcategories":
      return "ProjectCategory";
    case "referralcode":
      return "ReferralCode";
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

    /* Effects */
    if (resource === "Effects" && type === "GET_LIST") {
      return {
        query: gql`
          query effects(
            $orderBy: EffectOrderByInput
            $where: EffectWhereInput
            $first: Int
            $skip: Int
          ) {
            data: effects(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              name
              createdAt
              typeOfEffect
              effectValues
            }
            effectsMeta(where: $where) {
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
            ...(params.filter.typeOfEffect && {
              typeOfEffect: params.filter.typeOfEffect,
            }),
          },
          first: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.effectsMeta.count,
          };
        },
      };
    }

    if (resource === "Effects" && type === "GET_MANY") {
      return {
        query: gql`
          query effects(
            $orderBy: EffectOrderByInput
            $where: EffectWhereInput
            $first: Int
            $skip: Int
          ) {
            data: effects(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              name
              createdAt
              typeOfEffect
              preSets {
                id
                name
              }
              updatedAt
              effectValues
            }
            effectsMeta(where: $where) {
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
            total: response.data.effectsMeta.count,
          };
        },
      };
    }

    if (resource === "Effects" && type === "UPDATE") {
      return {
        query: gql`
          mutation updateEffect(
            $data: EffectUpdateInput!
            $where: EffectWhereUniqueInput!
          ) {
            data: updateEffect(data: $data, where: $where) {
              id
              name
              createdAt
              effectValues
              typeOfEffect
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            effectValues: params.data.effectValues,
            typeOfEffect: params.data.typeOfEffect,
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

    if (resource === "Effects" && type === "GET_ONE") {
      return {
        query: gql`
          query effect($where: EffectWhereUniqueInput!) {
            data: effect(where: $where) {
              id
              name
              createdAt
              typeOfEffect
              effectValues
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

    if (resource === "Effects" && type === "CREATE") {
      return {
        query: gql`
          mutation createEffect($data: EffectCreateInput!) {
            data: createEffect(data: $data) {
              id
              name
              createdAt
              typeOfEffect
              effectValues
              preSets {
                id
                name
              }
              updatedAt
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            effectValues: params.data.effectValues,
            typeOfEffect: params.data.typeOfEffect,
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Effects" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteEffect($where: EffectWhereUniqueInput!) {
            data: deleteEffect(where: $where) {
              id
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

    if (resource === "Effects" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteEffects($where: EffectWhereInput!) {
            data: deleteEffects(where: $where) {
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

    /* Presets */

    if (resource === "PreSet" && type === "GET_LIST") {
      return {
        query: gql`
          query preSets(
            $orderBy: PreSetOrderByInput
            $where: PreSetWhereInput
            $first: Int
            $skip: Int
          ) {
            data: preSets(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              name
              category
              imageUrl
              createdAt
              effects {
                id
                name
                typeOfEffect
                effectValues
              }
            }
            preSetsMeta(where: $where) {
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
            ...(params.filter.category && {
              category: params.filter.category,
            }),
          },
          first: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.preSetsMeta.count,
          };
        },
      };
    }

    if (resource === "PreSet" && type === "GET_MANY") {
      return {
        query: gql`
          query preSets(
            $orderBy: PreSetOrderByInput
            $where: PreSetWhereInput
          ) {
            data: preSets(orderBy: $orderBy, where: $where) {
              id
              name
              category
              imageUrl
              createdAt
              effects {
                id
                name
                typeOfEffect
                effectValues
              }
            }
            preSetsMeta(where: $where) {
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
            total: response.data.preSetsMeta.count,
          };
        },
      };
    }

    if (resource === "PreSet" && type === "UPDATE") {
      const UEffects = params.data.effects;
      const PEffects = params.previousData.effects;

      return {
        query: gql`
          mutation updatePreSet(
            $data: PreSetUpdateInput!
            $where: PreSetWhereUniqueInput!
          ) {
            data: updatePreSet(data: $data, where: $where) {
              id
              name
              category
              imageUrl
              createdAt
              effects {
                id
                name
                typeOfEffect
                effectValues
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            category: params.data.category,
            effects: effectConnectorOnEditPreset(UEffects, PEffects),
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

    if (resource === "PreSet" && type === "GET_ONE") {
      return {
        query: gql`
          query preSet($where: PreSetWhereUniqueInput!) {
            data: preSet(where: $where) {
              id
              name
              category
              imageUrl
              createdAt
              effects {
                id
                name
                typeOfEffect
                effectValues
              }
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

    if (resource === "PreSet" && type === "CREATE") {
      return {
        query: gql`
          mutation createPreSet($data: PreSetCreateInput!) {
            data: createPreSet(data: $data) {
              id
              name
              category
              imageUrl
              createdAt
              effects {
                id
                name
                typeOfEffect
                effectValues
              }
              updatedAt
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            category: params.data.category,
            effects: effectConnectorOnCreatePreset(params.data.effects),
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "PreSet" && type === "DELETE") {
      return {
        query: gql`
          mutation deletePreSet($where: PreSetWhereUniqueInput!) {
            data: deletePreSet(where: $where) {
              id
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

    if (resource === "PreSet" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deletePreSets($where: PreSetWhereInput!) {
            data: deletePreSets(where: $where) {
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

    /* BPMS */

    if (resource === "Samples_BPM" && type === "GET_LIST") {
      return {
        query: gql`
          query allBpms(
            $take: Int
            $where: BpmWhereInput
            $orderBy: BpmOrderByInput
            $skip: Int
          ) {
            data: allBpms(
              take: $take
              where: $where
              orderBy: $orderBy
              skip: $skip
            ) {
              mp3Url
              id
              value
              audioUrl
              createdAt
            }
            bpmMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
          where: {
            ...(params.filter.value && {
              value_in: parseFloat(params.filter.value),
            }),
          },
          take: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.bpmMeta.count,
          };
        },
      };
    }

    if (resource === "Samples_BPM" && type === "GET_ONE") {
      return {
        query: gql`
          query bpm($where: BpmWhereUniqueInput!) {
            data: bpm(where: $where) {
              id
              mp3Url
              value
              audioUrl
              createdAt
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

    if (resource === "Samples_BPM" && type === "UPDATE") {
      return {
        query: gql`
          mutation updateBpm(
            $where: BpmWhereUniqueInput
            $data: BpmUpdateInput
          ) {
            data: updateBpm(where: $where, data: $data) {
              mp3Url
              id
              value
              audioUrl
              createdAt
            }
          }
        `,
        variables: {
          data: {
            value: params.data.value,
          },
          where: {
            id: params.id,
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Samples_BPM" && type === "GET_MANY") {
      return {
        query: gql`
          query allBpms($where: BpmWhereInput) {
            data: allBpms(where: $where) {
              mp3Url
              id
              value
              audioUrl
              createdAt
            }
            bpmMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id: { id_in: params.ids } },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.bpmMeta.count,
          };
        },
      };
    }

    if (resource === "Samples_BPM" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteBpm($where: BpmWhereUniqueInput) {
            data: deleteBpm(where: $where) {
              id
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

    if (resource === "Samples_BPM" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteBpm($where: BpmWhereUniqueInput) {
            data: deleteBpm(where: $where) {
              id
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: [response.data.deleteBpm],
          };
        },
      };
    }

    if (resource === "Samples_BPM" && type === "CREATE") {
      return {
        query: gql`
          mutation createBpm($data: BpmCreateInput!) {
            data: createBpm(data: $data) {
              id
            }
          }
        `,
        variables: {
          data: {
            value: params.data.value,
            mp3Url: localStorage.getItem("bpmmp3file"),
            audioUrl: localStorage.getItem("bpmaudiofile"),
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          localStorage.removeItem("bpmmp3file");
          localStorage.removeItem("bpmaudiofile");
          return {
            data: response.data.createBpm,
          };
        },
      };
    }

    /* Project Category */

    if (resource === "ProjectCategory" && type === "GET_ONE") {
      return {
        query: gql`
          query projectCategories($where: ProjectCategoryWhereInput) {
            data: projectCategories(where: $where) {
              id
              name
              Project {
                id
                name
                slug
                private
              }
            }
          }
        `,
        variables: {
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data[0],
          };
        },
      };
    }

    if (resource === "ProjectCategory" && type === "GET_LIST") {
      return {
        query: gql`
          query projectCategories(
            $where: ProjectCategoryWhereInput
            $orderBy: ProjectCategoryOrderByInput
            $take: Int
            $skip: Int
          ) {
            data: projectCategories(
              where: $where
              orderBy: $orderBy
              take: $take
              skip: $skip
            ) {
              id
              name
              Project {
                id
                name
                slug
                private
              }
            }
            projectCategoriesMeta(where: $where) {
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
            total: response.data.projectCategoriesMeta.count,
          };
        },
      };
    }

    if (resource === "ProjectCategory" && type === "UPDATE") {
      return {
        query: gql`
          mutation updateProjectCategory(
            $where: ProjectCategoryWhereUniqueInput!
            $data: ProjectCategoryUpdateInput
          ) {
            data: updateProjectCategory(where: $where, data: $data) {
              id
              name
              Project {
                id
                createdAt
                name
                slug
                status
                private
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
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

    if (resource === "ProjectCategory" && type === "CREATE") {
      return {
        query: gql`
          mutation createProjectCategory($data: ProjectCategoryCreateInput!) {
            data: createProjectCategory(data: $data) {
              id
              name
              Project {
                id
                name
                slug
                private
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
          },
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

    if (resource === "ProjectCategory" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteProjectCategories($where: ProjectCategoryWhereInput!) {
            data: deleteProjectCategories(where: $where) {
              count
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

    if (resource === "ProjectCategory" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteProjectCategories($where: ProjectCategoryWhereInput!) {
            data: deleteProjectCategories(where: $where) {
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
    /* Contests */

    if (resource === "Contest" && type === "GET_LIST") {
      return {
        query: gql`
          query AllContests($where: ContestWhereInput, $take: Int, $skip: Int) {
            data: allContests(where: $where, take: $take, skip: $skip) {
              id
              image
              bannerImage
              contestVideo
              bannerVideo
              termsAndConds
              allowTrackUpload
              prize
              title
              updatedAt
              baseProject {
                bpm
                clapsCount
                commentsCount
                id
                name
                pan
              }
              submittedProjects {
                highlighted
                id
                project {
                  id
                  name
                  owner {
                    id
                    name
                  }
                  views
                  commentsCount
                  clapsCount
                }
              }
              contestMedia {
                id
                bannerImage
                bannerVideo
                contestId
                contestVideo
                image
                stage
              }
              createdAt
              description
              endDate
              startDate
              owner {
                email
              }
            }
            contestMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: {
            ...((params.filter.title || params.filter.q) && {
              title_contains: params.filter.title || params.filter.q,
            }),
          },
          take: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.contestMeta.count,
          };
        },
      };
    }

    if (resource === "Contest" && type === "GET_ONE") {
      return {
        query: gql`
          query contest($where: ContestWhereUniqueInput!) {
            data: contest(where: $where) {
              id
              image
              bannerImage
              contestVideo
              bannerVideo
              termsAndConds
              allowTrackUpload
              prize
              title
              updatedAt
              baseProject {
                bpm
                clapsCount
                commentsCount
                id
                name
                pan
              }
              contestMedia {
                id
                image
                bannerImage
                bannerVideo
                contestVideo
                stage
              }
              submittedProjects {
                highlighted
                id
                project {
                  id
                  name
                  owner {
                    id
                    name
                  }
                  views
                  commentsCount
                  clapsCount
                }
              }
              createdAt
              description
              endDate
              startDate
              owner {
                email
              }
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

    if (resource === "Contest" && type === "UPDATE") {
      // delete params.data.id;
      // delete params.data.__typename;
      // delete params.data.createdAt;

      let CONTEST_MEDIA_EDIT_DATA = JSON.parse(
        localStorage.getItem("CONTEST_MEDIA_EDIT_DATA") as any
      );

      let startDate = new Date(params.data.startDate).toISOString();
      let endDate = new Date(params.data.endDate).toISOString();

      return {
        query: gql`
          mutation updateContest(
            $where: ContestWhereUniqueInput!
            $data: ContestUpdateInput
          ) {
            updateContest(where: $where, data: $data) {
              id
            }
          }
        `,
        variables: {
          data: {
            title: params.data.title,
            description: params.data.description,
            prize: params.data.prize,
            startDate: startDate,
            termsAndConds: params.data.termsAndConds,
            endDate: endDate,
            allowTrackUpload: params.data.allowTrackUpload,
            contestMedia: { update: CONTEST_MEDIA_EDIT_DATA },
            // image: localStorage.getItem("contest_image"),
            // bannerImage: localStorage.getItem("banner_image"),
            // baseProject: {
            //   connect: {
            //     id: params.data.baseProject.id,
            //   },
            // },
          },
          where: {
            id: params.id,
          },
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          // localStorage.removeItem("contest_image");
          // localStorage.removeItem("banner_image");
          localStorage.removeItem("CONTEST_MEDIA_EDIT_DATA");
          return {
            data: response.data.updateContest,
          };
        },
      };
    }

    if (resource === "Contest" && type === "GET_MANY") {
      return {
        query: gql`
          query allContests($skip: Int, $take: Int) {
            allContests(skip: $skip, take: $take) {
              id
              image
              bannerImage
              contestVideo
              bannerVideo
              termsAndConds
              allowTrackUpload
              title
              prize
              updatedAt
              baseProject {
                bpm
                clapsCount
                commentsCount
                id
                name
                pan
              }
              submittedProjects {
                highlighted
                id
                project {
                  id
                  name
                  owner {
                    id
                    name
                  }
                  views
                  commentsCount
                  clapsCount
                }
              }
              createdAt
              description
              endDate
              startDate
              owner {
                email
              }
            }
          }
        `,
        variables: {
          // orderBy: `${params.sort.field}_${params.sort.order}`,
          // where:  {id_in: idOfCode },
          // where: { id: {id_in :params.ids }},
          // tslint:disable-next-line:object-literal-sort-keys
          // first: params.pagination.perPage,
          // skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.allContests,
            total: response.data.allContests.length, // countResult.data.usersMeta.count,
          };
        },
      };
    }

    if (resource === "Contest" && type === "DELETE") {
      //console.log("in delete");
      return {
        query: gql`
          mutation deleteContests($where: ContestWhereInput!) {
            data: deleteContests(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            // total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Contest" && type === "DELETE_MANY") {
      //console.log("in delete Many");
      return {
        query: gql`
          mutation deleteContests($where: ContestWhereInput!) {
            data: deleteContests(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: [response.data.deleteContests],
            // total: response.data.getNewsItems.length,
          };
        },
      };
    }

    if (resource === "Contest" && type === "CREATE") {
      //console.log(params.data.title);

      //console.log(params.data.baseProject);

      let startDate = new Date(params.data.startDate).toISOString();

      let endDate = new Date(params.data.endDate).toISOString();

      let CONTEST_MEDIA_DATA = JSON.parse(
        localStorage.getItem("CONTEST_MEDIA_DATA") as any
      );
      //console.log("CONTEST_MEDIA_DATA", CONTEST_MEDIA_DATA);
      // let baseProject = params.data.project.id;
      let chatysie = {};
      if (params.data?.baseProject) {
        chatysie = {
          connect: {
            // id: baseProject,
            id: params.data.baseProject,
          },
        };
      } else {
        chatysie = {
          create: {
            name: params.data.title,
            status: "PUBLISH_IN_PROGRESS",
            // tracks: {
            //   create: [{}, {}, {}, {}],
            // },
            owner: {
              connect: {
                id: localStorage.getItem("user_id"),
              },
            },
          },
        };
      }

      return {
        query: gql`
          mutation createContest($data: ContestCreateInput!) {
            createContest(data: $data) {
              id
            }
          }
        `,
        // variables: params,
        variables: {
          data: {
            title: params.data.title,
            // image: localStorage.getItem("contest_image"),
            // bannerImage: localStorage.getItem("banner_image"),
            // contestVideo: localStorage.getItem("contest_video"),
            // bannerVideo: localStorage.getItem("banner_video"),
            allowTrackUpload: params.data.allowTrackUpload,
            description: params.data.description,
            prize: params.data.prize,
            termsAndConds: params.data.termsAndConds,
            endDate: endDate,
            startDate: startDate,
            owner: {
              connect: {
                id: localStorage.getItem("user_id"),
              },
            },
            // baseProject: {
            //   connect: {
            //     // id: baseProject,
            //     id: params.data.baseProject,
            //   },
            //   create: {
            //     name: params.data.title,
            //     status: "PUBLISH_IN_PROGRESS",
            //     // tracks: {
            //     //   create: [{}, {}, {}, {}],
            //     // },
            //     owner: {
            //       connect: {
            //         id: localStorage.getItem("user_id"),
            //       },
            //     },
            //   },
            // },
            baseProject: chatysie,
            contestMedia: {
              create: CONTEST_MEDIA_DATA,
            },
          },
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          localStorage.removeItem("contest_image");
          localStorage.removeItem("banner_image");
          localStorage.removeItem("contest_video");
          localStorage.removeItem("banner_video");

          return {
            data: response.data.createContest,
            // total: response.data.createContest.length,
          };
        },
      };
    }
    /* Referral Codes */
    if (resource === "ReferralCode" && type === "GET_LIST") {
      return {
        query: gql`
          query getAllReferralCodes(
            $where: ReferralCodeWhereInput
            $orderBy: ReferralCodeOrderByInput
            $skip: Int
            $take: Int
          ) {
            data: getAllReferralCodes(
              where: $where
              orderBy: $orderBy
              skip: $skip
              take: $take
            ) {
              id
              createdAt
              code
              ttl
              status
              email
            }
            referralCodesMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: {
            ...((params.filter.code || params.filter.q) && {
              code_contains: params.filter.code || params.filter.q,
            }),
          },
          orderBy: `${params.sort.field}_${params.sort.order}`,
          take: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.referralCodesMeta.count,
          };
        },
      };
    }

    if (resource === "ReferralCode" && type === "GET_MANY") {
      return {
        query: gql`
          query getAllReferralCodes($where: ReferralCodeWhereInput) {
            data: getAllReferralCodes(where: $where) {
              id
              createdAt
              code
              ttl
              status
              email
            }
            referralCodesMeta(where: $where) {
              count
            }
          }
        `,
        variables: { where: { id: { id_in: params.ids } } },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.referralCodesMeta.count,
          };
        },
      };
    }

    if (resource === "ReferralCode" && type === "UPDATE") {
      return {
        query: gql`
          mutation updateReferralCode(
            $where: ReferralCodeWhereUniqueInput!
            $data: ReferralCodeUpdateInput!
          ) {
            data: updateReferralCode(where: $where, data: $data) {
              id
              createdAt
              code
              ttl
              status
              email
            }
          }
        `,
        variables: {
          data: {
            code: params.data.code,
            email: params.data.email,
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

    if (resource === "ReferralCode" && type === "GET_ONE") {
      return {
        query: gql`
          query getReferralCode($where: ReferralCodeWhereUniqueInput!) {
            data: getReferralCode(where: $where) {
              id
              createdAt
              code
              ttl
              status
              email
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

    if (resource === "ReferralCode" && type === "CREATE") {
      return {
        query: gql`
          mutation createReferralCode($data: ReferralCodeCreateInput!) {
            data: createReferralCode(data: $data) {
              id
              createdAt
              code
              ttl
              status
              email
            }
          }
        `,
        variables: params,
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "ReferralCode" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteReferralCodes($where: ReferralCodeWhereInput!) {
            data: deleteReferralCodes(where: $where) {
              count
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

    if (resource === "ReferralCode" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteReferralCodes($where: ReferralCodeWhereInput!) {
            data: deleteReferralCodes(where: $where) {
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
