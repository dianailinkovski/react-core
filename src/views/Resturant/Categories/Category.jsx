import React, { Component, Text } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import _ from "lodash";

import { Constants } from "../../../constants/environment";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      imageUrl: "",
      enable: "",
      sort: "",
      id: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("Constructor", this.state);
  }

  componentDidMount() {
    console.log("componentWillMount called");
    //Called the first time the component is loaded right before the component is added to the page
    axios
      .get(Constants.BASE_URL + `api/categories/${this.props.match.params.id}`)
      .then(res => {
        //const switchON = (res.data.enable = "enable" ? true : false);

        this.setState({
          categoryName: res.data.categoryName,
          imageUrl: res.data.imageUrl,
          enable: res.data.enable,
          sort: res.data.sort
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
      //categoryName: event.target.value,
    });
    console.log("event", event);
    console.log("event name", event.target.name);
    console.log("event value", event.target.value);
  };

  handleSubmit = event => {
    axios
      //.post("/save", { firstName: "Marlon", lastName: "Bernardes" })
      //.put(BASE_URL + `api/categories/${this.props.match.params.id}`)
      .put(
        Constants.BASE_URL + `api/categories/${this.props.match.params.id}`,
        {
          //.post(BASE_URL + `api/categories`, {
          categoryName: this.state.categoryName,
          imageUrl: this.state.imageUrl,
          enable: this.state.enable,
          sort: this.state.sort
        }
      )
      .then(function(response) {
        console.log("saved successfully", response);
      });

    alert("A name was submitted: " + this.state.sort);
    event.preventDefault();
  };

  render() {
    console.log("State in Render", this.state);
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <strong>Edit Category: {this.state.categoryName}</strong>
            </CardHeader>
            <CardBody>
              <Form
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input" />
                    <Input type="file" id="file-input" name="file-input" />
                  </Col>
                  <Col xs="12" md="9" className="float-right">
                    <img src={this.state.imageUrl} width="150" alt="" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Category Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      name="categoryName"
                      placeholder="Text"
                      defaultValue={this.state.categoryName}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Sort By - {this.state.sort}</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="sort"
                      id="select"
                      onChange={this.handleChange}
                      value={this.state.sort}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="disabled-input">Disable/Enable</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <AppSwitch
                      className={"mx-1"}
                      variant={"pill"}
                      color={"success"}
                      label
                      name="sortSwitch"
                      checked={this.state.enable}
                      //value={(this.state.enable = "true" ? true : false)}
                      {...console.log("sss", this.state.enable)}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Locations</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value="option1"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-checkbox1"
                      >
                        One
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox2"
                        name="inline-checkbox2"
                        value="option2"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-checkbox2"
                      >
                        Two
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-checkbox3"
                      >
                        Three
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <CardFooter>
                  <Button
                    type="submit"
                    size="sm"
                    name="submit"
                    color="primary"
                    //onSubmit={this.handleSubmit}
                  >
                    <i className="fa fa-dot-circle-o" /> Submit
                  </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban" /> Cancel
                  </Button>
                </CardFooter>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Category;
