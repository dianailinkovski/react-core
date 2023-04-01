import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import {
  Badge,
  Table,
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

class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  //addCat = event => {
  //  console.log("AddCat");
  //};

  render() {
    const categoryItems = this.props.categories.map(category => (
      <tr key={category.publicId}>
        <th scope="row">
          <Link to={`/resturant/categories/${category._id}`}>
            {category.categoryName}
          </Link>
        </th>
        <td>
          <Link to={`/resturant/categories/${category._id}`}>
            {category._id}
          </Link>
        </td>
        <td>{category.enable}</td>
        <td>{category.sort}</td>
        <td />
      </tr>
    ));

    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" />
                  Tel-Aviv CATEGORIES{" "}
                  <small className="text-muted">Location:</small>
                  <Link to="/resturant/categories/addcategory">
                    <button class="float-right btn-pill btn btn-danger btn-lg">
                      + Add Category
                    </button>
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table responsive hover size="lg">
                    <thead>
                      <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Main Image</th>
                        <th scope="col">Enable</th>
                        <th scope="col">Sort</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>{categoryItems}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

Categories.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
  //newCategory: PropTypes.object
};

//get the state from Redux and map it within our component
const mapStateToProps = state => ({
  categories: state.categories.items
  //newCategory: state.categories.item
});

export default connect(
  mapStateToProps,
  { fetchCategories }
)(Categories);
