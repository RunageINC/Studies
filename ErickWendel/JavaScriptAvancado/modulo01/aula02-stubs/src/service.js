class Service {
  async makeRequest(url) {
    return (await fetch(url)).json();
  }

  async getPlanets(url) {
    const planet = await this.makeRequest(url);

    return {
      name: planet.name,
      surfaceWater: planet.surface_water,
      appearedIn: planet.films.length,
    };
  }
}

module.exports = Service;
