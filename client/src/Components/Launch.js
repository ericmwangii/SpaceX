import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

const LAUNCHESQUERY = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(LAUNCHESQUERY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  if (!data) return <p>Not Found!</p>;

  // console.log(data);
  const {
    mission_name,
    launch_date,
    launch_year,
    launch_date_local,
    launch_success,
    rocket: { rocket_name, rocket_type },
  } = data.launch;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission: </span>
        {mission_name}
      </h1>
      <h4 className="mb-3">Launch Details </h4>
      <ul className="list-group">
        <li className="list-group-item">Launch Year: {launch_year}</li>
        <li className="list-group-item">
          Launch Successful:{" "}
          <span
            className={classNames({
              "text-success": launch_success,
              "text-danger": !launch_success,
            })}
          >
            {launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">{rocket_name}</li>
        <li className="list-group-item">{rocket_type}</li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
};

export default Launch;
