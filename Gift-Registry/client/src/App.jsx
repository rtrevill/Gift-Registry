import { useState, useEffect } from "react";
import './App.css'
import { Outlet } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";


const cache = new InMemoryCache();

const storedCache = localStorage.getItem('apollo-cache');
if (storedCache) {
  cache.restore(JSON.parse(storedCache));
}

import { setContext } from "@apollo/client/link/context";

import { Header } from './pages/header'
import AuthService from "./utils/auth.js"; // Import your AuthService
import { PleaseLogin } from './pages/pleaselogin.jsx';


// Constructs main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Constructs request middleware to attach JWT as `authorization` header to every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  },
};


const client = new ApolloClient({
  // executes `authLink` middleware prior every request to GraphQL API
  link: authLink.concat(httpLink),
  cache: cache,
  defaultOptions,
});

client.onResetStore(() => {
  localStorage.setItem('apollo-cache', JSON.stringify(cache.extract()));
});


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn()); // Set initial state based on AuthService
  const [user, setUser] = useState({}); // to pass basic user information to navbar

    // Check if user is logged in when component mounts and when localStorage changes
  useEffect(() => {
    // Update isLoggedIn when AuthService changes
    const checkLoginStatus = () => {
      setIsLoggedIn(AuthService.loggedIn());
      if (AuthService.loggedIn()) {
        // If logged in, get user profile and set user state to pass to navbar
        const profile = AuthService.getProfile();
        setUser(profile.data); // jwt decoding is returning an object with a data property
      }
    };

    // call checkLoginStatus when component mounts to get profile of logged in user
    checkLoginStatus();

    // add event listener to checkLoginStatus when localStorage changes
    window.addEventListener("storage", checkLoginStatus);

    // cleanup function to remove event listener
    //https://stackoverflow.com/questions/55360736/how-do-i-window-removeeventlistener-using-react-useeffect
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

    // Props to pass to navbar which will contain the logout button



  const handleLogout = () => {
    AuthService.logout().then(() => client.resetStore());
    setIsLoggedIn(false);
  };
  

  return (
    <ApolloProvider client={client}>
      {isLoggedIn ? (
        <>
          <Header 
            handleLogout={handleLogout} 
            user={user}
          />
          <Outlet />
        </>
      ) : (
        <PleaseLogin setIsLoggedIn={setIsLoggedIn}/>
      )
    }
    <>
    {/* <Header />
    <Outlet /> */}
    </>
    </ApolloProvider >
  )
}

export default App
