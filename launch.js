const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v3/";
  }
  async getAllLaunches() {
    const response = await this.get("/launches");
    return Array.isArray(response)
      ? response.map((launch) => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }) {
    const response = await this.get("launches", { flight_number: launchId });
    return this.launchReducer(response[0]);
  }
  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchId({ launchId }))
    );
  }

  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      mission_name: launch.mission_name,
      launch_year: launch.launch_year,
      launch_date_local: launch.launch_date_local,
      launch_success: launch.launch_success,
      rocket: {
        id: launch.rocket.rocket_id,
        rocket_name: launch.rocket.rocket_name,
        rocket_type: launch.rocket.rocket_type,
      },
    };
  }
}

module.exports = LaunchAPI;
