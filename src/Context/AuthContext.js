import React from 'react';
import {useState , useEffect} from 'react';
import {auth} from '../firebase';
export const AuthContext = React.createContext();
export function AuthProvider({children}) {
    const[user , setUser] = useState('');
    const [loading , setLoading] = useState(true); // Disable signup and login button until the data has been uploaded
    function signup(email,Password){
        return auth.createUserWithEmailAndPassword(email,Password);
    }
    function login(email, Password){
        return auth.signInWithEmailAndPassword(email, Password);
    }
    function logout(){
        return auth.signOut();
    }
    // whenever user will login or logout according to that user need to be update, that for , we use useEffect method as componentDidMount() variation.
    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);

        })
        return ()=>{
            unsub(); // clean up
        }

    },[]) 

    const store = {
        user, // who signin in website
        signup,
        login,
        logout
    }

  return (
    <AuthContext.Provider value= {store}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
