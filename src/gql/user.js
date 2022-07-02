import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser($input: UserInput!) {
    register(input: $input) {
      id
      name
      username
      email
      password
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      siteWeb
      description
      email
      avatar
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput) {
    updateUser(input: $input)
  }
`;

export const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      avatar
    }
  }
`;
