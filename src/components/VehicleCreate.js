import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class VehicleCreate extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    vehicle: {},

    car_make: "",
    car_model: "",
    car_year: "",
    vin: "",
    MSRP: "",
    photo: "",
    purchase_date: "",
    purchaser_name: "",
    purchaser_email: "",
    price: "",
    car_color: "",
    used: false,

    httpStatusCode: 0,
    httpStatusOk: false
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.input.focus();
  }

  handleSubmit(e) {
    // Turn off default form handling
    e.preventDefault();

    const newVehicle = {
      car_make: this.state.car_make,
      car_model: this.state.car_model,
      car_year: this.state.car_year,
      vin: this.state.vin,
      MSRP: this.state.MSRP,
      photo: this.state.photo,
      purchase_date: this.state.purchase_date,
      purchaser_name: this.state.purchaser_name,
      purchaser_email: this.state.purchaser_email,
      price: this.state.price,
      car_color: this.state.car_color,
      used: this.state.used
    };

    const url = `https://aqueous-tundra-00703.herokuapp.com/api/add`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle)
    })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // Redirect to detail
        this.props.history.push(`/vehicles/detail/${responseData._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = "Add vehicle";

    // Determine the button state
    const isDisabled = this.state.vin.length <= 0;

    return (
      <div>
        <h4>Add a new vehicle</h4>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="container">
          <p>Enter new vehicle data, and click/tap the Add Vehicle button</p>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="car_make">Make</label>
              <input
                name="car_make"
                className="form-control"
                ref={i => {
                  this.input = i;
                }}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="car_model">Model</label>
              <input
                name="car_model"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="car_year">Year</label>
              <input
                name="car_year"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vin">VIN</label>
              <input
                name="vin"
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="MSRP">MSRP</label>
              <input
                name="MSRP"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                name="photo"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchase_date">Purchase date</label>
              <input
                name="purchase_date"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchaser_name">Purchaser name</label>
              <input
                name="purchaser_name"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchaser_email">Purchaser email</label>
              <input
                name="purchaser_email"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                name="price"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="car_color">Color</label>
              <input
                name="car_color"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                name="country"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-auto">
              <button
                disabled={isDisabled}
                onClick={this.handleSubmit}
                className="btn btn-success"
              >
                Add Vehicle
              </button>
              &nbsp;&nbsp;
              <Link className="btn btn-primary" to="/vehicles">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default withRouter(VehicleCreate);
