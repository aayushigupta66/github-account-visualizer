import gql from 'graphql-tag';

/**
 * Interface for the query that includes the viewer object.
 */
export interface QueryResult {
    viewer: Viewer;
}

/**
 * Interface for the viewer object that contains information strings and objects for the repository screen.
 */
interface Viewer {
    repositories: Repositories;
}

/**
 * Interface for the repositories object that contains a list of nodes.
 */
interface Repositories {
    nodes: Node[];
}

/**
 * Interface for the node object that contains the name, owner, and description of the current repository.
 */
interface Node {
    name: string;
    owner: Owner;
    description: string;
}

/**
 * Interface for the owner object that contains the login.
 */
interface Owner {
    login: string;
}

/**
 * Query for the API to request the required information for the profile screen.
 */
export const GET_REPOSITORY = gql`
    query repository {
      viewer {
        repositories(first: 10) {
          nodes {
            name
            owner {
              login
            }
            description
          }
        }
      }
    }
`;