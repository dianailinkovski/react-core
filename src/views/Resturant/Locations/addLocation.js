import React, { Component } from "react";
import axios from "axios";
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

class addLocations extends Component {
  state = {};
  render() {
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="icon-location-pin" /> Add a Location
          </h5>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label htmlFor="location">
              <strong>Location</strong>
            </Label>
            <Input type="text" id="location" placeholder="Location Name" />
          </FormGroup>
          <FormGroup row className="my-0">
            <Col xs="6">
              <FormGroup>
                <Label htmlFor="manager">
                  <strong>Location Manager</strong>
                </Label>
                <Input type="text" id="manager" placeholder="Manager Name" />
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label htmlFor="phone-number">
                  <strong>Location Phone Number</strong>
                </Label>
                <Input type="text" id="phone-number" placeholder="Phone #" />
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="street">
              <strong>Street Address</strong>
            </Label>
            <Input type="text" id="street" placeholder="Street Name" />
          </FormGroup>
          <FormGroup row className="my-0">
            <Col xs="6">
              <FormGroup>
                <Label htmlFor="city">
                  <strong>City</strong>
                </Label>
                <Input type="text" id="city" placeholder="Enter Your City" />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <Label htmlFor="state">
                  <strong>State</strong>
                </Label>
                <Input type="text" id="state" placeholder="State" />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label htmlFor="postal-code">
                  <strong>Postal Code</strong>
                </Label>
                <Input type="text" id="postal-code" placeholder="Postal Code" />
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="aboutus">
              <strong>About Store</strong>
            </Label>
            <Input
              type="textarea"
              name="textarea-input"
              id="textarea-input"
              rows="4"
              placeholder="About us..."
            />
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button type="submit" size="lg" color="primary">
            <i className="fa fa-dot-circle-o" /> Submit
          </Button>
          <Button type="reset" size="lg" color="danger">
            <i className="fa fa-ban" /> Reset
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default addLocations;
