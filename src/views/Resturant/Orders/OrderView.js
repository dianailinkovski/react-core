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
let Order_status='';
let OrderProcess='';
let grandTotal=0;
class Orders extends Component {
  constructor(props){
    super (props);
    this.state={
      orderid:0,
      orderStatus:''
    }
  }
  componentWillMount(){  
   this.setState({orderid:this.props.match.params.id});
   this.props.getOrderByLocation();  
  }
  acceptProcess=()=>{
    const postData = {
      id: this.state.orderid,
      grandTotal:grandTotal,
      user:Auth.getToken('userId'),
      status:OrderProcess     
    };
    this.props.orderUpdate(postData);
  }
  cancelProcess=()=>{
    const postData = {
      id: this.state.orderid,
      grandTotal:grandTotal,
      user:Auth.getToken('userId'),
      status:'Cancelled'     
    };
    this.props.orderUpdate(postData);
  }
  tabClick=(btn)=>{
    console.log(btn);
    if(btn=='today_btn'){

        this.setState({
          today_btn:true,
          yesterday_btn:false,
          all_btn:false,
          custome_btn:false
        })
    }
    else if(btn=='yesterday_btn'){
      this.setState({
        today_btn:false,
        yesterday_btn:true,
        all_btn:false,
        custome_btn:false
      })

    }
    else if(btn=='custome_btn'){
      this.setState({
        today_btn:false,
        yesterday_btn:false,
        all_btn:false,
        custome_btn:true
      })

    }
    else{
      this.setState({
        today_btn:false,
        yesterday_btn:false,
        all_btn:true,
        custome_btn:false
      })
    }
  }
  render() {  
   if(this.props.updatedOrder.status==200)  {
    this.props.history.push('/resturant/Orders/Orders');
   }
    const {orders}=this.props;    
    let orderNo="";
    let customerName="";
    let payment_method="";
    let delivery_fee=0;
    let subTotal=0;
    let customer_phone='';
    let address1='';
    let zip_city='';
    let created_at=''; 
    let products=[];
    
    let color_status="";
    let discount=0;
    let order_total=0;
    let btn_status='';
   
    orders.map(row=>{     
      if(row._id==this.state.orderid){
          orderNo=row.orderID;
          customerName=row.userInfo.name;
          payment_method=row.paymentOption;
          delivery_fee=row.deliveryCharge;
          subTotal=row.subTotal;
          customer_phone=row.userInfo.contactNumber.toString();
          customer_phone="("+customer_phone.substr(0,3)+") "+customer_phone.substr(3,3)+"-"+customer_phone.substr(6,4);
          address1=row.shippingAddress.address;
          zip_city=row.shippingAddress.zip+", "+row.shippingAddress.city;
          var date_temp=new Date(row.createdAt);
          var month=date_temp.getMonth()+1;
          var year=date_temp.getFullYear();
          var date=date_temp.getDate();
          var hour=date_temp.getHours();
          var minute=date_temp.getMinutes();
          created_at=month+"/"+date+"/"+year+" "+hour+":"+minute;
         
          products=row.productDetails;
          row.productDetails.map(item=>{           
            discount+=parseFloat(item.Discount);
          })
          order_total+=parseFloat(subTotal);
          order_total+=discount;
          order_total+=delivery_fee=='Free'?0:parseFloat(delivery_fee);
          order_total+=parseFloat(Auth.getToken('taxinfo'));
          order_total+=parseFloat(Auth.getToken('rewards'));
          grandTotal=order_total;
          
          Order_status=row.status;
          if(row.status=='Pending'){
            color_status="bg-green";   
            OrderProcess="Accepted";
            btn_status='Accept Order';
          }
          else  if(row.status=='On the Way'){
            color_status="bg-purple";
            OrderProcess="Delivered";
            btn_status='Deliver Order';
          }
          else  if(row.status=='Delivered'){
            color_status="bg-blue";
           
          }
          else  if(row.status=='Canceled'){
            color_status="bg-red";           
          }
          else  if(row.status=='Accepted'){
            color_status="bg-orange";
            OrderProcess="On the Way";   
            btn_status='On the way Order';
          }

         
      }
    })
   
    return (
      <Card>
        <CardHeader className="mb-0 pb-0">         
          <Row>
            <Col xs="10" sm="10"  md="11" className="p-0">
              <Button color="secondary"  className={color_status+" white_bt"} block >{Order_status}</Button>
            </Col>
            <Col xs="2" sm="2"  md="1" className="p-0 mg_auto">
              {Order_status=='On the Way'?<span className="text-center h5">
              <i className="fa fa-truck fa-lg ml-2" />
              </span>:<span className="text-center h5"><i className="fa fa-shopping-bag fa-lg ml-2" /></span>}
            </Col>
            {/**
            <Col xs="12" sm="4"  md="4" className="p-0">
              <Button color="secondary"  disabled block >On it's Way</Button>
            </Col>
            <Col xs="12" sm="4"  md="4" className="p-0">
              <Button color="secondary"   disabled  block >Delivered</Button>
            </Col> */}
          </Row> 
          <Row>
              <Col xs="12" sm="6"  md="6" className="pl-2">
                 
              </Col>
              <Col xs="12" sm="6"  md="6" className="pl-2">
               
              </Col>
            </Row>    
        </CardHeader>
        <CardBody className="p-0 p-md-3">           
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2">                         
              <Col xs="12" sm="6"  md="6" >
                   <Row>
                      <Col xs="12" sm="6"  md="6" className="pl-2">
                        <p className="h5 mt-2 text-dark">Order# {orderNo}</p>
                      </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12"  md="12" className="tableCard">                   
                        <Row className="p-2">
                          <Col xs="8" sm="8"  md="8" >
                              Payment Method:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                             {payment_method}
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8"  md="8">
                              Sub Total:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                              $ {subTotal}
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="8">
                              Discount:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                          $ {discount}
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="8">
                              State Tax:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                          $  {Auth.getToken('taxinfo')}
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="8">
                            Delivery Fee:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                           {delivery_fee!='Free'?'$ '+delivery_fee:delivery_fee}
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8"  md="8">
                            Tip:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                          $0
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="8">
                            Rewards:
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                          $  {Auth.getToken('rewards')}
                          </Col>
                        </Row>
                        <Row className="p-2 total_card">
                          <Col xs="8" sm="8" md="8">
                            <p className="h5 text-dark">Order Total:</p>
                          </Col>
                          <Col xs="4" sm="4"  md="4" className="text-center">
                           <p className="h5 text-dark">$ {order_total}</p>
                          </Col>
                        </Row>
                    </Col>
                  </Row>
              </Col>
              <Col xs="12" sm="6"  md="6" >
                <Row>
                   <Col xs="12" sm="12"  md="12" className="pl-2">
                      <p className="h5 mt-2 text-dark">Customer Info:</p>
                    </Col>
                    <Col xs="12" sm="12"  md="12" className="ml-md-3 tableCard">
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">
                           {customerName}
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">
                           {customer_phone}
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">                          
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">
                           {address1}
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">
                           {zip_city}
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">                          
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2 mb-2">
                          <Col xs="8" sm="8" md="10">
                          <p className="h5 text-dark">Instructions:</p>
                          </Col>
                          <Col xs="4" sm="4"  md="2" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">                          
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="8" sm="8" md="6">                          
                          </Col>
                          <Col xs="4" sm="4"  md="6" className="text-center">                         
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col xs="12" sm="12" md="12" className="text-center">    
                            {created_at}                      
                          </Col>                          
                        </Row>

                    </Col>

                </Row>  
              </Col>  
           </Row>
           <Row className=" ml-2 mr-2 ml-md-4 mr-md-2 customer_order">  
              <Col xs="12" sm="12" md="12">    
                <p className="h5 mt-2 text-dark">Customer Order:</p>
              </Col>                
           </Row>
          {
            products.map((row,index)=>{
            return <Row key={index} className=" ml-2 mr-2 ml-md-4 mr-md-2 p-2">  
                  <Col xs="4" sm="4" md="6"> 
                    {row.title}
                  </Col>  
                  <Col xs="3" sm="4" md="2" className="text-center"> 
                  ${row.price}
                  </Col>  
                  <Col xs="2" sm="4" md="2" className="text-center"> 
                  X {row.Quantity}
                  </Col>   
                  <Col xs="3" sm="4" md="2" className="text-center"> 
                  $ {row.totalPrice}
                  </Col>                
              </Row>
            })
          }
          

        </CardBody>
        <CardFooter>
          <Row  className="  ml-md-4 mr-md-2 p-2"> 
            <Col xs="12" sm="12" md="9">
                     <FormGroup>                     
                      <Input
                        type="text"
                        id="name"
                        placeholder="Message:"
                        required
                      />
                    </FormGroup>
            </Col>
            <Col xs="12" sm="12" md="3" >{
              (Order_status!='Delivered' || Order_status!='Canceled') && <Button variant="primary" className={"appept_btn "+ color_status} onClick={this.acceptProcess}>{btn_status}</Button>
            }
                
                <Button variant="primary" onClick={this.cancelProcess} className={"appept_btn bg-red "}>Cancel Order</Button>
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
export default connect(mapStateToProps, {getOrderByLocation,orderUpdate})(Orders);

