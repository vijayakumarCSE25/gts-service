import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import ls from "local-storage";
import { endpoints_properties } from "../../properties/EndPointsProperties.js";
import { api_properties } from "../../properties/APIProperties.js";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Modal,
  Row,
  InputGroup,
  Toast,
} from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faEdit,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import gorai from "../../image/gorai.jpg";
import { black } from "material-ui/styles/colors";
import Moment from "moment";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "../../pages/common/styles.css";

var gts_user_id = "";
var token = ls.get("token");
var jsonPayLoad = ls.get("jsonPayLoad");
var userPersonalDetails = ls.get("userPersonalDetails");
if (jsonPayLoad != null) {
  if (ls.get("gts_user_id") != jsonPayLoad.user_id) {
    gts_user_id = ls.get("gts_user_id");
  } else {
    gts_user_id = jsonPayLoad.user_id;
  }
}

class EmploymentAgreementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      currencies: [],
      offerName: [],
      referenceName: [],
      date: "",
      candidateName: "",
      candidateId: 0,
      gts_address: "",
      gts_identification_number: "",
      gts_identification_type: "",
      employer_company_name: "",
      employerCompanyLocations: [],
      employer_position_name: "",
      gts_job_start_date: "",
      gts_salary_per_year: "",
      location: [],
      candidatesDetails: [],
      gts_benefits_document_names: "",
      gts_submit_date: "",
      gts_contact_details: "",
      gts_documents_to_verify: "",
      gts_working_hours: "",
      confidentiality: "",
      gts_responsibilities: "",
      gts_employer_signature_id: "",
      gts_candidate_signature_id: "",
      gts_agreement_generator_id: "",
      gts_employer_signature_date: "",
      gts_candidate_signature_date: "",
      gts_employer_id: "",
      gts_offer_reference_id: "",
      gts_candidate_id: "",
      gts_user_address_id: "",
      gts_identification_card_name: "",
      CurrencyId: "",
      gts_company_id: "",
      employerJobTitleId: "",
      gts_job_title_id: "",
      gts_job_start_date: "",
      gts_salary_currency: "",
      gts_work_city_id: "",
      gts_benefits: [],
      employerSignId: "",
      candidateSignId: "",
      employerSignDate: "",
      candidateSignDate: "",
      validated: false,
      employerJobTitleName: [],
      wageCurrencies: [],
      employerCompanyLocation: [],
      employerCompanyLocationId: [],
    };
    this.EmploymentAgreementChangeHandler =
      this.EmploymentAgreementChangeHandler.bind(this);
  }
  EmploymentAgreementChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name + " : " + e.target.value);
  };
  employerImageHandler = (event) => {
    this.setState({
      employerFile: URL.createObjectURL(event.target.files[0]),
      selectedEmployerFile: event.target.files[0],
    });
  };
  candidateImageHandler = (event) => {
    this.setState({
      candidateFile: URL.createObjectURL(event.target.files[0]),
      selectedCandidateFile: event.target.files[0],
    });
  };
  clearEmployerSign = () => {
    this.EmployerSigPad.clear();
  };

  clearCandidateSign = () => {
    this.CandidateSigPad.clear();
  };

  EmployerSigPad = {};
  CandidateSigPad = {};

  attachEmployerSign = () => {
    var upload_emp_sign =
      endpoints_properties.ENDPOINT_USER_SIGNATURE_LOCAL +
      api_properties.API_USER_SIGNATURE +
      this.state.employerId;
    var bodyFormData_post = new FormData();
    bodyFormData_post.append("file", this.state.selectedEmployerFile);

    axios
      .post(upload_emp_sign, bodyFormData_post, {
        headers: { Auth_Token: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          employerSignSuccess: "Employer signature uploaded successfully",
          employerSignId: response.data.sign_id,
          employerSignDate: Moment(Date.now()).format("YYYY-MM-DD"),
          employerDate: Date.now(),
        });
      })
      .catch((err) => {
        this.setState({
          employerSignError: "Not able to upload employer signature",
        });
      });
  };

  attachCandidateSign = () => {
    var upload_candidate_sign =
      endpoints_properties.ENDPOINT_USER_SIGNATURE_LOCAL +
      api_properties.API_USER_SIGNATURE +
      this.state.candidateId;
    var bodyFormData_post = new FormData();
    bodyFormData_post.append("file", this.state.selectedCandidateFile);

    axios
      .post(upload_candidate_sign, bodyFormData_post, {
        headers: { Auth_Token: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          candidateSignSuccess: "Candidate signature uploaded successfully",
          candidateSignId: response.data.sign_id,
          candidateSignDate: Moment(Date.now()).format("YYYY-MM-DD"),
          candidateDate: Date.now(),
        });
        console.log(response.data);
      })
      .catch((err) => {
        this.setState({
          candidateSignError: "Not able to upload candidate signature",
        });
      });
  };

  onSubmitHandler = () => {
    axios
      .post(
        endpoints_properties.ENDPOINT_EMPLOYMENT_AGREEMENT_LOCAL +
          api_properties.API_EMPLOYMENT_AGREEMENT,
        { headers: { Auth_Token: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
      });
  };

  componentDidMount() {
    //JOB  TITLE
    axios
      .get(
        endpoints_properties.ENDPOINT_JOB_TITLES_LOCAL +
          api_properties.API_GET_ACTIVE_SERVICE_TITLES,
        { headers: { Auth_Token: `Bearer ${token}` } }
      )
      .then((resp) => {
        this.setState({ employerJobTitles: resp.data });

        this.state.employerJobTitles.forEach((jobTitles) => {
          this.state.employerJobTitleName.push(jobTitles.gts_job_title_name);
        });
      });
    //CURRENCIES
    axios
      .get(
        endpoints_properties.ENDPOINT_CURRENCIES_LOCAL +
          api_properties.API_GET_ACTIVE_CURRENCIES,
        { headers: { Auth_Token: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({ currencies: response.data });

        console.log(response.data);

        this.state.currencies.forEach((currency) => {
          this.state.wageCurrencies.push(currency.gts_currency_name);
        });
      });

    //IDENTITY
    axios
      .get(
        endpoints_properties.ENDPOINT_IDENTITY_LOCAL +
          api_properties.API_GET_ACTIVE_USER,
        { headers: { Auth_Token: `Bearer ${token}` } }
      )
      .then((res) => {
        res.data.forEach((details) => {
          if (
            details.gts_role_name == "SERVICE_CONSUMER" &&
            details.gts_user_email_is_validated &&
            details.gts_primary_contact_is_validated
          ) {
            this.state.employersDetails.push({
              user_id: details.gts_user_id,
              user_name: details.gts_user_name,
              user_email: details.gts_user_email,
              user_contact: details.gts_primary_contact_number,
              user_email_validated: details.gts_user_email_is_validated,
              user_contact_validated: details.gts_primary_contact_is_validated,
              user_country_code: details.gts_user_country_code,
            });
          } else if (
            details.gts_role_name == "SERVICE_PROVIDER" &&
            details.gts_user_email_is_validated &&
            details.gts_primary_contact_is_validated
          ) {
            this.state.candidatesDetails.push({
              user_id: details.gts_user_id,
              user_name: details.gts_user_name,
              user_email: details.gts_user_email,
              user_contact: details.gts_primary_contact_number,
              user_email_validated: details.gts_user_email_is_validated,
              user_contact_validated: details.gts_primary_contact_is_validated,
              user_country_code: details.gts_user_country_code,
            });
          } else if (
            details.gts_role_name == "RECRUITER" &&
            details.gts_user_email_is_validated &&
            details.gts_primary_contact_is_validated
          ) {
            this.state.recruitersDetails.push({
              user_id: details.gts_user_id,
              user_name: details.gts_user_name,
              user_email: details.gts_user_email,
              user_contact: details.gts_primary_contact_number,
              user_email_validated: details.gts_user_email_is_validated,
              user_contact_validated: details.gts_primary_contact_is_validated,
              user_country_code: details.gts_user_country_code,
            });
          }
        });
      });

    if (jsonPayLoad.primary_role == "SERVICE_CONSUMER") {
      this.setState({
        employerName:
          userPersonalDetails.gts_user_first_name +
          " " +
          userPersonalDetails.gts_user_last_name,
        employerEmail: userPersonalDetails.gts_user_email,
        employerId: jsonPayLoad.user_id,
        employerCountryCode: userPersonalDetails.gts_user_primary_country_code,
        employerConatct: userPersonalDetails.gts_primary_contact_number,
      });
    }
    // SC COMPANY
    axios
      .get(
        endpoints_properties.ENDPOINT_SC_COMPANY_DETAILS_LOCAL +
          api_properties.API_GET_SC_COMPANY_DETAILS +
          jsonPayLoad.user_id,
        { headers: { Auth_Token: `Bearer ${token}` } }
      )
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].gts_employer_is_currently_working) {
            this.setState({
              employerCompanyId: res.data[i].gts_employer_company_id,
              employerCompanyName: res.data[i].gts_employer_company_name,
            });
            this.setState({
              employerCompanyLocation: res.data[i].gts_city_name,
              employerCompanyLocationId: res.data[i].gts_city_id,
            });
          }
        }
      });
  }

  resetEmploymentAgreementDetails = () => {
    window.location.reload(false);
  };
  saveEmploymentAgreementDetails = () => {
    if (
      (this.state.validated == true && this.state.recruiterId !== "") ||
      this.state.employerId !== "" ||
      this.state.employerCompanyId !== "" ||
      this.state.employerCompanyLocationId !== "" ||
      this.state.candidateId !== "" ||
      this.state.projectManager !== "" ||
      this.state.employerJobTitleId !== "" ||
      this.state.projectDescription !== "" ||
      this.state.numOfMonths !== "" ||
      this.state.wage !== "" ||
      this.state.currencyId !== "" ||
      this.state.candidateEmail !== "" ||
      this.state.employerEmail !== "" ||
      this.state.projectManagerEmail !== "" ||
      this.state.candidateCountryCode !== "" ||
      this.state.candidateContact !== "" ||
      this.state.employerCountryCode !== "" ||
      this.state.employerContact !== "" ||
      this.state.managerCountryCode !== "" ||
      this.state.managerConatct !== ""
    ) {
      var employmentAgreementPayLoad = {
        gts_agreement_generator_id: jsonPayLoad.user_id,
        gts_employer_id: this.state.employerId,
        gts_offer_reference_id: this.state.OfferReferenceId,
        gts_candidate_id: this.state.candidateId,
        gts_user_address_id: 1,
        gts_identification_card_name: this.state.cardName,
        gts_identification_number: this.state.idNumber,
        gts_company_id: this.state.companyId,
        gts_job_title_id: this.state.employerJobTitleId,
        gts_job_start_date: this.state.startDate,
        gts_salary_per_year: this.state.wage,
        gts_salary_currency: this.state.CurrencyId,
        gts_work_city_id: this.state.workCityId,
        gts_benefits: this.state.gtsBenefits,
        gts_benefits_document_names: this.state.benefitsDocumentNames,
        gts_offer_acceptance_date: this.state.offerAcceptanceDate,
        gts_contact_details: this.state.candidateEmail,
        gts_documents_to_verify: this.state.documentsToVerify,
        gts_working_hours: this.state.workingHours,
        gts_responsibilities: this.state.responsibility,
        gts_candidate_signature_id: this.state.candidateSignId,
        gts_employer_signature_id: this.state.employerSignId,
        gts_candidate_signature_date: this.state.employerSignDate,
        gts_employer_signature_date: this.state.candidateSignDate,
        gts_employment_agreement_status: "SAVED",
      };
      console.log(employmentAgreementPayLoad);
      axios
        .post(
          endpoints_properties.ENDPOINT_EMPLOYMENT_AGREEMENT_LOCAL +
            api_properties.API_EMPLOYMENT_AGREEMENT,
          employmentAgreementPayLoad,
          { headers: { Auth_Token: `Bearer ${token}` } }
        )
        .then((res) => {
          this.setState({
            success: "Employment agreement generated successfully.",
          });
        })
        .catch((err) => {
          this.setState({
            error: "Not able to generate employment agreement.",
          });
        });
    } else {
      this.setState({
        error: "Please fill all the details.",
      });
    }
  };

  submitEmploymentAgreementDetails = () => {
    axios
      .get(
        endpoints_properties.ENDPOINT_EMPLOYMENT_AGREEMENT_LOCAL +
          api_properties.API_GET_EMPLOYMENT_AGREEMENT +
          this.state.employerId,
        { headers: { Auth_Token: `Bearer ${token}` } }
      )
      .then((resp) => {
        console.log(resp.data);
        for (var i = 0; i < resp.data.length; i++) {
          if (
            this.state.employerId == resp.data[i].gts_employer_id &&
            this.state.candidateId == resp.data[i].gts_candidate_id &&
            this.state.employerJobTitleName == resp.data[i].gts_job_title_name
          ) {
            this.submitPutEmploymentAgreementDetails(
              resp.data[i].gts_candidate_agreement_id
            );
          } else {
            this.submitPostEmploymentAgreementDetails();
          }
        }
      })
      .catch((post) => {
        this.submitPostEmploymentAgreementDetails();
      });
  };

  submitPostEmploymentAgreementDetails = () => {
    if (
      (this.state.validated == true && this.state.recruiterId !== "") ||
      this.state.employerId !== "" ||
      this.state.employerCompanyId !== "" ||
      this.state.employerCompanyLocationId !== "" ||
      this.state.candidateId !== "" ||
      this.state.projectManager !== "" ||
      this.state.employerJobTitleId !== "" ||
      this.state.projectDescription !== "" ||
      this.state.numOfMonths !== "" ||
      this.state.wage !== "" ||
      this.state.currencyId !== "" ||
      this.state.candidateEmail !== "" ||
      this.state.employerEmail !== "" ||
      this.state.projectManagerEmail !== "" ||
      this.state.candidateCountryCode !== "" ||
      this.state.candidateContact !== "" ||
      this.state.employerCountryCode !== "" ||
      this.state.employerContact !== "" ||
      this.state.managerCountryCode !== "" ||
      this.state.managerConatct !== ""
    ) {
      var employmentAgreementPayLoad = {
        gts_agreement_generator_id: jsonPayLoad.user_id,
        gts_employer_id: this.state.employerId,
        gts_offer_reference_id: this.state.OfferReferenceId,
        gts_candidate_id: this.state.candidateId,
        gts_user_address_id: 1,
        gts_identification_card_name: this.state.cardName,
        gts_identification_number: this.state.idNumber,
        gts_company_id: this.state.companyId,
        gts_job_title_id: this.state.employerJobTitleId,
        gts_job_start_date: this.state.startDate,
        gts_salary_per_year: this.state.wage,
        gts_salary_currency: this.state.CurrencyId,
        gts_work_city_id: this.state.workCityId,
        gts_benefits: this.state.gtsBenefits,
        gts_benefits_document_names: this.state.benefitsDocumentNames,
        gts_offer_acceptance_date: this.state.offerAcceptanceDate,
        gts_contact_details: this.state.candidateEmail,
        gts_documents_to_verify: this.state.documentsToVerify,
        gts_working_hours: this.state.workingHours,
        gts_responsibilities: this.state.responsibility,
        gts_candidate_signature_id: this.state.candidateSignId,
        gts_employer_signature_id: this.state.employerSignId,
        gts_candidate_signature_date: this.state.employerSignDate,
        gts_employer_signature_date: this.state.candidateSignDate,
        gts_employment_agreement_status: "SAVED",
      };
      console.log(employmentAgreementPayLoad);
      axios
        .post(
          endpoints_properties.ENDPOINT_EMPLOYMENT_AGREEMENT_LOCAL +
            api_properties.API_EMPLOYMENT_AGREEMENT,
          employmentAgreementPayLoad,
          { headers: { Auth_Token: `Bearer ${token}` } }
        )
        .then((res) => {
          this.setState({
            success: "Employment agreement generated successfully.",
          });
        })
        .catch((err) => {
          this.setState({
            error: "Not able to generate employment agreement.",
          });
        });
    } else {
      this.setState({
        error: "Please fill all the details.",
      });
    }
  };

  submitPutEmploymentAgreementDetails = (gts_candidate_agreement_id) => {
    if (
      (this.state.validated == true && this.state.recruiterId !== "") ||
      this.state.employerId !== "" ||
      this.state.employerCompanyId !== "" ||
      this.state.employerCompanyLocationId !== "" ||
      this.state.candidateId !== "" ||
      this.state.projectManager !== "" ||
      this.state.employerJobTitleId !== "" ||
      this.state.projectDescription !== "" ||
      this.state.numOfMonths !== "" ||
      this.state.wage !== "" ||
      this.state.currencyId !== "" ||
      this.state.candidateEmail !== "" ||
      this.state.employerEmail !== "" ||
      this.state.projectManagerEmail !== "" ||
      this.state.candidateCountryCode !== "" ||
      this.state.candidateContact !== "" ||
      this.state.employerCountryCode !== "" ||
      this.state.employerContact !== "" ||
      this.state.managerCountryCode !== "" ||
      this.state.managerConatct !== ""
    ) {
      var employmentAgreementPayLoad = {
        gts_agreement_generator_id: jsonPayLoad.user_id,
        gts_employer_id: this.state.employerId,
        gts_offer_reference_id: this.state.OfferReferenceId,
        gts_candidate_id: this.state.candidateId,
        gts_user_address_id: 1,
        gts_identification_card_name: this.state.cardName,
        gts_identification_number: this.state.idNumber,
        gts_company_id: this.state.companyId,
        gts_job_title_id: this.state.employerJobTitleId,
        gts_job_start_date: this.state.startDate,
        gts_salary_per_year: this.state.wage,
        gts_salary_currency: this.state.CurrencyId,
        gts_work_city_id: this.state.workCityId,
        gts_benefits: this.state.gtsBenefits,
        gts_benefits_document_names: this.state.benefitsDocumentNames,
        gts_offer_acceptance_date: this.state.offerAcceptanceDate,
        gts_contact_details: this.state.candidateEmail,
        gts_documents_to_verify: this.state.documentsToVerify,
        gts_working_hours: this.state.workingHours,
        gts_responsibilities: this.state.responsibility,
        gts_candidate_signature_id: this.state.candidateSignId,
        gts_employer_signature_id: this.state.employerSignId,
        gts_candidate_signature_date: this.state.employerSignDate,
        gts_employer_signature_date: this.state.candidateSignDate,
        gts_employment_agreement_status: "SAVED",
      };
      console.log(employmentAgreementPayLoad);
      axios
        .post(
          endpoints_properties.ENDPOINT_EMPLOYMENT_AGREEMENT_LOCAL +
            api_properties.API_EMPLOYMENT_AGREEMENT,
          employmentAgreementPayLoad,
          { headers: { Auth_Token: `Bearer ${token}` } }
        )
        .then((res) => {
          this.setState({
            success: "Employment agreement generated successfully.",
          });
        })
        .catch((err) => {
          this.setState({
            error: "Not able to generate employment agreement.",
          });
        });
    } else {
      this.setState({
        error: "Please fill all the details.",
      });
    }
  };

  clearAllError = () => {
    this.setState({
      success: "",
      error: "",
      candidateSignError: "",
      candidateSignSuccess: "",
      employerSignError: "",
      employerSignSuccess: "",
    });
  };

  render() {
    return (
      <div className="container align-items-center">
        <div className="container align-items-right">
          <div className="mt-3">
            <div className="row">
              <div
                className="col"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/goraitech.jpg"}
                  alt="pic"
                  width="70px"
                  className="iconStyles"
                />
                <label>
                  <br />
                  <b style={{ color: "black", fontSize: "16px" }}>
                    <center>EMPLOYMENT AGREEMENT</center>
                  </b>
                </label>
              </div>
            </div>
            <br />
          </div>

          <div className="container align-items-center">
            <div className="mt-3">
              <div
                className="border border-dark rounded-lg"
                style={{ height: "280px", width: "1000px" }}
              >
                <div className="row">
                  <div className="col-0 p-1">
                    <div className="col container align-items-center">
                      <br />
                      <Container>
                        <Row>
                          <Col>
                            <strong>Offer Name:</strong>
                          </Col>
                          <Col sm={5}>
                            <input
                              type="text"
                              placeholder="Offer Name"
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "25px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              onFocus={this.clearAllError}
                              onChange={this.EmploymentAgreementChangeHandler}
                              id="offerName"
                              name="offerName"
                              value={this.state.offerName}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <strong>Reference:</strong>
                          </Col>
                          <Col sm={5}>
                            <input
                              type="text"
                              placeholder="Reference Name"
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "25px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              onFocus={this.clearAllError}
                              onChange={this.EmploymentAgreementChangeHandler}
                              id="referenceName"
                              name="referenceName"
                              value={this.state.referenceName}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <strong>Date:</strong>
                          </Col>
                          <Col>
                            <strong></strong>
                          </Col>
                          <Col sm={5}>
                            <input
                              type="Date"
                              placeholder="Date"
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "25px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              onFocus={this.clearAllError}
                              onChange={this.EmploymentAgreementChangeHandler}
                              id="date"
                              name="date"
                              value={this.state.date}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <strong>Candidate Name:</strong>
                          </Col>
                          <Col sm={5}>
                            <Autocomplete
                              options={this.state.candidatesDetails}
                              getOptionLabel={(option) => option.user_name}
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "25px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  id="candidateName"
                                  name="candidateName"
                                  placeholder="Candidate Name"
                                  variant="outlined"
                                />
                              )}
                              onChange={this.candidateDetail}
                              defaultValue={this.state.candidateName}
                              noOptionsText="No options"
                              onBlur={this.validateCandidateName}
                              onFocus={this.clearAllError}
                              size="small"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <strong>Address:</strong>
                          </Col>
                          <Col sm={5}>
                            <textarea
                              rows={5}
                              cols={50}
                              placeholder="Candidate Address"
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "38px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              onFocus={this.clearAllError}
                              onChange={this.EmploymentAgreementChangeHandler}
                              id="gts_address"
                              name="gts_address"
                              value={this.state.gts_address}
                            ></textarea>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <strong>Identification Number:</strong>
                          </Col>
                          <Col sm={5}>
                            <input
                              type="number"
                              placeholder="Candidate identification number"
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "25px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              onFocus={this.clearAllError}
                              onChange={this.EmploymentAgreementChangeHandler}
                              id="gts_identification_number"
                              name="gts_identification_number"
                              value={this.state.gts_identification_number}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <strong>Identification Type:</strong>
                          </Col>
                          <Col sm={5}>
                            <input
                              type="text"
                              placeholder="Candidate identification type"
                              style={{
                                color: "black",
                                border: "1px solid black",
                                height: "25px",
                                width: "300px",
                                marginBottom: "3px",
                              }}
                              onFocus={this.clearAllError}
                              onChange={this.EmploymentAgreementChangeHandler}
                              id="gts_identification_type"
                              name="gts_identification_type"
                              value={this.state.gts_identification_type}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="mt-1">
            <div className="border border-dark rounded-lg">
              <div className="row-0">
                <div className="col-0 p-1">
                  <h6 style={{ textAlign: "center" }}>
                    <b> SUB: EMPLOYEMENT OFFER</b>
                  </h6>
                  <br />
                  <div className="para" style={{ textAlign: "center" }}>
                    <p style={{ textAlign: "justify" }}>
                      {" "}
                      <b>
                        We are pleased to offer you a position with &emsp;
                        <input
                          type="text"
                          placeholder="Employer Company Name"
                          style={{
                            color: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "230px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="employer_company_name"
                          name="employer_company_name"
                          value={this.state.employer_company_name}
                        />{" "}
                        &emsp; as a &emsp;{" "}
                        <input
                          type="text"
                          placeholder="Position Name"
                          style={{
                            color: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "140px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="employer_position_name"
                          name="employer_position_name"
                          value={this.state.employer_position_name}
                        />{" "}
                        &emsp; expected to begin on &emsp;
                        <input
                          type="date"
                          placeholder="date"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "150px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_job_start_date"
                          name="gts_job_start_date"
                          value={this.state.gts_job_start_date}
                        />
                        .<br />
                        <br />
                        your base compensation will be&emsp;
                        <input
                          type="number"
                          placeholder="Salary Yearly"
                          style={{
                            color: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "120px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_salary_per_year"
                          name="gts_salary_per_year"
                          value={this.state.gts_salary_per_year}
                        />
                        &emsp; . All payment shall be subject to mandatory
                        employment dedudction (For example Taxes, Insurance etc)
                      </b>{" "}
                    </p>
                    <br />
                    <h6 style={{ fontSize: "15px", textAlign: "left" }}>
                      <b style={{ fontSize: "15px" }}>
                        {" "}
                        POSITION DESCRIPTION :
                      </b>
                    </h6>

                    <p style={{ textAlign: "justify" }}>
                      <b>
                        You will be working at our &emsp;
                        <Autocomplete
                          options={this.state.employerCompanyLocations}
                          style={{
                            width: 140,
                            outlineColor: "black",
                            display: "inline-block",
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id="employerCompanyLocation"
                              name="employerCompanyLocation"
                              placeholder="Location"
                              variant="outlined"
                              style={{ color: "black" }}
                              size="small"
                            />
                          )}
                          onChange={this.saveInterviewCityId}
                          defaultValue={this.state.employerCompanyLocation}
                          onBlur={this.validateEmployerCompanyLocation}
                          onFocus={this.clearAllError}
                          noOptionsText="No options"
                        />{" "}
                        &emsp; and will be reporting directly to your Manager.
                        As an Employee of our company, you are also eligible for
                        our <br />
                        <br />
                        benefit program, which includes &emsp;
                        <input
                          type="text"
                          placeholder="Benefits"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "200px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_benefits"
                          name="gts_benefits"
                          value={this.state.gts_benefits}
                        />
                        &emsp; and the other benefit which will be described in
                        more detail in the &emsp;
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="Document Name"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "200px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_benefits_document_names"
                          name="gts_benefits_document_names"
                          value={this.state.gts_benefits_document_names}
                        />{" "}
                        .<br />
                        <br />
                        please confirm your acceptance of this office by signing
                        and submitting this by&emsp;
                        <input
                          type="date"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "150px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_submit_date"
                          name="gts_submit_date"
                          value={this.state.gts_submit_date}
                        />{" "}
                        &emsp;
                        <br />
                        <br />
                        We are exited to have you join our team! if you hava any
                        question please feel free to reach us at &emsp;
                        <input
                          type="contact"
                          placeholder="Contact Details"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "160px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_contact_details"
                          name="gts_contact_details"
                          value={this.state.gts_contact_details}
                        />{" "}
                        &emsp;
                        <br /> <br />
                        <strong style={{ fontSize: "15px" }}>
                          DOCUMENT VERIFICATION:
                        </strong>{" "}
                        On the date of joining please show the following
                        documents.&emsp;
                        <br />
                        <br />
                        <textarea
                          className="border border-dark rounded"
                          rows={"auto"}
                          style={{
                            height: "auto",
                            color: "black",
                            backgroundColor: "no color",
                          }}
                          placeholder="List of Documents"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "80px",
                            width: "800px",
                          }}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_documents_to_verify"
                          name="gts_documents_to_verify"
                          value={this.state.gts_documents_to_verify}
                        ></textarea>
                        <br /> <br />
                        <b style={{ fontSize: "15px" }}> WORKING HOUR :</b>
                        &emsp;{" "}
                        <input
                          type="number"
                          placeholder="Specify working hour"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "310px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_working_hours"
                          name="gts_working_hours"
                          value={this.state.gts_working_hours}
                        />
                        <br />
                        <br />
                        <b style={{ fontSize: "15px" }}>
                          CONFIDENTIALITY :
                        </b>{" "}
                        &emsp;
                        <input
                          type="text"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "25px",
                            width: "480px",
                          }}
                          onFocus={this.clearAllError}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="confidentiality"
                          name="confidentiality"
                          value={this.state.confidentiality}
                        />
                        <br />
                        <b style={{ fontSize: "15px" }}> RESPONSIBILITY :</b>
                        <br />
                        <textarea
                          className="border border-dark rounded"
                          rows={"auto"}
                          style={{
                            height: "auto",
                            color: "black",
                            backgroundColor: "no color",
                          }}
                          placeholder="List of responsbilities"
                          style={{
                            black: "black",
                            border: "1px solid black",
                            height: "80px",
                            width: "780px",
                          }}
                          onChange={this.EmploymentAgreementChangeHandler}
                          id="gts_responsibilities"
                          name="gts_responsibilities"
                          value={this.state.gts_responsibilities}
                        ></textarea>
                        <br />
                        <br />
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Alert>
                <Row>
                  <Col>
                    <strong>Employer Signature:</strong>&emsp;
                    <input
                      type="open"
                      style={{
                        black: "black",
                        border: "1px solid black",
                        height: "58px",
                        width: "230px",
                      }}
                      onFocus={this.clearAllError}
                      id="gts_employer_signature_id"
                      name="gts_employer_signature_id"
                      // value={this.state.gts_employer_signature_id}
                    />
                    <img
                      src={this.state.employerFile}
                      id="employerSign"
                      width="70"
                      className="iconStyles"
                    />
                    <button
                      type="open"
                      className="btn btn-primary"
                      color="link"
                      onBlur={this.clearAllError}
                      data-toggle="modal"
                      data-target="#employerAgreementEmployerSignature"
                      style={{
                        backgroundColor: "white",
                        color: "white",
                        align: "right",
                        borderRadius: "25px",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      <b> Click here to sign</b>
                    </button>
                  </Col>
                  {/* --------------------------------------------------------Employer Sign------------------------------------------------------------------------------- */}
                  <div
                    id="employerAgreementEmployerSignature"
                    className="modal fade"
                    role="dialog"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="container">
                            <div className="row offset-11">
                              <span
                                color="light"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </span>
                            </div>
                            <br />
                            <div className="row">
                              <div
                                className="col-4"
                                style={{ paddingTop: "20px" }}
                              >
                                <label>
                                  <b>Attach your Signature</b>
                                </label>
                                <br />
                                <input
                                  type="file"
                                  name="image-upload"
                                  id="input"
                                  accept="image/*"
                                  onChange={this.employerImageHandler}
                                />
                              </div>
                              <br />
                              <div className="col-6">
                                <div
                                  className="border border-dark rounded-lg"
                                  style={{
                                    height: "100px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <img
                                    src={this.state.employerFile}
                                    width="70"
                                    className="iconStyles"
                                  />
                                </div>
                              </div>
                              <div
                                className="col"
                                style={{ paddingTop: "20px" }}
                              >
                                <Button
                                  color="primary"
                                  onBlur={this.clearAllError}
                                  onClick={this.attachEmployerSign}
                                >
                                  Attach
                                </Button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <br />
                                <br />
                                <br />
                                <span style={{ color: "red" }}>
                                  <center>
                                    {this.state.employerSignError}
                                  </center>
                                </span>
                                <span style={{ color: "green" }}>
                                  <center>
                                    {this.state.employerSignSuccess}
                                  </center>
                                </span>
                              </div>
                            </div>
                            <br />
                            <br />
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Col sm={6}>
                    <strong>Candidate Signature:</strong>&emsp;
                    <input
                      type="open"
                      style={{
                        black: "black",
                        border: "1px solid black",
                        height: "58px",
                        width: "230px",
                      }}
                      id="candidateDate"
                      name="candidateDate"
                      onChange={this.candidateImageHandler}
                      value={this.state.candidateDate}
                    />
                    <img
                      src={this.state.candidateFile}
                      width="70"
                      className="iconStyles"
                    />
                    <button
                      type="open"
                      className="btn btn-primary"
                      color="link"
                      onBlur={this.clearAllError}
                      data-toggle="modal"
                      align="left"
                      data-target="#employmentAgreementCandidateSignature"
                      style={{
                        backgroundColor: "white",
                        color: "white",
                        align: "right",
                        borderRadius: "25px",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      <b> Click here to sign</b>
                    </button>
                  </Col>
                  {/*-----------------------------------Candidate SIgn------------------------------------  */}

                  <div
                    id="employmentAgreementCandidateSignature"
                    className="modal fade"
                    role="dialog"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="container">
                            <div className="row offset-11">
                              <span
                                color="light"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </span>
                            </div>
                            <br />
                            <div className="row">
                              <div
                                className="col-4"
                                style={{ paddingTop: "20px" }}
                              >
                                <label>
                                  <b>Attach your Signature</b>
                                </label>
                                <br />
                                <input
                                  type="file"
                                  name="image-upload"
                                  id="input"
                                  accept="image/*"
                                  onChange={this.candidateImageHandler}
                                />
                              </div>
                              <br />
                              <div className="col-6">
                                <div
                                  className="border border-dark rounded-lg"
                                  style={{
                                    height: "100px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <img
                                    src={this.state.candidateFile}
                                    width="70"
                                    className="iconStyles"
                                  />
                                </div>
                              </div>
                              <div
                                className="col"
                                style={{ paddingTop: "20px" }}
                              >
                                <Button
                                  color="primary"
                                  onBlur={this.clearAllError}
                                  onClick={this.attachCandidateSign}
                                >
                                  Attach
                                </Button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <br />
                                <br />
                                <br />
                                <span style={{ color: "red" }}>
                                  <center>
                                    {this.state.candidateSignError}
                                  </center>
                                </span>
                                <span style={{ color: "green" }}>
                                  <center>
                                    {this.state.candidateSignSuccess}
                                  </center>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <br />

                <Row>
                  <Col>
                    <strong>Date:</strong>
                  </Col>
                  <Col sm={5}>
                    <input
                      type="date"
                      style={{
                        black: "black",
                        border: "1px solid black",
                        height: "28px",
                        width: "250px",
                      }}
                      id="gts_employer_signature_date"
                      name="gts_employer_signature_date"
                      defaultValue={this.state.gts_employer_signature_date}
                    />
                  </Col>
                  <Col>
                    <strong>Date:</strong>
                  </Col>
                  <Col sm={5}>
                    <input
                      type="date"
                      style={{
                        black: "black",
                        border: "1px solid black",
                        height: "28px",
                        width: "250px",
                      }}
                      id="gts_candidate_signature_date"
                      name="gts_candidate_signature_date"
                      defaultValue={this.state.gts_candidate_signature_date}
                    />{" "}
                  </Col>
                </Row>
              </Alert>
              <br /> <br />
              <br /> <br />
            </div>
          </div>

          <div className="row-0">
            <ButtonGroup>
              <button
                type="save"
                className="btn btn-primary"
                id="SaveDetails"
                onClick={this.saveEmploymentAgreementDetails}
                onBlur={this.clearAllError}
                style={{
                  backgroundColor: "white",
                  color: "white",
                  align: "right",
                  borderRadius: "25px",
                  fontSize: "12px",
                }}
              >
                <b>Save Details</b>
              </button>
              <button
                type="reset"
                className="btn btn-primary"
                id="ResetDetails"
                onClick={this.resetEmploymentAgreementDetails}
                onBlur={this.clearAllError}
                style={{
                  backgroundColor: "white",
                  color: "white",
                  align: "right",
                  borderRadius: "25px",
                  fontSize: "12px",
                }}
              >
                <b>Reset Details</b>
              </button>
            </ButtonGroup>
            <button
              type="submit"
              className="btn btn-primary"
              id="SubmitDetails"
              onClick={this.submitEmploymentAgreementDetails}
              onBlur={this.clearAllError}
              style={{
                backgroundColor: "white",
                color: "white",
                align: "right",
                borderRadius: "25px",
                fontSize: "12px",
                float: "right",
              }}
            >
              <b onClick={this.submitEmploymentAgreementDetails}>
                Submit Contract
              </b>
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default EmploymentAgreementComponent;
