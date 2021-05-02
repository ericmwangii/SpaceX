import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import LaunchItem from "./LaunchItem";

const LAUNCHESQUERY = gql`
  query GetLaunches {
    launches {
      mission_name
      launch_success
      id
      launch_date_local
      launch_year
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;
const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHESQUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  if (!data) return <p>Not Found!</p>;

  return data.launches.map(
    ({
      id,
      mission_name,
      launch_date,
      launch_success,
      launch_date_local,
      rocket,
    }) => (
      <LaunchItem
        key={id}
        id={id}
        mission_name={mission_name}
        launch_date={launch_date}
        launch_success={launch_success}
        launch_date_local={launch_date_local}
        rocket={rocket}
      />
    )
  );
};

export default Launches;
