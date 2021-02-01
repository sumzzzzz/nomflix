import React, { Component } from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";

class App extends Component {
  render() {
    return (
      // Fragments <></> 원하는 만큼 컴포넌트들을 return할 수 있게 해줌
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
