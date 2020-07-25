import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  ConsoleContainerDeskTop,
  ControlsContainerDeskTop,
  DesktopContainer,
  ButtonCSS,
  inputTextCSS,
} from "./styles";
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { useMediaQuery } from "react-responsive";

const Desktop = ({ children }) => {
const isDesktop = useMediaQuery({ minWidth: 992 });
return isDesktop ? children : null;
};
const Mobile = ({ children }) => {
const isMobile = useMediaQuery({ maxWidth: 767 });
return isMobile ? children : null;
};
const Tablet = ({ children }) => {
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
return isTablet ? children : null;
};



class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      landingId: "",
      error:"N"
    };
    this.loadCapsules = this.loadCapsules.bind(this);
    this.loadLandpads = this.loadLandpads.bind(this);
  }

  async loadCapsules() {
    fetch("http://localhost:4000/capsules")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            data: result,
          });
        },
        (error) => {
          this.setState({
            data: error,
          });
        }
      );
  }

  async loadLandpads() {
    fetch("http://localhost:4000/landpads/"+ this.state.landingId)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            data: result,
          });
        },

        (error) => {
          this.setState({
            data: error,
          });
        }
      );
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ landingId: event.target.value });
  }
  render() {
      return (
        <Desktop>
          <DesktopContainer>
            <ConsoleContainerDeskTop>
              <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            </ConsoleContainerDeskTop>
            <ControlsContainerDeskTop>
              <button style={ButtonCSS} onClick={this.loadCapsules}>
                Capsules
              </button>

              <Rocket
                style={{ width: "100%", margin: "10px 10px 10px 10px" }}
              />
              <input
                style={inputTextCSS}
                type="text"
                maxlength="15"
                value={this.state.landingId}
                onChange={this.handleChange.bind(this)}
              />
              <button style={ButtonCSS} onClick={this.loadLandpads}>
                Landing pad
              </button>
            </ControlsContainerDeskTop>
          </DesktopContainer>
        </Desktop>
      );
   
    
  }
}
export default hot(MyComponent);