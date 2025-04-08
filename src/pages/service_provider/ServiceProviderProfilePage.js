import React, { Component } from 'react'
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.css'
import ServiceProviderMenu from '../../components/service_provider/ServiceProviderMenu';

class ServiceProviderProfilePage extends Component {
 
  
  
    render()
     {
      
        return (
  
     
           <div>
                <Header/>
                <ServiceProviderMenu/>
                <h1>Service Provider Page</h1>

         
    {/* <hr class =" border-darkw-100 mx-auto " />
    <br></br>
<br></br>

{/*HeadLine start*/}

 {/* <EmploymentAgreementComponent/> */}

{/* Save and Reset Detail */}
{/* <br></br>
<br></br> */}
  <Footer /> 


           </div>  //main end



                
        )
    }
}


export default ServiceProviderProfilePage;

  
  
