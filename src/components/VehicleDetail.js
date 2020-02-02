import React, { Component } from "react";
import { Link } from "react-router-dom";

class VehicleDetail extends Component {
  state = { vehicle: {}, httpStatusCode: 0, httpStatusOk: false };

  componentDidMount() {
    const url = `https://aqueous-tundra-00703.herokuapp.com/api/${this.props.id}`;

    fetch(url)
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
        this.setState({ vehicle: responseData });
        // console.log(responseData);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `vehicle ${this.props.id} detail`;

    // For coding convenience, create a shortcut object
    const vehicle = this.state.vehicle;

    return (
      <div>
        <h4>
          Detail about vehicle {vehicle.car_make} {vehicle.car_model}{" "}
          {vehicle.car_year}
        </h4>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Database ID</dt>
                <dd>{vehicle._id}</dd>
                <dt>Identifier</dt>
                <dd>{vehicle.vin}</dd>
                <dt>Make</dt>
                <dd>{vehicle.car_make}</dd>
                <dt>Model</dt>
                <dd>{vehicle.car_model}</dd>
                <dt>Year</dt>
                <dd>{vehicle.car_year}</dd>
                <dt>VIN</dt>
                <dd>{vehicle.vin}</dd>
                <dt>MSRP</dt>
                <dd>{vehicle.MSRP}</dd>
                <dt>Purchase date</dt>
                <dd>{vehicle.purchase_date}</dd>
                <dt>Purchaser name</dt>
                <dd>{vehicle.purchaser_name}</dd>
                <dt>Purchaser email</dt>
                <dd>{vehicle.purchaser_email}</dd>
                <dt>Purchase price</dt>
                <dd>{vehicle.price}</dd>
                <dt>Color</dt>
                <dd>{vehicle.car_color}</dd>
                <dt>Country</dt>
                <dd>{vehicle.country}</dd>
              </dl>
            </div>
            <div className="col-md-2">
              <img src={vehicle.photo} alt="" className="img-responsive" />
            </div>
          </div>
        ) : (
          <p>Requested vehicle was not found</p>
        )}

        <hr />
        <p>
          <Link
            className="btn btn-warning"
            to={`/vehicles/edit/${vehicle._id}`}
          >
            Edit
          </Link>
          &nbsp;&nbsp;
          <Link className="btn btn-primary" to="/vehicles">
            Show list of vehicles
          </Link>
        </p>
      </div>
    );
  }
}

export default VehicleDetail;
