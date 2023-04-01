import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getOrderByLocation,orderUpdate } from "../../../redux/actions/orderActions";
import Auth from '../../../cookie/Auth.js';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  TabContent,
  TabPane,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText,

} from "reactstrap";
import { Link } from "react-router-dom";
class OrderStatics extends Component {
  constructor(props){
    super (props);
    this.state={
      from_to:'0000-0-0:0000-0-0',
      fromDt:'0000-0-0'  ,
      toDt:'0000-0-0'
    }
  }
  componentWillMount(){  
  
   let temp_dt=this.props.match.params.id.split(":");
   this.setState({from_to:this.props.match.params.id,
    fromDt:temp_dt[0],toDt:temp_dt[1]
  });
   console.log(temp_dt[0],temp_dt[1]);
   this.props.getOrderByLocation(); 
  } 
  
  render() {  
   
    const {orders}=this.props;  
    console.log(orders);
    let temp=[];
    let cod=0;
    let paypal=0;
    let strip=0;
    let total_orders=0;
    let total_subtotal=0;
    let tax=0;
    let delivery_fee=0;
    let total_sum=0;

    orders.map((row,index)=>{
      var orderDate=new Date(row.createdAt);
      var orderDay=orderDate.getDate();
      var orderMonth=orderDate.getMonth()+1;
      var orderYear=orderDate.getFullYear();
      let orderDt=orderYear+"-"+orderMonth+"-"+orderDay; 

      if(orderDt>=this.state.fromDt && orderDt<=this.state.toDt){
        total_orders=index+1;
         if(row.paymentOption=="COD"){
           cod+=parseFloat(row.subTotal);
         }
         else if(row.paymentOption=="PayPal"){
          paypal+=parseFloat(row.subTotal);
         }
         else if(row.paymentOption=="Stripe"){
          strip+=parseFloat(row.subTotal);
         }
         tax+=parseFloat(Auth.getToken('taxinfo'));
         delivery_fee+=row.deliveryCharge='Free'?0:parseFloat(row.deliveryCharge);        
        
      }      
    })
   
    total_subtotal+=cod;
    total_subtotal+=paypal;
    total_subtotal+=strip;

    total_sum+=total_subtotal+tax+delivery_fee;

    return (
      <Card>
        <CardHeader className="mb-0 pb-0">         
          <Row>
            <Col xs="4" sm="4"  md="8" className="p-0">
               <p className="text-dark h2 mt-2">Statics</p>
            </Col>
            <Col xs="8" sm="8"  md="4" className="p-0 mg_auto ">
                <p className="text-dark h5 mt-2 text-center">Date : {this.state.fromDt}~{this.state.toDt}</p>
            </Col>           
          </Row> 
         
        </CardHeader>
        <CardBody className="p-0 p-md-3">           
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Total Orders :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">{total_orders}</p>                  
              </Col>  
           </Row>  
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2 mb-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-left">Sub Total :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center"></p>                  
              </Col>  
           </Row>   

           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">COD :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {cod}</p>                  
              </Col>  
           </Row> 
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Paypal :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {paypal}</p>                  
              </Col>  
           </Row> 
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Strip :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {strip}</p>                  
              </Col>  
           </Row> 
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="12" sm="12"  md="5" >   
                <hr></hr>            
              </Col>              
           </Row> 
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >              
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {total_subtotal}</p>                  
              </Col>  
           </Row> 

           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Tax Collected :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {tax}</p>                  
              </Col>  
           </Row> 

           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Delivery Fee :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {delivery_fee}</p>                  
              </Col>  
           </Row> 
          

           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Tip's :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ 0</p>                  
              </Col>  
           </Row> 
          

           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="12" sm="12"  md="5" >   
                <hr></hr>            
              </Col>              
           </Row> 

           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="6" sm="6"  md="3" >
               <p className="text-dark h5 mt-2 text-center">Total Amount :</p>
              </Col> 
              <Col xs="6" sm="6"  md="2" >
                <p className="text-dark h5 mt-2 text-center">$ {total_sum}</p>                  
              </Col>  
           </Row> 

        </CardBody>
        <CardFooter>
          <Row  className="  ml-md-4 mr-md-2 p-2"> 
            <Col xs="12" sm="12" md="9">                   
            </Col>
            <Col xs="12" sm="12" md="3" >                
                <Button variant="primary" className={"appept_btn bg-red "}>Print Report</Button>
            </Col>
          </Row>
        </CardFooter>

      </Card>
    );
  }
}


function mapStateToProps(state,props) {  
  return {orders:state.order.orders,updatedOrder:state.order.updatedOrder};
}
export default connect(mapStateToProps, {getOrderByLocation,orderUpdate})(OrderStatics);

