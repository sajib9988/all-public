import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from "./firebase.config";
import useAxiosPublic from './../Hook/axiosPublic';
// 1. Create and Export Auth Context
export const AuthContext = createContext(null);

// 2. Initialize Providers
const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => { 
    // 3. State Management
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
const axiosPublic =useAxiosPublic();
    // 4. Auth Functions
    const createUser = async (email, password) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setLoading(false);
        return result;
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);
        return result;
    }; 

    const signInWithGoogle = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        setLoading(false);
        return result;
    };

    // const signInWithFacebook = () => {
    //     setLoading(true);
    //     return signInWithPopup(auth, facebookProvider).then(result => {
    //         setLoading(false);
    //         return result;
    //     });
    // };

    const logOut = async () => {
        setLoading(true);
        await signOut(auth);
        setLoading(false);
    };

    const updateUserProfile = async (displayName, photoURL) => {
        setLoading(true);
        const result = await updateProfile(auth.currentUser, { displayName, photoURL });
        setLoading(false);
        return result;
    };

    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // console.log("user in the auth state changed", currentUser);
            setUser(currentUser);
            if (currentUser) {
                // Get token and store client
                const userInfo = { email: currentUser.email };
                try {
                    const response = await axiosPublic.post('/jwt', userInfo);
                    if (response.data.token) {
                        localStorage.setItem('access-token', response.data.token);
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Token fetch error:', error);
                }
            } else {
                // Remove token if user is not authenticated
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
    
        return () => {
            unSubscribe();
        };
    }, [axiosPublic]);
    
    
    // 6. Context Value
    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signInUser,
        signInWithGoogle,
        logOut,
        updateUserProfile
    };

    // 7. Return Provider with Context Value
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
