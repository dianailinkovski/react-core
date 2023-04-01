import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

import { createCategory } from "../../../redux/actions/categoryActions";
import ImgDropCrop from "../../../components/ImgDropCrop";

class addCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      imageUrl: "",
      enable: false,
      sort: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //console.log("Constructor", this.state);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
      //categoryName: event.target.value,
    });
    // console.log("event", event);
    // console.log("event name", event.target.name);
    // console.log("event value", event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();

    const newCategory = {
      categoryName: this.state.categoryName,
      sort: this.state.sort,
      imageUrl: this.state.imageUrl,
      enable: this.state.enable
      // restaurantID: "5a6eb71728d7b9001499a140",
      // locationInfo: {
      //   locationId: "koramangala",
      //   locationName: "5a6ec34fbebf1b001460d926"
      // },
      // publicId: ""
    };

    this.props.createCategory(newCategory);
    console.log("handleSubmit", newCategory);
  };

  render() {
    //console.log("State in Render", this.props);
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <strong>ADD New Category - JS</strong>
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
                  <Col xs="12" md="6" className="float-right">
                    <img src={this.state.imageUrl} width="150" alt="" />
                  </Col>
                  <Col md="3">
                    <ImgDropCrop />
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
                      //defaultValue={this.state.categoryName}
                      value={this.state.categoryName}
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

addCategory.propTypes = {
  createCategory: PropTypes.func.isRequired
  //newCategory: PropTypes.object
};

// const mapStateToProps = state => ({
//   newCategory: state.categories.item
// });

export default connect(
  null,
  { createCategory }
)(addCategory);
