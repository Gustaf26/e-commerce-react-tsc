import React, { useEffect, useState, } from "react";

import { useAuth, AuthContext } from "../hooks/useAuth";

import { BounceLoader } from "react-spinners";

// Firebase Functions

type User = { uid: string, email: string, displayName: string } | null

// const AuthContext = createContext({} as React.Context<{
//   Provider: React.FC, Consumer: React.FC, $$typeof: typeof AuthContext['Provider']
//     | typeof AuthContext['Consumer']
// }>);

// const useAuth = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider: React.FC = (props: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);


  // FIREBASE AUTH SIGN IN 

  // const signIn = (auth, email, password) => signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     // ...
  //     console.log(user)
  //     setCurrentUser({ email: user.email, uid: user.uid, display_name: user.display_name, token: user.token })
  //     return { email: user.email, uid: user.uid, display_name: user.display_name, token: user.token }
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log({ code: errorCode, msg: errorMessage })

  //   });

  const login = (email, password) => {

    if (email === 'admin@email.se' && password === 'adminPass') {
      setLoading(false);
      const user: User = { email: email, displayName: 'Peter Halldorf', uid: '' }
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user))
      return user
    }

    // FIREBASE
    // const user = await signIn(auth, email, password)
    // return user

  };

  const logout = () => {

    // THIS ONE FOR FIREBASE USE
    // await signOut(auth, email).then((res) => {
    //   // Sign-out successful.
    //   setCurrentUser(null)
    //   setAdmin(false)
    // }).catch((error) => {
    //   // An error happened.
    // });
    localStorage.removeItem('currentUser')
    setCurrentUser(false)
    setAdmin(false)

  };

  // FIREBASE RESET 
  // const resetPassword = (email) => {
  //   return sendPasswordResetEmail(email);
  // };

  // FIREBASE CREATE USER

  // const signup = async (email, password) => {

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed up 
  //       const user = userCredential.user;
  //       // ...
  //       setCurrentUser({ email: user.email, uid: user.uid, display_name: user.display_name, token: user.token })

  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //       console.log({ code: errorCode, msg: errorMessage })
  //     });
  // };

  const updateProfileData = async (email: string, password: string, display_name: string) => {

    const message: Promise<{ msg: string, error: string }> = await fetch('http://127.0.0.1:8000/auth/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: currentUser.uid, email, password, display_name }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.msg !== "") {
          setCurrentUser((prev) => { return { ...prev, email: res.email, uid: res.uid, display_name: res.display_name } })
        }
        return { msg: res.msg, error: res.error }
      })
      .catch(err => err)

    if (message) return message
  };


  const checkIfAdmin = (email: string | null) => {
    if (email.trim() === "admin@email.se") {
      setAdmin(true);
      return true;
    } else {
      setAdmin(false);
      return false;
    }
  };


  // This effect is responsible for keeping the "session" in the browser for the user
  useEffect(() => {

    const checkIfLoggedIn = () => {
      if (localStorage.getItem('currentUser')) {
        const currentU = JSON.parse(localStorage.getItem('currentUser'))
        setCurrentUser(currentU)
        checkIfAdmin(currentU.email)
      }
    }

    checkIfLoggedIn()

  }, []);



  const contextValues = {
    provider: AuthContext.Provider,
    consumer: AuthContext.Consumer,
    $$typeof: AuthContext['$$typeof'],
    currentUser,
    loading,
    admin,
    login,
    logout,
    setAdmin,
    // signup,
    updateProfileData,
    checkIfAdmin,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <BounceLoader color={"#888"} size={100} />
        </div>
      )}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider as default };
