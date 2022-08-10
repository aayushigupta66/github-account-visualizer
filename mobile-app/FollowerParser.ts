import gql from 'graphql-tag';

/**
 * Interface for the query that includes the viewer object.
 */
export interface QueryResult {
    viewer: Viewer;
}

/**
 * Interface for the viewer object that contains information strings and objects for the followers screen.
 */
interface Viewer {
    followers: Followers;
}

/**
 * Interface for the followers object that contains a list of nodes.
 */
interface Followers {
    nodes: Node[];
}

/**
 * Interface for the node object that contains the avatar picture, name, and username of the current follower.
 */
interface Node {
    avatarUrl: string;
    name: string;
    login: string;
}

/**
 * Query for the API to request the required information for the followers screen.
 */
export const GET_FOLLOWERS = gql`
    query follower {
      viewer {
        followers(first: 10) {
          nodes {
            avatarUrl
            name
            login
          }
        }
      }
    }
`;