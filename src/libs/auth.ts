import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, IAuthenticationCallback, ISignUpResult, NodeCallback } from 'amazon-cognito-identity-js';

import { COGNITO_USER_POOL_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from '@/configs/env';

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_USER_POOL_APP_CLIENT_ID,
});

interface SignUpInput {
  name: string
  email: string
  password: string
}

export function signUp(data: SignUpInput, callback: NodeCallback<Error, ISignUpResult>): void {
  const { name, email, password } = data;
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'name',
      Value: name,
    }),
  ];
  userPool.signUp(email, password, attributeList, [], callback);
}

interface LoginInput {
  username: string
  password: string
}

export function login(data: LoginInput, callbacks: IAuthenticationCallback): void {
  const { username, password } = data;
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });
  cognitoUser.authenticateUser(authenticationDetails, callbacks);
}

export function getCurrentUser(): CognitoUser | null {
  return userPool.getCurrentUser();
}
