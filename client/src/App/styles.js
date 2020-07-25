import styled from 'styled-components';


const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;



const ConsoleContainerDeskTop = styled.div`
  height: 75%;
  width: 100%;
  background-color: black;
  color: white;
  position: absolute;
  overflow: auto;
`;

const ControlsContainerDeskTop = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: red;
  height: 23%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  
`;

const ButtonCSS = {
  backgroundColor: "#4CAF50" /* Green */,
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  width: "100%",
  margin: "10px 10px 10px 10px",
};

const inputTextCSS = {
  width: "100%",
  padding: "12px 20px",
  margin: "10px 10px 10px 10px",
  boxSizing: "border-box",
  
};

export {
  
  ConsoleContainerDeskTop,
  ControlsContainerDeskTop,
  DesktopContainer,
  ButtonCSS,
  inputTextCSS,
};