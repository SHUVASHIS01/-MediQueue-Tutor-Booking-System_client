import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile 
} from '../firebase/firebase.config';

const AuthContext = createContext();

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem('token');
    try {
      await axios.post(`${apiBaseUrl}/api/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout API call error:', error);
    }
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    }).then(() => {
      setUser({ ...auth.currentUser });
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && currentUser.email) {
        try {
          const { data } = await axios.post(`${apiBaseUrl}/api/jwt`, {
            email: currentUser.email
          }, { withCredentials: true });
          
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch (error) {
          console.error('Error fetching JWT:', error);
        }
      } else {
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      createUser,
      signIn,
      signInWithGoogle,
      logOut,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
