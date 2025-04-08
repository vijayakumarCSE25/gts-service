import React, { Component } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import EmploymentAgreementComponent from "../../components/common/EmploymentAgreementComponent";
import RecruiterMenu from "../../components/recruiter/RecruiterMenu";
import ServiceProviderMenu from "../../components/service_provider/ServiceProviderMenu";
import ServiceConsumerMenu from "../../components/service_consumer/ServiceConsumerMenu";
import ls from "local-storage";

var jsonPayLoad = ls.get("jsonPayLoad");

class EmploymentAgreementPage extends Component {
  render() {
    return (
      <div>
        <Header />
        {jsonPayLoad.primary_role === "RECRUITER" ? <RecruiterMenu /> : ""}
        {jsonPayLoad.primary_role === "SERVICE_CONSUMER" ? (
          <ServiceConsumerMenu />
        ) : (
          ""
        )}
        {jsonPayLoad.primary_role === "SERVICE_PROVIDER" ? (
          <ServiceProviderMenu />
        ) : (
          ""
        )}

        <EmploymentAgreementComponent />
        <Footer />
      </div>
    );
  }
}

export default EmploymentAgreementPage;
