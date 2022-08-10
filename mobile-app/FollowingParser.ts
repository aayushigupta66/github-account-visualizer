import gql from 'graphql-tag';

/**
 * Interface for the query that includes the viewer object.
 */
export interface QueryResult {
    viewer: Viewer;
}

/**
 * Interface for the viewer object that contains information strings and objects for the following screen.
 */
interface Viewer {
    following: Following;
}

/**
 * Interface for the following object that contains a list of nodes.
 */
interface Following {
    nodes: Node[];
}

/**
 * Interface for the node object that contains the avatar picture, name, and username of the current following.
 */
interface Node {
    avatarUrl: string;
    name: string;
    login: string;
}

/**
 * Query for the API to request the required information for the following screen.
 */
export const GET_FOLLOWING = gql`
    query following {
      viewer {
        following(first: 10) {
          nodes {
            avatarUrl
            name
            login
          }
        }
      }
    }
`;