import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class VehicleEdit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties

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
    const getUrl = `https://aqueous-tundra-00703.herokuapp.com/api/${this.props.id}`;

    fetch(getUrl)
      .then(response => {
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok
        });
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.setState({
          vehicle: responseData,
          car_make: responseData.car_make,
          car_model: responseData.car_model,
          car_year: responseData.car_year,
          vin: responseData.vin,
          MSRP: responseData.MSRP,
          photo: responseData.photo,
          purchase_date: responseData.purchase_date,
          purchaser_name: responseData.purchaser_name,
          purchaser_email: responseData.purchaser_email,
          price: responseData.price,
          car_color: responseData.car_color,
          used: responseData.used
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(e) {
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

    const putUrl = `https://aqueous-tundra-00703.herokuapp.com/api/edit/${this.props.id}`;

    fetch(putUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.props.history.push(`/vehicles/detail/${this.props.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    document.title = `Vehicle ${this.props.id} edit`;

    const isDisabled = this.state.vehicle.car_make === 0;

    const vehicle = this.state.vehicle;

    if (this.input && this.state.vehicle.car_make === 0) {
      this.input.focus();
    }

    return (
      <div>
        <h4>
          Edit vehicle {vehicle.car_make} {vehicle.car_model} {vehicle.car_year}{" "}
          ({vehicle.vin})
        </h4>

        {this.state.httpStatusOk ? (
          <div className="container">
            <p>Edit vehicle data, and click/tap the Save button</p>
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
                  placeholder={vehicle.car_make}
                />
              </div>
              <div className="form-group">
                <label htmlFor="car_model">Model</label>
                <input
                  name="car_model"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.car_model}
                />
              </div>
              <div className="form-group">
                <label htmlFor="car_year">Year</label>
                <input
                  name="car_year"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.car_year}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vin">VIN</label>
                <input
                  name="vin"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.vin}
                />
              </div>
              <div className="form-group">
                <label htmlFor="MSRP">MSRP</label>
                <input
                  name="MSRP"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.MSRP}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                  name="photo"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.photo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchase_date">Purchase date</label>
                <input
                  name="purchase_date"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchase_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaser_name">Purchaser name</label>
                <input
                  name="purchaser_name"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchaser_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaser_email">Purchaser email</label>
                <input
                  name="purchaser_email"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchaser_email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="car_color">Color</label>
                <input
                  name="car_color"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.car_color}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  name="country"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.country}
                />
              </div>

              <div className="form-group">
                <button
                  disabled={isDisabled}
                  onClick={this.handleSubmit}
                  className="btn btn-success"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <Link className="btn btn-primary" to="/vehicles">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <p>
              Requested vehicle with identifier {this.props.id} was not found
            </p>
            <hr />
            <p>
              <Link className="btn btn-default" to="/vehicles">
                Show list of vehicles
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(VehicleEdit);
