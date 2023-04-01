import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback,
  Alert
} from "reactstrap";
import { loginAction,getMeAction } from "../../../redux/actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visible:false,
      errorstr:'Login Failed!',
      formErrors: {email: false, password: false}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentDidUpdate (prevProps, prevState, snapshot) { 
    const {token:nowUser}=this.props;  
    if(nowUser!='' && nowUser!='failed'){
      this.props.getMeAction(nowUser);
      this.props.history.push('/');	
    }
    
  }
  componentWillMount(){
    if(this.props.token!='faild' && this.props.token!=''){
      this.props.history.push('/');	
    }
  }
  handleLogin () {
    const  {email,password}=this.state;
    let fieldValidationErrors = this.state.formErrors;
    if(email==''){
      fieldValidationErrors.email=true;
      this.setState({formErrors: fieldValidationErrors });
      return;
    }
    if(password==''){
      fieldValidationErrors.password=true;
      this.setState({formErrors: fieldValidationErrors });
      return;
    }

    var loginUser={
      email:this.state.email,
      password:this.state.password
    }
   this.props.loginAction(loginUser);
   
  }

  handleChange = event => {
    let fieldValidationErrors = this.state.formErrors;
    if(event.target.name=='email'){
      let emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? false : true;
    }    
    this.setState({
      [event.target.name]: event.target.value,
      formErrors: fieldValidationErrors      
    });
    
  };
  onDismiss=()=>{
    this.setState({ visible: false });
	}
  render() {
    var emailvalid=this.state.formErrors.email;
    var passwordValid=this.state.formErrors.password;    
    return (
      <div className="app flex-row align-items-center">
       
        <Container>         
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  <Alert color="danger" isOpen={this.props.user=='failed'?true:false} toggle={this.onDismiss}>
                    {this.state.errorstr}
                  </Alert>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          name="email"
                          invalid={emailvalid}
                          autoComplete="email"
                          onChange={this.handleChange}
                        />
                        <FormFeedback >Valid Email</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          invalid={passwordValid}
                          autoComplete="current-password"
                          onChange={this.handleChange}
                        />
                          <FormFeedback >Password is required</FormFeedback>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.handleLogin}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state,props) {
	 //debugger
    return {token:state.auth.token};
}

export default connect(mapStateToProps, {loginAction,getMeAction})(Login);
