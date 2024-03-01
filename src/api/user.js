import {
  initializeApp
} from 'firebase/app';
import {
  getAuth,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  auth
} from './index';
// Konfigurasi Firebase

const _Auth = getAuth();

export const getUser = () => _Auth.currentUser;

export const onAuthStateChange = (args) => onAuthStateChanged(_Auth, args);

// Notice Firebase automatically signs the user in when their account is created
export const signUp = async ({
  email = '', password = ''
}) => {
  await createUserWithEmailAndPassword(_Auth, email, password);
  sendVerification();
};

export const signIn = ({
  email = '', password = ''
}) => signInWithEmailAndPassword(_Auth, email, password);

export const sendVerification = () => sendEmailVerification(_Auth.currentUser);

export const signOutUser = () => {
  const user = getUser(); // Get the current user
  if (user) {
    return signOut(_Auth);
  } else {
    // User doesn't exist, no need to sign out
    return Promise.resolve(); // Return a resolved promise if the user doesn't exist
  }
};

export const reload = () => getUser().reload();

export const reAuthenticate = ({
  email = '', password = ''
}) => {
  const credential = EmailAuthProvider.credential(email, password);
  console.log(credential)
  return reauthenticateWithCredential(_Auth.currentUser, credential);
};

export const updatePass = ({
  password = ''
}) => updatePassword(_Auth.currentUser, password);

export const sendPasswordReset = ({
  email = ''
}) => sendPasswordResetEmail(_Auth, email);