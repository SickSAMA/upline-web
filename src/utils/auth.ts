/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool,
  CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';

import { COGNITO_USER_POOL_APP_CLIENT_ID, COGNITO_USER_POOL_ID } from '@/configs/env';
import { HOME } from '@/utils/routes';

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

export function login(username: string, password: string, isStaySignedIn = true): Promise<CognitoUserSession> {
  const loginPromise = new Promise<CognitoUserSession>((resolve, reject) => {
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
        if (!isStaySignedIn) {
          /**
           * hard coded solution to not let user stay signed in.
           * potential issue: key difference, need to check everytime updating amazon-cognito-identity-js package
           */
          const storage = localStorage;
          const keyPrefix = `CognitoIdentityServiceProvider.${COGNITO_USER_POOL_APP_CLIENT_ID}`;
          const refreshTokenKey = `${keyPrefix}.${username}.refreshToken`;
          storage.removeItem(refreshTokenKey);
        }
        resolve(session);
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });

  return loginPromise;
}

export function forgotPassword(username: string): Promise<any> {
  const forgotPasswordPromise = new Promise<any>((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });

  return forgotPasswordPromise;
}

export function confirmPassword(username: string, code: string, password: string): Promise<void> {
  const confirmPasswordPromise = new Promise<void>((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(code, password, {
      onSuccess() {
        resolve();
      },
      onFailure(err) {
        reject(err);
      },
    });
  });
  return confirmPasswordPromise;
}

export function resentConfirmationCode(username: string): Promise<any> {
  const resendConfirmationCodePromise = new Promise<any>((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });

  return resendConfirmationCodePromise;
}


export function confirmRegistration(username: string, code: string): Promise<any> {
  const confirmRegistrationPromise = new Promise<any>((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });

  return confirmRegistrationPromise;
}

// cache the currentUser, only need to query once per app lifecycle
let currentUser: CognitoUser | null;

export function getCurrentUser(): CognitoUser | null {
  if (currentUser === undefined) {
    currentUser = userPool.getCurrentUser();
  }
  return currentUser;
}

// session is retrieved from cache until time out. Then session is refreshed
export function getSession(): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error: Error | null, session: CognitoUserSession | null) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(session as CognitoUserSession);
      });
    } else {
      reject(new Error('No current user found.'));
    }
  });
}

export function getUserAttributes(): Promise<CognitoUserAttribute[]> {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      /**
       * must get the latest session before getting user attributes, otherwise error will throw
       * if current session is outdated.
       **/
      currentUser.getSession((error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        currentUser.getUserAttributes((error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result as CognitoUserAttribute[]);
        });
      });
    } else {
      reject(new Error('No current user found.'));
    }
  });
}

interface Attribute {
  Name: string;
  Value: string;
}
export function updateUserAttributes(attributeList: Attribute[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      /**
       * must get the latest session before updating user attributes, otherwise error will throw
       * if current session is outdated.
       **/
      currentUser.getSession((error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }

        const cognitoAttributeList = attributeList.map((attribute) => new CognitoUserAttribute(attribute));

        currentUser.updateAttributes(cognitoAttributeList, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result as string);
        });
      });
    } else {
      reject(new Error('No current user found.'));
    }
  });
}

export function changePassword(oldPassword: string, newPassword: string): Promise<'SUCCESS'> {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      /**
       * must get the latest session before updating user password, otherwise error will throw
       * if current session is outdated.
       **/
      currentUser.getSession((error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        currentUser.changePassword(oldPassword, newPassword, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result as 'SUCCESS');
        });
      });
    } else {
      reject(new Error('No current user found.'));
    }
  });
}

export function logout(): void {
  const currentUser = getCurrentUser();
  if (currentUser) {
    currentUser.signOut();
  }
  location.href = HOME;
}
