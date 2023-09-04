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
  bpmConnectorOnEditSamples,
  categoriesConnectorInProjEdit,
  connectGenreInProjectCreate,
  connectMusicInstruInProjectCreate,
  connectSamplesInSampSetCreate,
  connectTracksInProjectCreate,
  createBPMsOnCreateSamples,
  effectConnectorOnCreatePreset,
  effectConnectorOnEditPreset,
  genreConnectorOnEditProject,
  musicalInstrConnectorOnEditProject,
  musicallnstrumentConnector,
  RandomAvatars,
  samplesConnectorOnEditSamplesSet,
  tracksConnectorOnEditProject,
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
    case "samples":
      return "Sample";
    case "tracks":
      return "Track";
    case "projects":
      return "Project";
    case "comments":
      return "Comment";
    case "newsitems":
      return "NewsItems";
    case "samplesets":
      return "SampleSet";
    case "timelineitems":
      return "Timelineitem";
    case "notification":
      return "Notification";
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
              name_contains: params.filter.name || params.filter.q,
            }),
            ...((params.filter.artistName || params.filter.q) && {
              artistName_contains: params.filter.artistName || params.filter.q,
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
        variables: {
          variables: { where: { id: { id_in: params.ids } } },
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
    /* Samples */
    if (resource === "Sample" && type === "GET_LIST") {
      return {
        query: gql`
          query samples(
            $orderBy: SampleOrderByInput
            $where: SampleWhereInput
            $first: Int
            $skip: Int
          ) {
            data: samples(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              name
              createdAt
              createdBy {
                id
                name
              }
              format
              samplerate
              bpm
              bpmTemp {
                id
                audioUrl
                createdAt
                mp3Url
                value
              }
              instrument
              genre {
                id
                name
                description
              }
              sampleLengthBeats
              sampleLengthMicros
              baseTone
              scaleMode
              url

              tags {
                id
              }
              sets {
                id
                name
                description
              }
            }
            samplesMeta(where: $where) {
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
            ...(params.filter.bpm && {
              bpmTemp_some: {
                value: parseFloat(params.filter.bpm),
              },
            }),
          },
          first: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.samplesMeta.count,
          };
        },
      };
    }
    if (resource === "Sample" && type === "GET_MANY") {
      return {
        query: gql`
          query samples($where: SampleWhereInput) {
            data: samples(where: $where) {
              id
              name
              createdAt
              createdBy {
                id
                name
              }
              format
              samplerate
              bpm
              bpmTemp {
                id
                audioUrl
                createdAt
                mp3Url
                value
              }
              instrument
              genre {
                id
                name
                description
              }
              sampleLengthBeats
              sampleLengthMicros
              baseTone
              scaleMode
              url
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
          };
        },
      };
    }
    if (resource === "Sample" && type === "GET_ONE") {
      return {
        query: gql`
          query sample($where: SampleWhereUniqueInput!) {
            data: sample(where: $where) {
              id
              name
              createdAt
              createdBy {
                id
                name
              }
              format
              samplerate
              bpm
              bpmTemp {
                id
                audioUrl
                createdAt
                mp3Url
                value
              }
              instrument
              genre {
                id
                name
                description
              }
              sampleLengthBeats
              sampleLengthMicros
              baseTone
              scaleMode
              url
              tags {
                id
              }
              sets {
                id
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
    if (resource === "Sample" && type === "CREATE") {
      let BPM_DATA: any;
      if (localStorage.getItem("BPM_DATA") !== undefined) {
        BPM_DATA = JSON.parse(localStorage.getItem("BPM_DATA") as any);
      }
      return {
        query: gql`
          mutation createSample($data: SampleCreateInput!) {
            data: createSample(data: $data) {
              id
              name
              createdAt
              createdBy {
                id
                name
              }
              format
              samplerate
              bpm
              bpmTemp {
                id
                audioUrl
                createdAt
                mp3Url
                value
              }
              instrument
              genre {
                id
                name
                description
              }
              sampleLengthBeats
              sampleLengthMicros
              baseTone
              scaleMode
              url

              tags {
                id
              }
              sets {
                id
                name
                description
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            description: params.data.description,
            format: params.data.format,
            samplerate: params.data.samplerate,
            instrument: params.data.instrument,
            ...(BPM_DATA !== undefined && {
              bpmTemp: createBPMsOnCreateSamples(BPM_DATA),
            }),
            createdBy: { connect: { id: params.data.createdBy.id } },
            genre: { connect: { id: params.data.genre.id } },
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
    if (resource === "Sample" && type === "UPDATE") {
      const cbpms = params.data.bpmTemp;
      const pbpms = params.previousData.bpmTemp;
      return {
        query: gql`
          mutation updateSample(
            $data: SampleUpdateInput!
            $where: SampleWhereUniqueInput!
          ) {
            data: updateSample(data: $data, where: $where) {
              id
              name
              createdAt
              createdBy {
                id
                name
              }
              format
              samplerate
              bpm
              bpmTemp {
                id
                value
              }
              instrument
              genre {
                id
                name
                description
              }
              sampleLengthBeats
              sampleLengthMicros
              baseTone
              scaleMode
              url

              tags {
                id
              }
              sets {
                id
                name
                description
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            description: params.data.description,
            format: params.data.format,
            samplerate: params.data.samplerate,
            bpmTemp: bpmConnectorOnEditSamples(cbpms, pbpms),
            instrument: params.data.instrument,
            createdBy: { connect: { id: params.data.createdBy.id } },
            genre: { connect: { id: params.data.genre.id } },
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
    if (resource === "Sample" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteSample($where: SampleWhereUniqueInput!) {
            data: deleteSample(where: $where) {
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
    if (resource === "Sample" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteSamples($where: SampleWhereInput!) {
            data: deleteSamples(where: $where) {
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

    /* Tracks */
    if (resource === "Track" && type === "GET_ONE") {
      return {
        query: gql`
          query Track($filter: TrackWhereUniqueInput!) {
            data: Track(filter: $filter) {
              id
              order
              volume
              pan
              isMuted
              isSolo
              project {
                id
                name
              }
            }
          }
        `,
        variables: { filter: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          //console.log(response.data.data.project);
          return {
            data: response.data.data,
            total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Track" && type === "GET_LIST") {
      return {
        query: gql`
          query allTracks(
            $orderBy: TrackOrderByInput!
            $skip: Int!
            $take: Int!
            $filter: TrackWhereInput
          ) {
            data: allTracks(
              orderBy: $orderBy
              skip: $skip
              take: $take
              filter: $filter
            ) {
              id
              order
              volume
              createdAt
              pan
              isMuted
              isSolo
              project {
                id
                name
              }
            }
            trackMeta(filter: $filter) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
          filter: {
            ...((params.filter.id || params.filter.q) && {
              id_contains: params.filter.id || params.filter.q,
            }),
            ...(params.filter.order && {
              order: params.filter.order,
            }),
            ...(params.filter.isMuted && {
              isMuted: params.filter.isMuted,
            }),
            ...(params.filter.isSolo && {
              isSolo: params.filter.isSolo,
            }),
          },
          take: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.trackMeta.count,
          };
        },
      };
    }

    if (resource === "Track" && type === "GET_MANY") {
      return {
        query: gql`
          query allTracks(
            $orderBy: TrackOrderByInput
            $filter: TrackWhereInput
          ) {
            data: allTracks(orderBy: $orderBy, filter: $filter) {
              id
              order
              volume
              pan
              isMuted
              isSolo
              project {
                id
                name
              }
            }
            trackMeta(filter: $filter) {
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
            total: response.data.trackMeta.count,
          };
        },
      };
    }

    if (resource === "Track" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteTrack($where: TrackWhereUniqueInput!) {
            data: deleteTrack(where: $where) {
              id
              order
              volume
              pan
              isMuted
              isSolo
              project {
                id
                name
              }
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

    if (resource === "Track" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteTracks($where: TrackWhereInput!) {
            data: deleteTracks(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: { id_in: params.ids },
        },
        // options: {fetchPolicy: 'network-only'},
        parseResponse: (response: any) => {
          return {
            data: [response.data.data],
          };
        },
      };
    }

    if (resource === "Track" && type === "CREATE") {
      return {
        query: gql`
          mutation CreateTrack(
            $projectId: ID
            $order: Int
            $isMuted: Boolean
            $isSolo: Boolean
            $volume: Float
            $pan: Float
          ) {
            createTrack(
              projectId: $projectId
              order: $order
              isMuted: $isMuted
              isSolo: $isSolo
              volume: $volume
              pan: $pan
            ) {
              id
            }
          }
        `,
        options: { fetchPolicy: "network-only" },
        variables: {
          projectId: { connect: { id: params.data.project.id } },
          order: params.data.order,
          isMuted: params.data.isMuted,
          isSolo: params.data.isSolo,
          volume: params.data.volume,
          pan: params.data.pan,
        },
        parseResponse: (response: any) => {
          return {
            data: response.data.createTrack,
          };
        },
      };
    }

    if (resource === "Track" && type === "UPDATE") {
      return {
        query: gql`
          mutation updateTrack(
            $data: TrackUpdateInput!
            $where: TrackWhereUniqueInput!
          ) {
            data: updateTrack(data: $data, where: $where) {
              id
              order
              volume
              pan
              isMuted
              isSolo
              project {
                id
                name
              }
            }
          }
        `,
        variables: {
          data: {
            order: params.data.order,
            isMuted: params.data.isMuted,
            isSolo: params.data.isSolo,
            volume: params.data.volume,
            pan: params.data.pan,
            project: {
              connect: {
                id: params.data.project.id,
              },
            },
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

    /* Projects */

    if (resource === "Project" && type === "GET_ONE") {
      return {
        query: gql`
          query ProjectV1($filter: ProjectWhereUniqueInput!) {
            data: ProjectV1(filter: $filter) {
              id
              createdAt
              name
              slug
              private
              rating
              description
              availableFrom
              owner {
                id
                email
                name
                artistName
              }
              tracks {
                id
              }
              contestProject {
                id
              }
              category {
                id
                name
              }
              genres {
                name
                id
              }
              musicalInstruments {
                id
                name
                rank
              }
              status
              recordingsCount
              derivedProjectsCount
              timelineItemsCount
              tracksCount
              clapsCount
              commentsCount
              mixdownVideo
              mixdownPath
              mixdownAudio
              mixdownScreen
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

    if (resource === "Project" && type === "GET_LIST") {
      return {
        query: gql`
          query AllProjectsV1(
            $filter: ProjectWhereInput
            $orderBy: ProjectOrderByInput
            $skip: Int
            $take: Int
          ) {
            data: allProjectsV1(
              filter: $filter
              orderBy: $orderBy
              skip: $skip
              take: $take
            ) {
              id
              createdAt
              name
              bpm
              rating
              status
              slug
              publishedAt
              private
              description
              availableFrom
              owner {
                id
                email
                name
                artistName
              }
              tracks {
                id
                createdAt
              }
              genres {
                id
                name
              }
              contestProject {
                id
              }
              category {
                id
                name
              }
              musicalInstruments {
                id
                name
                rank
              }
              status
              recordingsCount
              derivedProjectsCount
              timelineItemsCount
              tracksCount
              clapsCount
              commentsCount
              mixdownVideo
              mixdownPath
              mixdownAudio
              mixdownScreen
            }
            projectsMeta(where: $filter) {
              count
            }
          }
        `,
        variables: {
          filter: {
            ...(params?.filter?.status && { status: params.filter.status }),
            ...((params.filter.name || params.filter.q) && {
              name_contains: params.filter.name || params.filter.q,
            }),
            ...(params?.filter?.filterByCat && {
              category_some: { name: params.filter.filterByCat },
            }),
            ...(params?.filter?.rating && {
              rating: params.filter.rating,
            }),
            ...(params?.filter?.private && { private: params.filter.private }),
            ...(params?.filter?.email && {
              owner: { email: params.filter.email },
            }),
          },
          orderBy: `${params.sort.field}_${params.sort.order}`,
          skip: params.pagination.perPage * (params.pagination.page - 1),
          take: params.pagination.perPage,
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.projectsMeta.count,
          };
        },
      };
    }

    if (resource === "Project" && type === "GET_MANY") {
      return {
        query: gql`
          query AllProjectsV1(
            $filter: ProjectWhereInput
            $orderBy: ProjectOrderByInput
          ) {
            data: allProjectsV1(filter: $filter, orderBy: $orderBy) {
              id
              createdAt
              name
              bpm
              slug
              publishedAt
              rating
              private
              description
              availableFrom
              owner {
                id
                email
                name
                artistName
              }
              tracks {
                id
              }
              contestProject {
                id
              }
              category {
                id
                name
              }
              genres {
                id
                name
              }
              musicalInstruments {
                id
                name
                rank
              }
              status
              recordingsCount
              derivedProjectsCount
              timelineItemsCount
              tracksCount
              clapsCount
              commentsCount
              mixdownVideo
              mixdownPath
              mixdownAudio
              mixdownScreen
            }
            projectsMeta(where: $filter) {
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
            total: response.data.projectsMeta.count,
          };
        },
      };
    }

    if (resource === "Project" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteProject($where: ProjectWhereUniqueInput!) {
            data: deleteProject(where: $where) {
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

    if (resource === "Project" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteProjects($where: ProjectWhereInput!) {
            data: deleteProjects(where: $where) {
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

    if (resource === "Project" && type === "CREATE") {
      const currentUser = localStorage.getItem("user_id");
      const cmi = params.data.musicalInstruments;
      const cg = params.data.genres;
      const ct = params.data.tracks;
      return {
        query: gql`
          mutation createProject($data: ProjectCreateInput!) {
            data: createProject(data: $data) {
              id
              createdAt
              name
              bpm
              slug
              rating
              private
              description
              availableFrom
              owner {
                id
                email
                name
                artistName
              }
              tracks {
                id
              }
              contestProject {
                id
              }
              genres {
                name
                id
              }
              musicalInstruments {
                id
                name
                rank
              }
              status
              recordingsCount
              derivedProjectsCount
              timelineItemsCount
              tracksCount
              clapsCount
              commentsCount
              mixdownVideo
              mixdownPath
              mixdownScreen
            }
          }
        `,

        variables: {
          data: {
            name: params.data.name,
            bpm: params.data.bpm,
            description: params.data.description,
            private: params.data.private,
            slug: params.data.slug,
            mixdownVideo: params.data.mixdownVideo,
            mixdownPath: params.data.mixdownPath,
            mixdownScreen: params.data.mixdownScreen,
            owner: {
              connect: { id: params.data.owner.id || currentUser },
            },
            tracks: connectTracksInProjectCreate(ct),
            genres: connectGenreInProjectCreate(cg),
            musicalInstruments: connectMusicInstruInProjectCreate(cmi),
            rating: params.data.rating,
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

    if (resource === "Project" && type === "UPDATE") {
      const cmi = params.data.musicalInstruments;
      const pmi = params.previousData.musicalInstruments;
      const cg = params.data.genres;
      const pg = params.previousData.genres;
      const ct = params.data.tracks;
      const pt = params.previousData.tracks;
      const ccat = params.data.category;
      const pcat = params.previousData.category;
      const AddpreDefine = params.data.AddpreDefinedCatagories;
      return {
        query: gql`
          mutation updateProject(
            $data: ProjectUpdateInput!
            $where: ProjectWhereUniqueInput!
          ) {
            data: updateProject(data: $data, where: $where) {
              id
              createdAt
              name
              bpm
              slug
              rating
              private
              description
              availableFrom
              contestProject {
                id
              }
              genres {
                name
                id
              }
              musicalInstruments {
                id
                name
                rank
              }
              status
              recordingsCount
              derivedProjectsCount
              timelineItemsCount
              tracksCount
              clapsCount
              commentsCount
              mixdownVideo
              mixdownPath
              mixdownScreen
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            // bpm: params.data.bpm,
            description: params.data.description,
            private: params.data.private,
            slug: params.data.slug,
            mixdownVideo: params.data.mixdownVideo,
            mixdownPath: params.data.mixdownPath,
            // mixdownScreen: params.data.mixdownScreen,
            // owner: params.data.owner,
            category: categoriesConnectorInProjEdit(AddpreDefine, ccat, pcat),
            availableFrom: new Date(params.data.availableFrom).toISOString(),
            tracks: tracksConnectorOnEditProject(ct, pt),
            genres: genreConnectorOnEditProject(cg, pg),
            musicalInstruments: musicalInstrConnectorOnEditProject(cmi, pmi),
            rating: params.data.rating,
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

    /* Comments */
    if (resource === "Comment" && type === "GET_LIST") {
      return {
        query: gql`
          query CommentsV1(
            $orderBy: CommentOrderByInput
            $where: CommentWhereInput
            $first: Int
            $skip: Int
          ) {
            data: commentsV1(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              createdAt
              text
              owner {
                id
                name
                email
              }
              project {
                id
                name
              }
            }
            commentsMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
          where: {
            text_contains: params.filter.text || params.filter.q,
          },
          first: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.commentsMeta.count,
          };
        },
      };
    }

    if (resource === "Comment" && type === "GET_MANY") {
      return {
        query: gql`
          query CommentsV1(
            $orderBy: CommentOrderByInput
            $where: CommentWhereInput
            $first: Int
            $skip: Int
          ) {
            data: commentsV1(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              createdAt
              text
              owner {
                id
                name
                email
              }
              project {
                id
                name
              }
            }
            commentsMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
          // where: {name_contains: params.filter.name},
          // tslint:disable-next-line:object-literal-sort-keys
          first: params.pagination.perPage,
          skip: params.pagination.perPage * (params.pagination.page - 1),
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.commentsMeta.count, // countResult.data.usersMeta.count,
          };
        },
      };
    }

    if (resource === "Comment" && type === "UPDATE") {
      delete params.data.id;
      delete params.data.__typename;
      delete params.data.createdAt;
      const idUser = params.data.owner.id;
      const idProject = params.data.project.id;
      params.data.owner = { connect: { id: idUser } };
      params.data.project = { connect: { id: idProject } };
      return {
        query: gql`
          mutation updateComment(
            $data: CommentUpdateInput!
            $where: CommentWhereUniqueInput!
          ) {
            data: updateComment(data: $data, where: $where) {
              id
              owner {
                id
              }
              project {
                id
              }
            }
          }
        `,
        variables: {
          data: params.data,
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "Comment" && type === "GET_ONE") {
      return {
        query: gql`
          query comment($where: CommentWhereUniqueInput!) {
            data: comment(where: $where) {
              id
              createdAt
              owner {
                id
                email
              }
              project {
                id
                name
              }
              text
            }
          }
        `,
        variables: { where: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Comment" && type === "CREATE") {
      return {
        query: gql`
          mutation createComment($data: CommentCreateInput!) {
            data: createComment(data: $data) {
              text
              id
              owner {
                name
                id
                email
              }
              project {
                id
                name
              }
            }
          }
        `,
        variables: {
          data: {
            text: params.data.text,
            owner: { connect: { id: params.data.owner.id } },
            project: { connect: { id: params.data.project.id } },
          },
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

    if (resource === "Comment" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteComment($where: CommentWhereUniqueInput!) {
            data: deleteComment(where: $where) {
              id
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

    if (resource === "Comment" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteComments($where: CommentWhereInput!) {
            data: deleteComments(where: $where) {
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
            data: [response.data.data],
            // total: response.data.data.length,
          };
        },
      };
    }
    /* NewsItems */
    if (resource === "NewsItems" && type === "GET_LIST") {
      return {
        query: gql`
          query getNewsItems(
            $where: NewsItemWhereInput
            $orderBy: NewsItemOrderByInput
            $skip: Int
            $take: Int
          ) {
            data: getNewsItems(
              where: $where
              orderBy: $orderBy
              skip: $skip
              take: $take
            ) {
              createdAt
              description
              id
              imageCoverPath
              publicationEnd
              publicationStart
              title
              url
            }
            newsItemsMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          orderBy: `${params.sort.field}_${params.sort.order}`,
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
            total: response.data.newsItemsMeta.count,
          };
        },
      };
    }

    if (resource === "NewsItems" && type === "GET_ONE") {
      return {
        query: gql`
          query getNewsItem($where: NewsItemWhereUniqueInput!) {
            data: getNewsItem(where: $where) {
              createdAt
              description
              id
              imageCoverPath
              publicationEnd
              publicationStart
              title
              url
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

    if (resource === "NewsItems" && type === "UPDATE") {
      let pubstart = new Date(params.data.publicationStart).toISOString();
      let pubend = new Date(params.data.publicationEnd).toISOString();
      return {
        query: gql`
          mutation updateNewsItem(
            $data: NewsItemUpdateInput!
            $where: NewsItemWhereUniqueInput
          ) {
            updateNewsItem(data: $data, where: $where) {
              id
              title
              url
              createdAt
              imageCoverPath
              description
              publicationStart
              publicationEnd
            }
          }
        `,
        variables: {
          data: {
            url: params.data.url,
            title: params.data.title,
            imageCoverPath: params.data.imageCoverPath,
            description: params.data.description,
            publicationStart: pubstart,
            publicationEnd: pubend,
          },
          where: {
            id: params.id,
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.updateNewsItem,
          };
        },
      };
    }

    if (resource === "NewsItems" && type === "GET_MANY") {
      return {
        query: gql`
          query getNewsItems($where: NewsItemWhereInput) {
            data: getNewsItems(where: $where) {
              id
              url
              title
              createdAt
              description
              imageCoverPath
              publicationEnd
              publicationStart
            }
            newsItemsMeta(where: $where) {
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
            total: response.data.newsItemsMeta.count,
          };
        },
      };
    }

    if (resource === "NewsItems" && type === "DELETE") {
      return {
        query: gql`
          mutation DeleteNewsItem($where: NewsItemWhereUniqueInput!) {
            data: deleteNewsItem(where: $where) {
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

    if (resource === "NewsItems" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteNewsItemMany($where: NewsItemWhereInput!) {
            data: deleteNewsItemMany(where: $where) {
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

    if (resource === "NewsItems" && type === "CREATE") {
      return {
        query: gql`
          mutation createNewsItem($data: NewsItemCreateInput!) {
            createNewsItem(data: $data) {
              id
              url
              title
              createdAt
              description
              imageCoverPath
              publicationEnd
              publicationStart
            }
          }
        `,
        variables: {
          data: {
            url: params.data.url,
            title: params.data.title,
            imageCoverPath: params.data.imageCoverPath,
            description: params.data.description,
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.createNewsItem,
          };
        },
      };
    }

    /* Samples Sets */
    if (resource === "SampleSet" && type === "GET_LIST") {
      return {
        query: gql`
          query sampleSets(
            $orderBy: SampleSetOrderByInput
            $where: SampleSetWhereInput
            $first: Int
            $skip: Int
          ) {
            data: sampleSets(
              orderBy: $orderBy
              where: $where
              first: $first
              skip: $skip
            ) {
              id
              createdAt
              name
              description
              owner {
                name
                id
              }
              samples {
                id
                name
              }
              genre {
                id
                name
              }
            }
            sampleSetsMeta(where: $where) {
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
            total: response.data.sampleSetsMeta.count,
          };
        },
      };
    }

    if (resource === "SampleSet" && type === "GET_MANY") {
      return {
        query: gql`
          query sampleSets($where: SampleSetWhereInput) {
            data: sampleSets(where: $where) {
              id
              createdAt
              name
              description
              owner {
                name
                id
              }
              samples {
                id
                name
              }
              genre {
                id
                name
              }
            }
            sampleSetsMeta(where: $where) {
              count
            }
          }
        `,
        variables: {
          where: {
            id_in: params.ids,
          },
        },
        options: { fetchPolicy: "network-only" },
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.sampleSetsMeta.count,
          };
        },
      };
    }

    if (resource === "SampleSet" && type === "UPDATE") {
      const csamples = params.data.samples;
      const psamples = params.previousData.samples;
      return {
        query: gql`
          mutation updateSampleSet(
            $data: SampleSetUpdateInput!
            $where: SampleSetWhereUniqueInput!
          ) {
            data: updateSampleSet(data: $data, where: $where) {
              id
              createdAt
              name
              description
              owner {
                name
                id
              }
              samples {
                id
                name
              }
              genre {
                id
                name
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            owner: { connect: { id: params.data.owner.id } },
            genre: { connect: { id: params.data.genre.id } },
            description: params.data.description,
            samples: samplesConnectorOnEditSamplesSet(csamples, psamples),
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

    if (resource === "SampleSet" && type === "GET_ONE") {
      return {
        query: gql`
          query sampleSet($where: SampleSetWhereUniqueInput!) {
            data: sampleSet(where: $where) {
              id
              createdAt
              name
              description
              owner {
                name
                id
              }
              samples {
                id
                name
              }
              genre {
                id
                name
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
            data: response.data.data,
          };
        },
      };
    }

    if (resource === "SampleSet" && type === "CREATE") {
      return {
        query: gql`
          mutation createSampleSet($data: SampleSetCreateInput!) {
            data: createSampleSet(data: $data) {
              id
              createdAt
              name
              description
              owner {
                name
                id
              }
              samples {
                id
                name
              }
              genre {
                id
                name
              }
            }
          }
        `,
        variables: {
          data: {
            name: params.data.name,
            description: params.data.description,
            owner: { connect: { id: params.data.owner.id } },
            genre: { connect: { id: params.data.genre.id } },
            samples: connectSamplesInSampSetCreate(params.data.samples),
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

    if (resource === "SampleSet" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteSampleSet($where: SampleSetWhereUniqueInput!) {
            data: deleteSampleSet(where: $where) {
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

    if (resource === "SampleSet" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteSampleSets($where: SampleSetWhereInput!) {
            data: deleteSampleSets(where: $where) {
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

    /* Timeline Items */
    if (resource === "Timelineitem" && type === "GET_ONE") {
      return {
        query: gql`
          query TimelineItem($where: TimelineItemWhereUniqueInput!) {
            data: timelineItem(where: $where) {
              id
              type
              text
              startStickyDate
              endStickyDate
              weight
              relatedProject {
                id
                name
              }
              owner {
                id
                name
              }
            }
          }
        `,
        variables: { where: { id: params.id } },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Timelineitem" && type === "GET_LIST") {
      return {
        query: gql`
          query AllTimelineItems(
            $filter: TimelineItemWhereInput
            $orderBy: TimelineItemOrderByInput
            $take: Int
            $skip: Int
          ) {
            data: allTimelineItems(
              filter: $filter
              orderBy: $orderBy
              take: $take
              skip: $skip
            ) {
              id
              type
              text
              createdAt
              startStickyDate
              endStickyDate
              weight
              relatedProject {
                id
                name
              }
              owner {
                id
                name
              }
            }
            timelineItemsMeta(where: $filter) {
              count
            }
          }
        `,
        variables: {
          filter: {
            ...((params.filter.text || params.filter.q) && {
              text_contains: params.filter.text || params.filter.q,
            }),
            ...((params.filter.type || params.filter.q) && {
              type_in: params.filter.type || params.filter.q,
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
            total: response.data.timelineItemsMeta.count,
          };
        },
      };
    }

    if (resource === "Timelineitem" && type === "GET_MANY") {
      return {
        query: gql`
          query GetLastGlobalTimelineItem(
            $where: TimelineItemWhereInput
            $orderBy: TimelineItemOrderByInput
          ) {
            data: timelineItems(orderBy: $orderBy, where: $where) {
              id
              type
              text
              startStickyDate
              endStickyDate
              weight
              relatedProject {
                id
                name
              }
              owner {
                id
                name
              }
            }
          }
        `,
        variables: {},
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Timelineitem" && type === "DELETE") {
      return {
        query: gql`
          mutation deleteTimelineItem($where: TimelineItemWhereUniqueInput!) {
            data: deleteTimelineItem(where: $where) {
              id
            }
          }
        `,
        // variables: {
        //     where: params.id
        // },
        variables: { where: { id: params.id } },
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

    if (resource === "Timelineitem" && type === "DELETE_MANY") {
      return {
        query: gql`
          mutation deleteTimelineItems($where: TimelineItemWhereInput!) {
            data: deleteTimelineItems(where: $where) {
              count
            }
          }
        `,

        variables: {
          where: { id_in: params.ids },
        },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: [response.data.data],
            // total: response.data.data.length,
          };
        },
      };

      // fet.then(() => {

      // })
      //
    }

    if (resource === "Timelineitem" && type === "CREATE") {
      return {
        query: gql`
          mutation createTimelineItem($data: TimelineItemCreateInput!) {
            data: createTimelineItem(data: $data) {
              id
              type
              text
              startStickyDate
              endStickyDate
              weight
              relatedProject {
                id
                name
              }
              owner {
                id
                name
              }
            }
          }
        `,
        variables: {
          data: {
            type: params.data.type,
            text: params.data.text,
            // owner : params.data.owner,
          },
        },
        // tslint:disable-next-line:object-literal-sort-keys
        parseResponse: (response: any) => {
          return {
            data: response.data.data,
            // total: response.data.data.length,
          };
        },
      };
    }

    if (resource === "Timelineitem" && type === "UPDATE") {
      // const idUser = params.data.owner.id
      // params.data.owner = { connect: { id: idUser } }
      delete params.data.id;
      delete params.data.__typename;
      delete params.data.createdAt;
      delete params.data.relatedProject;
      if (params.data.endStickyDate === "") {
        params.data.endStickyDate = null;
      }
      if (params.data.startStickyDate === "") {
        params.data.startStickyDate = null;
      }
      return {
        query: gql`
          mutation updateTimelineItem(
            $data: TimelineItemUpdateInput!
            $where: TimelineItemWhereUniqueInput!
          ) {
            data: updateTimelineItem(data: $data, where: $where) {
              id
              type
              text
              startStickyDate
              endStickyDate
              weight
              relatedProject {
                id
                name
              }
              owner {
                id
                name
              }
            }
          }
        `,
        variables: {
          data: {
            type: params.data.type,
            text: params.data.text,
            // owner : params.data.owner,
            // weight : params.data.weight,
            // startStickyDate : params.data.startStickyDate,
            // endStickyDate : params.data.endStickyDate,
          },
          // data: params.data,
          where: { id: params.id },
        },
        options: { fetchPolicy: "network-only" },
        // tslint:disable-next-line:object-literal-sort-keys
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
