import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


// basically this route checks whether the token is valid or not
function ProtectedRoute({children}){
    const [isAuthourized, setIsAuthorized] = useState(null);

    // basically checks if the user is valid
    // initiallity runs the auth() command and if auth fails then token is missing or not there
    useEffect(()=>{
        auth().catch(() => setIsAuthorized(false))
    }, []);

    // refreshTOken checks if the token is valid, then it tries to make a get request and get the information
    // if information is valid, it sets the ACCESS_TOKEN you receive 
    // otherwise setIsAuthorized is false
    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/api/token/refresh/",{
                refresh : refreshToken
            } )
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else{
                setIsAuthorized(false);
            }

        } catch (error){
            console.log(error);
            setIsAuthorized(false);
        }
    }

    // checks if token is expired or not
    // if access token isnt in local storage, return false immediately
    // if it is we decode the token first, get its expiration and if its expired get a new accessToken
    // if it isnt expired just return true and let entry
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if(!token){
            setIsAuthorized(false);
            return
        }
        
        
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000 //dates in seconds not milliseconds

        if (tokenExpiration < now){
            await refreshToken();
        } else{
            setIsAuthorized(true);
        }

    }

    if (isAuthourized === null){
        return <div>Loading...</div>
    }

    return isAuthourized ? children : <Navigate to="/login" />;
}


export default ProtectedRoute;