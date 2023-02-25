import { AuthContext } from "contexts/authContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import { auth } from "../services/firebase/firebase";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    signInWithPopup(auth, provider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  const updateDisplayName = async (displayName: string): Promise<boolean> => {
    if (auth.currentUser === null) return false;
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    return true;
  };

  return {
    isLoading: user === undefined, // when user is undefined, it means we are still determine the user. If it is null, it means the user is not logged in.
    isLogin: !!user,
    user: user,
    signIn,
    signOut,
    updateDisplayName,
  };
};

export default useAuth;
