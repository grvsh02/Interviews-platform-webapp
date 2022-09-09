import React from 'react';
import NavBar from "./components/navBar";
import Main from "./main";
import Sidebar from "./components/sidebar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/api/graphql/",
    cache: new InMemoryCache()
});

const App = () => {
    return (
      <ApolloProvider client={client}>
        <div className="bg-gray-200 flex flex-col w-full min-h-screen">
            <Sidebar/>
            <NavBar/>
            <div className="h-full flex justify-center pl-72">
                <div className="w-4/5">
                    <Main/>
                </div>
            </div>
            <ToastContainer/>
        </div>
      </ApolloProvider>
  );
}

export default App;
