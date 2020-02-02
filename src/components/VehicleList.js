import React, { Component } from "react";
import { Link } from "react-router-dom";

class VehicleList extends Component {
  state = { vehicles: [] };

  componentDidMount() {
    const url = "https://aqueous-tundra-00703.herokuapp.com/api/";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.setState({ vehicles: responseData });
        // console.log(responseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    document.title = "Vehicle list";

    return (
      <div className="container-fluid">
        <h4>List of vehicles</h4>
        <p>
          <Link className="btn btn-primary" to="/vehicles/create">
            Add New Vehicle
          </Link>
        </p>
        <div
          className="container table-responsive"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <table className="table-sm table-striped ">
            <TableHeader />
            <TableBody vehicles={this.state.vehicles} />
          </table>
        </div>
      </div>
    );
  }
}

export default VehicleList;

// Function component, table header
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Car make</th>
        <th>Car model</th>
        <th>Car year</th>
        <th>VIN</th>
        <th>MSRP</th>
        <th>Photo</th>
        <th>Purchase date</th>
        <th>Purchaser name</th>
        <th>Purchaser email</th>
        <th>Price</th>
        <th>Car color</th>
        <th>Country</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

// Function component
// Its purpose is to render the HTML table body element
const TableBody = props => {
  let rows = props.vehicles.map((vehicle, index) => {
    return <TableRow vehicle={vehicle} key={index} />;
  });

  return <tbody>{rows}</tbody>;
};

// Function component
// Its purpose is to render a single HTML table row
const TableRow = props => {
  const vehicle = props.vehicle;

  return (
    <tr>
      <td>{vehicle.car_make}</td>
      <td>{vehicle.car_model}</td>
      <td>{vehicle.car_year}</td>
      <td>{vehicle.vin}</td>
      <td>{vehicle.MSRP}</td>
      <td>
        <img src={vehicle.photo} alt="" className="imgInTable" />
      </td>
      <td>{vehicle.purchase_date}</td>
      <td>{vehicle.purchaser_name}</td>
      <td>{vehicle.purchaser_email}</td>
      <td>{vehicle.price}</td>
      <td>{vehicle.car_color}</td>
      <td>{vehicle.country}</td>
      <td className="d-inline-flex">
        <Link
          className="btn btn-primary"
          to={`/vehicles/detail/${vehicle._id}`}
        >
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-warning" to={`/vehicles/edit/${vehicle._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-danger" to={`/vehicles/delete/${vehicle._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
};
