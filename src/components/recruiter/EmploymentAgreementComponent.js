import React, { useState, useEffect } from 'react';
import { Alert, Button, ButtonGroup, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Axios from 'axios';

function Retrive (props){
    const [details,setDetails] = useState([]);
    useEffect(() => {loadUsers();},[]);
    const loadUsers = async() => {
        const result = await Axios.get('http://localhost:1209/employer_agreement');
        setDetails(result.data);
    };
    const deleteDetails = async id => {
        await Axios.delete(`http://localhost:1209/employer_agreement/${id}`);
        alert("Submited Successfully");
        window.location.reload(true);
        loadUsers();
    }
    return(
        <Container>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            {
                details.map(det => (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Employment Agreement
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mt-3" style={{"position":"relative","height":"350px","overflow":"auto","display":"block"}}>
                                <Row>
                                    <Col>
                                        <Alert className="border border-dark rounded-lg">
                                            <p style={{"text-align":"justify"}}>
                                                This contract is made between <strong>{det.recruiter_name}</strong> of CHAUKURI GTS and <strong>{det.employer_name}</strong> <strong>{det.employer_company_name}</strong> <strong>{det.employer_company_location}</strong>. 
                                                This document constitutes an employment agreement between these two parties and is governed by the laws of Banglore, Karnataka . IN CONSIDERATION of this mutual understanding,the parties agree to the following terms and conditions:
                                            </p>
                                            <p style={{"text-align":"justify"}}>
                                                This contract is only to be considered where the Jobseeker <strong>{det.jobseeker_name}</strong> has agreed to willfully and to the best of their ability to carry out the duties and responsibilities communicated to them by the <strong>{det.project_manager}</strong>
                                                &nbsp;<strong>{det.client_company_name}</strong>&nbsp;<strong>{det.client_company_location}</strong> complying with all company policies.
                                            </p>
                                            <p style={{"text-align":"justify"}}>
                                                As a <strong>{det.job_title}</strong> it is the duty of the Jobseeker to perform all essential jon functions and duties which are as of follows:
                                                <strong>{det.functions_duties}</strong>.
                                            </p>
                                            <p style={{"text-align":"justify"}}>
                                                From time to time,the Employer may also add other duties within the reasonable scope of the Jobseeker's work. The task is to worked on
                                                &nbsp;<strong>{det.date}</strong> for <strong>{det.no_of_months}</strong> months.
                                            </p>
                                            <p style={{"text-align":"justify"}}>
                                                As compensation for the services provided,the Jobseeker shall be paid a wage of <strong>{det.salary}</strong> <strong>{det.currency_type}</strong> [per month] and will be subject to an [quarterly/annual] performance review.All payments shall be subject to mandatory employment deductions(State & Federal Taxes, Social Security and Medicare).
                                            </p>
                                            <p style={{"text-align":"justify"}}><u><strong>Contact Details</strong></u></p>
                                            <p>
                                                <Row>
                                                    <Col><strong>Jobseeker Email:</strong>&nbsp;<label style={{"font-size":"13px"}}>{det.jobseeker_email}</label></Col>
                                                    <Col><strong>Employer Email:</strong>&nbsp;<label style={{"font-size":"13px"}}>{det.employer_email}</label></Col>
                                                    <Col><strong>Manager Email:</strong>&nbsp;<label style={{"font-size":"12px"}}>{det.project_manager_email}</label></Col>
                                                </Row>
                                                <Row>
                                                    <Col><strong>Jobseeker Contact:</strong><label style={{"font-size":"13px"}}>{det.jobseeker_contact}</label></Col>
                                                    <Col><strong>Employer Contact:</strong><label style={{"font-size":"13px"}}>{det.employer_contact}</label></Col>
                                                    <Col><strong>Manager Contact:</strong><label style={{"font-size":"13px"}}>{det.project_manager_contact}</label></Col>
                                                </Row>
                                            </p>
                                            <hr/>
                                            <Alert>
                                                <Row>
                                                    <Col><strong>Employee Signature:</strong></Col>
                                                    <Col sm={4}><strong>Jobseeker Signature:</strong></Col>
                                                </Row>
                                                <Row>
                                                    <Col><strong>Date:</strong></Col>
                                                    <Col sm={4}><strong>Date:</strong></Col>
                                                </Row>
                                                <Row>
                                                    <Col><strong>Recruiter Signature:</strong></Col>
                                                    <Col sm={4}><strong>Admin Signature:</strong></Col>
                                                </Row>
                                                <Row>
                                                    <Col><strong>Date:</strong></Col>
                                                    <Col sm={4}><strong>Date:</strong></Col>
                                                </Row>
                                            </Alert>
                                        </Alert>
                                    </Col>
                                </Row>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => deleteDetails(det.id)}>Send</Button>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>   
                    </>
                ))}
            </Modal>
        </Container>
    );
};

function EmploymentAgreementComponent (){
    const [modalShow, setModalShow] = useState(false);
    const [details,setDetails] = useState({
        recruiter_name:"",
        employer_name:"",
        employer_company_name:"",
        employer_company_location:"",
        jobseeker_name:"",
        project_manager:"",
        client_company_name:"",
        client_company_location:"",
        job_title:"",
        functions_duties:"",
        date:"",
        no_of_months:"",
        salary:"",
        currency_type:"",
        jobseeker_email:"",
        jobseeker_contact:"",
        employer_email:"",
        employer_contact:"",
        project_manager_email:"",
        project_manager_contact:""
    });
    const {
        recruiter_name,
        employer_name,
        employer_company_name,
        employer_company_location,
        jobseeker_name,
        project_manager,
        client_company_name,
        client_company_location,
        job_title,
        functions_duties,
        date,
        no_of_months,
        salary,
        currency_type,
        jobseeker_email,
        jobseeker_contact,
        employer_email,
        employer_contact,
        project_manager_email,
        project_manager_contact,
    } = details;
    const resetDetails = e =>{
        setDetails({...details,[e.target.name] : " "});
    };
    const onInputChange = e =>{
        setDetails({...details,[e.target.name] : e.target.value});
    };
    const onSubmit = async e =>{
        e.preventDefault();
        await Axios.post("http://localhost:1209/employer_agreement",details);
        alert("Saved Successfully");
        window.location.reload(true);
        //history.push("/SubmitAgreement");
    };
    return(
        <Container fluid>
            <div className="mt-3">
                <Row>
                    <Col>
                        <Form onSubmit={e => onSubmit(e)}>
                            <Alert className="border border-dark rounded-lg">
                                <p style={{"text-align":"justify"}}>This contract is made between &nbsp;                        
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="recruiter_name" value={recruiter_name} placeholder = "Recruiter name" /> of CHAUKURI GTS and &nbsp;                      
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="employer_name" value={employer_name} placeholder = "Employer name" /> of &nbsp;                        
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="employer_company_name" value={employer_company_name} placeholder = "Employer company name" /> &nbsp;                      
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="employer_company_location" value={employer_company_location} placeholder = "Employer company location" />&#46;&nbsp;
                                    This document constitutes an employment agreement between these two parties and is governed by the laws of Banglore, Karnataka &#46; IN CONSIDERATION of this mutual understanding,the parties agree to the following terms and conditions:
                                </p>
                                <p style={{"text-align":"justify"}}>This contract is only to be considered where the Jobseeker &nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="jobseeker_name" value={jobseeker_name} placeholder = "Jobseeker Name" />&nbsp;
                                    has agreed to willfully and to the best of their ability to carry out the duties and responsibilities communicated to them by the &nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="project_manager" value={project_manager} placeholder = "Project Manager" />&nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="client_company_name" value={client_company_name} placeholder = "Client Company Name" />&nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="client_company_location" value={client_company_location} placeholder = "Client Company Location" />&nbsp;
                                    complying with  all company policies. 
                                </p>                                 
                                <p style={{"text-align":"justify"}}>As a &nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="job_title" value={job_title} placeholder = "Job Title" />&nbsp;  
                                    it is the duty of the Jobseeker to perform all essential jon functions and duties which are as of follows:
                                </p>
                                <p>
                                    <textarea type="text" rows={5} cols={180} className="border border-dark" onChange = {e => onInputChange(e)} name="functions_duties" value={functions_duties} />
                                </p>
                                <div className="container align-items-center"></div>
                                <p style={{"text-align":"justify"}}>From time to time,the Employer may also add other duties within the reasonable scope of the Jobseeker's work. The task is to worked on &nbsp;
                                    <input required type="date" className="border border-dark" onChange = {e => onInputChange(e)} name="date" value={date}/> for &nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="no_of_months" value={no_of_months} placeholder = " No of Months" />&nbsp;
                                    months.
                                </p>
                                <p style={{"text-align":"justify"}}>As compensation for the services provided,the Jobseeker shall be paid a wage of&nbsp;
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="salary" value={salary} placeholder = "" />&nbsp;   
                                    <input required type ="text" className="border border-dark" onChange = {e => onInputChange(e)} name="currency_type" value={currency_type} placeholder = "Select Currency" />   [permonth] and will be subject to
                                    an [quarterly/annual] performance review.All payments shall be subject to mandatory employment deductions(State & Federal Taxes, Social Security and Medicare).
                                </p>
                                <p><u><strong>Contact Details:</strong></u></p>
                                <p style={{"text-align":"justify"}}>
                                    <Row>
                                        <Col>
                                            <label htmlFor="jobseeker_email"><strong>Jobseeker Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
                                            <input required type="email" className="border border-dark" onChange = {e => onInputChange(e)} name="jobseeker_email" id="jobseeker_email" value={jobseeker_email} />
                                        </Col>
                                        <Col>
                                            <label htmlFor="employer_email"><strong>Employer Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
                                            <input required type="email" className="border border-dark" onChange = {e => onInputChange(e)} name="employer_email" id="employer_email" value={employer_email} />
                                        </Col>
                                        <Col>
                                            <label htmlFor="project_manager_email"><strong>Project Manager Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
                                            <input required type="email" className="border border-dark" onChange = {e => onInputChange(e)} name="project_manager_email" id="project_manager_email" value={project_manager_email} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="jobseeker_contact"><strong>Jobseeker Contact:&nbsp;</strong></label>
                                            <input required type="text" className="border border-dark" onChange = {e => onInputChange(e)} name="jobseeker_contact" id="jobseeker_contact" value={jobseeker_contact} />
                                        </Col>
                                        <Col>
                                            <label htmlFor="employer_contact"><strong>Employer Contact:&nbsp;</strong></label>
                                            <input required type="text" className="border border-dark" onChange = {e => onInputChange(e)} name="employer_contact" id="employer_contact" value={employer_contact} />
                                        </Col>
                                        <Col>
                                            <label htmlFor="project_manager_contact"><strong>Project Manager Contact:&nbsp;</strong></label>
                                            <input required type="text" className="border border-dark" onChange = {e => onInputChange(e)} name="project_manager_contact" id="project_manager_contact" value={project_manager_contact} />
                                        </Col>
                                    </Row>
                                </p>
                                <hr/>
                                <Alert>
                                    <Row>
                                        <Col>
                                            <Row><label><strong>Employee Signature:</strong></label></Row>
                                            <Row><label><strong>Date:</strong></label></Row>
                                        </Col>
                                        <Col sm={4}>
                                            <Row><label><strong>Jobseeker Signature:</strong></label></Row>
                                            <Row><label><strong>Date:</strong></label></Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Row><label><strong>Recruiter Signature:</strong></label></Row>
                                            <Row><label><strong>Date:</strong></label></Row>
                                        </Col>
                                        <Col sm={4}>
                                            <Row><label><strong>Admin Signature:</strong></label></Row>
                                            <Row><label><strong>Date:</strong></label></Row>
                                        </Col>
                                    </Row>
                                </Alert>
                            </Alert>
                            <ButtonGroup>
                                <Button variant="primary" type="submit" className="border rounded-lg">Save Details</Button>{" "}
                                <Button variant="primary" type="reset" onReset={(e) => resetDetails(e)} className="btn border rounded-lg">Reset Details</Button>
                            </ButtonGroup>
                            <Button variant="primary" type="submit" onClick={() => setModalShow(true)} className="border rounded-lg" style={{"float":"right"}}>Submit Contract</Button>
                         
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default EmploymentAgreementComponent;