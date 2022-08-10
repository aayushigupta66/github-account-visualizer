import gql from 'graphql-tag';

/**
 * Interface for the query that includes the viewer object.
 */
export interface QueryResult {
    viewer: Viewer;
}

/**
 * Interface for the viewer object that contains information strings and objects for the profile screen.
 */
interface Viewer {
    name: string;
    login: string;
    bio: string;
    avatarUrl: string;
    websiteUrl: string;
    email: string;
    createdAt: string;
    repositories: Repositories;
    followers: Followers;
    following: Following;
}

/**
 * Interface for the repository object that contains the totalCount.
 */
interface Repositories {
    totalCount: string;
}

/**
 * Interface for the followers object that contains the totalCount.
 */
interface Followers {
    totalCount: string;
}

/**
 * Interface for the following object that contains the totalCount.
 */
interface Following {
    totalCount: string;
}

/**
 * Query for the API to request the required information for the profile screen.
 */
export const GET_PROFILE = gql`
    query profile {
      viewer {
        name
        login
        bio
        avatarUrl
        websiteUrl
        email
        createdAt
        repositories {
          totalCount
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
`;
