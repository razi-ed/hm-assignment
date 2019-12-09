import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import LoginForm from "../../components/Login"

import { auth as AuthUrl } from "../../configs/urls"

export default ( {} ) => {

    const [ credentials, setCredentials ] = useState( {} );
    
    const [ isAuth, setIsAuth ] = useState( false );

    const [ isLoading, setIsLoading ] = useState( false );

    useEffect( () => {
      const auth = async () => {
          try{
              if( credentials.email && credentials.password ) {
                setIsLoading( true )
                const response = await Axios.get( AuthUrl );
                if( response ) {
                  setIsLoading( false )
                }
                if( response.status === 200 ) {
                  setIsAuth( response.data.result === "success" )
                }  
              }
          } catch ( error ) {
              console.error( error )
          }
      }
      auth()
    }, [ credentials ] )

     return (
        <div
            className="page"
            >
            <LoginForm
                loading={ isLoading } 
                signIn={ setCredentials }
                success={ isAuth }
                />
        </div>
    )   
}