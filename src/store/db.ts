// import firebase from "firebase/app";
// import "firebase/firestore";

// // Get a Firestore instance
// export const db = firebase
//   .initializeApp({ projectId: "MY PROJECT ID" })
//   .firestore();

// // Export types that exists in Firestore
// // This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint } = firebase.firestore;
// export { Timestamp, GeoPoint };

// // if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import router from "@/router";

const firebaseConfig = {
  apiKey: "AIzaSyB9jAl1JsIXBQAZ_pdVJnLBPzLPQ4I07vw",
  authDomain: "pokedex-clone-ebc3f.firebaseapp.com",
  projectId: "pokedex-clone-ebc3f",
  storageBucket: "pokedex-clone-ebc3f.appspot.com",
  messagingSenderId: "674081966126",
  appId: "1:674081966126:web:7774bde71747bcae3db7bf",
  //   apiKey: process.env.VUE_APP_ApiKey,
  //   authDomain: process.env.VUE_APP_AuthDomain,
  //   projectId: process.env.VUE_APP_ProjectId,
  //   storageBucket: process.env.VUE_APP_StorageBucket,
  //   messagingSenderId: process.env.VUE_APP_MessagingSenderId,
  //   appId: process.env.VUE_APP_AppId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export interface AuthType {
//   currentUser?: {uid?:string}
// }

export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    // console.log(userCredential);
    console.log(auth.currentUser);
    // await updateProfile(auth.currentUser, {
    //   displayName: displayName,
    //   photoURL: "https://picsum.photos/200/300",
    // });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    router.push({ name: "home" });
  } catch (error) {
    alert("Something went wrong");
  }
};

export const signUpProvider = () => {
  //? Google ile giriş yapılması için kullanılan firebase metodu
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      router.push({ name: "home" });
    })
    .catch((error) => {
      alert("something went wrong");
    });
};
export const logOut = () => {
  signOut(auth);
  router.push({ name: "LoginView" });
};

export const userObserver = (
  setCurrentUser: (user: object | boolean) => void
) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};
