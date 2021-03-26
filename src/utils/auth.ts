import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';

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

export function signUp(data: SignUpInput): Promise<ISignUpResult> {
  const signUpPromise = new Promise<ISignUpResult>((resolve, reject) => {
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
    userPool.signUp(email, password, attributeList, [], (error, result) => {
      if (result) {
        resolve(result);
      }

      reject(error);
    });
  });
  return signUpPromise;
}

interface LoginInput {
  username: string
  password: string
}

export function login(data: LoginInput): Promise<CognitoUserSession> {
  const loginPromise = new Promise<CognitoUserSession>((resolve, reject) => {
    const { username, password } = data;
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve(session);
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });

  return loginPromise;
}

export function getCurrentUser(): CognitoUser | null {
  return userPool.getCurrentUser();
}
