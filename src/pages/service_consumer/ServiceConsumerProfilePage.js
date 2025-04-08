
import React, { Component } from 'react'
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.css'
import ServiceConsumerMenu from '../../components/service_consumer/ServiceConsumerMenu';

class ServiceConsumerProfilePage extends Component {



  render() {

    return (


      <div>
        <Header />
        <ServiceConsumerMenu />
        <h1>Service Consumer Page</h1>
        <Footer />


      </div>  //main end




    )
  }
}
export default ServiceConsumerProfilePage;
