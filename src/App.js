import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavBar, Footer, RouteContainer } from "./components";
import PropTypes from "prop-types";
import { Alert } from "antd";
import { useAppHooks, mediaQueries, sizes } from "./customHooks/useAppHooks.js";
import { useAuthStateChange } from "./customHooks/useAuthStateChange.js";
import { SynapsBrain } from "./components";

/**
 * App
 * @category Views
 * @component
 * @example return (<App />);
 */
function App( props ){
  const [ alertMessage, setAlert ] = useState( "" );
  const { theme, usersState, pathname } = useAppHooks();
  
  useAuthStateChange();
  useEffect( () => {
    if( usersState.registerError && !alertMessage ){
      setAlert( "Error logging in. Please try again later." );
    }
  }, [ usersState ] );
  
  const getNavBarColor = () => {
    if( pathname === "/dashboard" ){
      if( theme.screenWidth <= sizes.tablet ){
        return theme.primaryColor;
      }
      
    }
    
  };
  
  return ( <StyledApp
      className="App"
      theme={ theme }
    >
      { theme.screenWidth > sizes.tablet &&
      <SynapsBrain
        zIndex={ 15 }
        width={ "100vw" }
        height={ "100vh" }
        position={ "absolute" }
        backgroundColor={ pathname === "/preview" ? theme.primaryColor :
          "transparent" }
        color={ pathname === "/preview" ? "#153F6E" : "#EEECE8" } opacity={ 1 }
        strokeColor={ "transparent" }
        viewBox={ "-20 -20 400 400" }
      /> }
      
      { alertMessage && ( <Alert
        type={ "error" }
        onClose={ () => setAlert( false ) }
        message={ alertMessage }
        closable
        style={ {
          position: "absolute", top: "20px", zIndex: "15",
        } }
      /> ) }
      <NavBar backgroundColor={ getNavBarColor() }/>
      <RouteContainer/>
      <Footer/>
    </StyledApp>
  );
}

App.propTypes = {
  theme: PropTypes.object, history: PropTypes.object,
};

const StyledApp = styled.div`
  box-sizing: border-box;
  position: relative;
  color: ${ props => props.theme.color };
  padding: 75px 0 50px 0;
  text-align: center;
  flex-direction: column;
  display: flex;
  max-width: 100vw;
  width: 100vw;
  align-items: center;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: hidden;
  
  @media ${ mediaQueries.tablet } {
  background: ${ props => {
  if( props.pathname === "/preview" ){
    return props.theme.primaryColor;
  }else{
    return "#F6F5F3";
  }
} };
   }
  
`;

export default App;

/**
 * @typedef {function} Dispatch
 * @param {function} function
 * @returns none
 *
 */

/**
 * @typedef {object} User
 * @property {string} uid
 * @property {string} photoURL
 */

