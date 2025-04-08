import React, { Component } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import ls from "local-storage";
import RecruiterMenu from "../../components/recruiter/RecruiterMenu";

var jsonPayLoad = ls.get("jsonPayLoad");
class RecruiterProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Header />
        <RecruiterMenu />
        <br></br>
        <br></br>
        <h1>Recruiter Profile Page</h1>
        <Footer />
      </>
    );
  }
}
export default RecruiterProfilePage;