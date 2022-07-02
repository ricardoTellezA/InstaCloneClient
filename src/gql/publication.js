import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;

export const GET_PUBLICATIONS = gql`
query getPublication($username:String!){
  getPublication(username:$username){
    id
    idUser
    file
    typeFile
 
  }
}

`;

export const GET_PUBLICATIONS_FOLLOW = gql`
query getPublicationsFollowers{
  getPublicationsFollowers {
    id
    idUser {
      name
      username
      avatar
    }
    file
    typeFile
    createAt
  }
} 
`;
