import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getOrderByLocation,resetUpdatedOrder } from "../../../redux/actions/orderActions";
import Auth from '../../../cookie/Auth.js';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  TabContent,
  TabPane,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
var today=new Date('2018-01-31T07:39:32.621Z');
var date=today.getDate();
var month=today.getMonth()+1;
var year=today.getFullYear();
class Orders extends Component {
  constructor(props){
    super (props);
    this.state={
      today_btn:false,
      yesterday_btn:false,
      custome_btn:false,
      all_btn:true,
      fromDt:'0000-00-00',
      toDt:'0000-00-00'

    }
  }
  componentWillMount(){  
   this.props.getOrderByLocation();
  }
  orderView=(orderId)=>{
      this.props.resetUpdatedOrder();
      this.props.history.push('/resturant/Orders/Orders/view/'+orderId)
      
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
  viewStatics=()=>{
    let from_to=this.state.fromDt+":"+this.state.toDt;
    this.props.history.push('/resturant/Orders/Orders/statics/'+from_to)
   
  }
  onChangeFrom=(event)=>{  
    var temp=event.target.value;
    temp=temp.split("-");
     temp=temp[0]+"-"+parseInt(temp[1])+"-"+parseInt(temp[2]);
    this.setState({fromDt:temp});
  }
  onChangeTo=(event)=>{  
     var temp=event.target.value;
     temp=temp.split("-");
     temp=temp[0]+"-"+parseInt(temp[1])+"-"+parseInt(temp[2]);
    this.setState({toDt:temp});
  }
  render() {    
    const {orders}=this.props;
    const {today_btn,yesterday_btn,all_btn,custome_btn}=this.state;
    let temp=[]; 
    orders.map(item=>{
       if(today_btn){
        if(item.year==year && item.month==month && item.date==date){
          temp.push(item);
        }
       }
       else if(yesterday_btn){
        if(item.year==year && item.month==month && item.date==parseInt(date)-1){
          temp.push(item);
        }
       }
       else if(custome_btn){
        var orderDate=new Date(item.createdAt);
        var orderDay=orderDate.getDate();
        var orderMonth=orderDate.getMonth()+1;
        var orderYear=orderDate.getFullYear();
        let orderDt=orderYear+"-"+orderMonth+"-"+orderDay;        
        if(orderDt>=this.state.fromDt && orderDt<=this.state.toDt){
        temp.push(item);
        }        
       }    
       else{
        temp.push(item);
       }  
    })
    var filter_orders=temp;
   
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col xs="12" sm="12"  md="3" className="p-1">
              <InputGroup className="input-prepend">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-search"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input size="16" type="text" placeholder="Search" />
                 
                </InputGroup>
            </Col>
          </Row>
          <Row>
            {/**
            <h5>
              <i className="icon-basket-loaded" />
            </h5>
             */}
            <Col xs="3" sm="3"  md="3" className="p-1">
              <Button color="secondary" onClick={()=>this.tabClick('today_btn')} size="sm" block active={today_btn}>Today</Button>
            </Col>
            <Col xs="3" sm="3"  md="3" className="p-1">
              <Button color="secondary" onClick={()=>this.tabClick('yesterday_btn')} size="sm" block active={yesterday_btn}>Yesterday</Button>
            </Col>
            <Col xs="3" sm="3"  md="3" className="p-1">
              <Button color="secondary"  onClick={()=>this.tabClick('all_btn')} size="sm" block active={all_btn}>All</Button>
            </Col>
            <Col xs="3" sm="3"  md="3" className="p-1">
              <Button color="secondary"  onClick={()=>this.tabClick('custome_btn')} size="sm" block active={custome_btn}>Custome</Button>
            </Col>
          </Row>         
        </CardHeader>
        <CardBody className="p-0 p-md-3">
            {this.state.custome_btn && <Row>
                <Col xs="6" sm="6"  md="3" className="p-1">
                    <Input
                        type="date"
                        id="date-input"
                        name="date-input"
                        placeholder="date"
                        onChange={this.onChangeFrom}
                      />
                </Col>
                <Col xs="6" sm="6"  md="3" className="p-1">
                    <Input
                        type="date"
                        id="date-input"
                        name="date-input"
                        placeholder="date"
                        onChange={this.onChangeTo}
                      />
                </Col>
                <Col xs="6" sm="6"  md="3" className="text-center">
                    <Button color="secondary"  onClick={this.viewStatics} size="sm" block active={custome_btn}>Statics</Button>
                </Col>
            </Row> }
            
          <ListGroup>
            {
              filter_orders.map(row=>{
                
                if(row.status=='Pending'){               
                  return <ListGroupItem key={row._id} action className="bg-green" onClick={()=>this.orderView(row._id)} >
                    <Row>
                    <Col xs="6" sm="6"  md="8">
                        <small className="text-white">Order# {row.orderID}</small>
                        <p className="h5 mt-2 text-white">{row.userInfo.name}</p>
                      </Col> 
                      <Col  xs="4" sm="4"  md="2" className="m-auto">
                        <p className="text-white h3 mt-2">NEW</p>
                      </Col>
                      <Col xs="2" sm="2"  md="2" className="m-auto">
                        <p className="text-center h2 text-white">
                          <i className="fa fa-shopping-bag fa-lg mt-4" />                    
                        </p>
                      </Col>
                    </Row>
                  </ListGroupItem>
               }
                else if(row.status=='On the Way'){
                  return <ListGroupItem key={row._id} action className="bg-purple" onClick={()=>this.orderView(row._id)}>
                      <Row >
                        <Col xs="6" sm="6"  md="8">
                          <small className="text-white">Order# {row.orderID}</small>
                          <p className="h5 mt-2 text-white">{row.userInfo.name}</p>
                        </Col>
                        <Col xs="4" sm="4"  md="2"  className="m-auto">
                          <p className="text-white h4 mt-2">OPEN</p>
                        </Col>
                        <Col xs="2" sm="2"  md="2"  className="m-auto">
                          <p className="text-center h2 text-white">
                            <i className="fa fa-truck fa-lg mt-3" />                   
                          </p>
                        </Col>
                      </Row>
                    </ListGroupItem>
                }
                else if(row.status=='Delivered'){
                  return  <ListGroupItem key={row._id} action className="bg-blue" onClick={()=>this.orderView(row._id)}>
                    <Row>
                      <Col xs="6" sm="6"  md="8">
                        <small className="text-white">Order# {row.orderID}</small>
                        <p className="h5 mt-2 text-white">{row.userInfo.name}</p>
                      </Col>    
                      <Col xs="4" sm="4"  md="2" className="m-auto">
                        <p className="text-white h4 mt-2">CLOSED</p>
                      </Col>            
                      <Col xs="2" sm="2"  md="2" className="m-auto">
                        <p className="text-center h2 text-white">
                          <i className="fa fa-shopping-bag fa-lg mt-4" />                  
                        </p>
                      </Col>               
                    </Row>
                  </ListGroupItem>
                }
                else if(row.status=='Cancelled'){
                  return  <ListGroupItem key={row._id} action className="bg-red" onClick={()=>this.orderView(row._id)}>
                    <Row>
                      <Col xs="6" sm="6"  md="8">
                        <small className="text-white">Order# {row.orderID}</small>
                        <p className="h5 mt-2 text-white">{row.userInfo.name}</p>
                      </Col>    
                      <Col xs="4" sm="4"  md="2" className="m-auto">
                        <p className="text-white h4 mt-2">Canceled</p>
                      </Col>            
                      <Col xs="2" sm="2"  md="2" className="m-auto">
                        <p className="text-center h2 text-white">
                          <i className="fa fa-shopping-bag fa-lg mt-4" />                  
                        </p>
                      </Col>               
                    </Row>
                  </ListGroupItem>
                }
                else if(row.status=='Accepted'){
                  return  <ListGroupItem key={row._id} action className="bg-orange" onClick={()=>this.orderView(row._id)}>
                    <Row>
                      <Col xs="6" sm="6"  md="8">
                        <small className="text-white">Order# {row.orderID}</small>
                        <p className="h5 mt-2 text-white">{row.userInfo.name}</p>
                      </Col>    
                      <Col xs="4" sm="4"  md="2" className="m-auto">
                        <p className="text-white h4 mt-2">Accept</p>
                      </Col>            
                      <Col xs="2" sm="2"  md="2" className="m-auto">
                        <p className="text-center h2 text-white">
                          <i className="fa fa-shopping-bag fa-lg mt-4" />                  
                        </p>
                      </Col>               
                    </Row>
                  </ListGroupItem>
                }

              })
            }
           {
             filter_orders.length==0?<ListGroupItem  action >
                    <Row>
                      <Col xs="12" sm="12"  md="12">                       
                        <p className="text-center h5 text-dark">
                                   The result is nothing.
                        </p>
                      </Col>               
                    </Row>
                  </ListGroupItem>:''
           }
          {/**
            <ListGroupItem  action color="info" className="bg-orange">
                    <Row>
                      <Col xs="6" sm="6"  md="8">
                        <small className="text-white">Order# 5555</small>
                        <p className="h5 mt-2 text-dark">sdfsdfsdf</p>
                      </Col>    
                      <Col xs="4" sm="4"  md="2" className="m-auto">
                        <p className="text-dark h4 mt-2">Accept</p>
                      </Col>            
                      <Col xs="2" sm="2"  md="2" className="m-auto">
                        <p className="text-center h2 text-white">
                          <i className="fa fa-shopping-bag fa-lg mt-4" />                  
                        </p>
                      </Col>               
                    </Row>
                  </ListGroupItem>
             */}
            
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}


function mapStateToProps(state,props) {  
  return {orders:state.order.orders};
}
export default connect(mapStateToProps, {getOrderByLocation,resetUpdatedOrder})(Orders);

