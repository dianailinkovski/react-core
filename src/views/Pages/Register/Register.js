import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      formErrors: {
        userName: "",
        email: "",
        password: ""
      }
    };
  }

  handelChange = event => {
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    //console.log("Name: ", name);
    //console.log("Value: ", value);

    switch (name) {
      case "userName":
        formErrors.userName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        alert.alert("NUMBER NOT FOUND");
        break;
    }
    this.setState({ formErrors, [name]: value }, () =>
      console.log("do something, now its the state", this.state)
    );
  };

  // handelChange = event => {
  //   this.setState({ name: event.target.value });
  // };

  handleSubmit = event => {
    event.preventDefault();
    if (formValid(this.state.formErrors)) {
      console.log(`
      -- SUBMITTING ---
      userName: ${this.state.userName}
      Email: ${this.state.Email}
      Password: ${this.state.Password}
      `);
    } else {
      console.error("Form Invalid Error");
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={
                          formErrors.userName.length > 0 ? "error" : null
                        }
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        name="userName"
                        onChange={this.handelChange}
                      />
                      {formErrors.userName.length > 0 && (
                        <span className="errorMessage">
                          {formErrors.userName}
                        </span>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="email"
                        className=""
                        placeholder="Email"
                        autoComplete="email"
                        onChange={this.handelChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        className=""
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={this.handelChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </InputGroup>

                    <Button type="submit" color="success" block>
                      Create Account
                    </Button>

                    <CardBody className="text-center">
                      <div>
                        <Link to="/login">Already have an Account?</Link>
                      </div>
                    </CardBody>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
