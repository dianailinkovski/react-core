import React, { Component } from "react";
import axios from "axios";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { Link } from "react-router-dom";

class allLocations extends Component {
  state = {};
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="10">
                    <h5>
                      <i className="icon-location-pin" /> All Locations
                    </h5>
                  </Col>
                  <Col xs="2">
                    <Link to="./addLocation">
                      <button class="float-right btn-pill btn btn-danger btn-lg">
                        + Add Location
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover size="lg">
                  <thead>
                    <tr>
                      <th>Location Name</th>
                      <th>Contact Number</th>
                      <th>Manager</th>
                      <th>Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="./Location">Location #1</Link>
                      </td>
                      <td>888-888-8888</td>
                      <td>David Smith</td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          checked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Location #1</td>
                      <td>888-888-8888</td>
                      <td>David Smith</td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          checked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Location #1</td>
                      <td>888-888-8888</td>
                      <td>David Smith</td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          checked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Location #1</td>
                      <td>888-888-8888</td>
                      <td>David Smith</td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          checked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Location #1</td>
                      <td>888-888-8888</td>
                      <td>David Smith</td>
                      <td>
                        <AppSwitch
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          label
                          checked
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem disabled>
                      <PaginationLink previous tag="button" />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button" />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default allLocations;
