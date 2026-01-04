import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import Character from "../../../src/entities/character.js";
import RickAndMortyUSA from "../../../src/business/integrations/rickAndMortyUSA.js";
import fs from "fs/promises";
import axios from "axios";

describe("#RickAndMortyUSA", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharactersFromXML should return a list from Rick and Morty API", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml");

    const expected = [
      {
        id: 10,
        name: "Alan Rails",
        status: "Dead",
        species: "Human",
        type: "Superhuman (Ghost trains summoner)",
        gender: "Male",
        origin: "unknown",
        location: "Worldender's lair",
      },
      {
        id: 11,
        name: "Albert Einstein",
        status: "Dead",
        species: "Human",
        type: "",
        gender: "Male",
        origin: "Earth (C-137)",
        location: "Earth (Replacement Dimension)",
      },
      {
        id: 12,
        name: "Alexander",
        status: "Dead",
        species: "Human",
        type: "",
        gender: "Male",
        origin: "Earth (C-137)",
        location: "Anatomy Park",
      },
      {
        id: 13,
        name: "Alien Googah",
        status: "unknown",
        species: "Alien",
        type: "",
        gender: "unknown",
        origin: "unknown",
        location: "Earth (Replacement Dimension)",
      },
      {
        id: 14,
        name: "Alien Morty",
        status: "unknown",
        species: "Alien",
        type: "",
        gender: "Male",
        origin: "unknown",
        location: "Citadel of Ricks",
      },
      {
        id: 15,
        name: "Alien Rick",
        status: "unknown",
        species: "Alien",
        type: "",
        gender: "Male",
        origin: "unknown",
        location: "Citadel of Ricks",
      },
      {
        id: 16,
        name: "Amish Cyborg",
        status: "Dead",
        species: "Alien",
        type: "Parasite",
        gender: "Male",
        origin: "unknown",
        location: "Earth (Replacement Dimension)",
      },
      {
        id: 17,
        name: "Annie",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Female",
        origin: "Earth (C-137)",
        location: "Anatomy Park",
      },
      {
        id: 18,
        name: "Antenna Morty",
        status: "Alive",
        species: "Human",
        type: "Human with antennae",
        gender: "Male",
        origin: "unknown",
        location: "Citadel of Ricks",
      },
      {
        id: 19,
        name: "Antenna Rick",
        status: "unknown",
        species: "Human",
        type: "Human with antennae",
        gender: "Male",
        origin: "unknown",
        location: "unknown",
      },
      {
        id: 20,
        name: "Ants in my Eyes Johnson",
        status: "unknown",
        species: "Human",
        type: "Human with ants in his eyes",
        gender: "Male",
        origin: "unknown",
        location: "Interdimensional Cable",
      },
    ];

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toMatchObject(expected);
  });

  test("#getCharactersFromXML should return an empty list from Rick and Morty API when nothing is returned", async () => {
    const response = await fs.readFile("./test/mocks/characters-empty.xml");

    const expected = [];

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toStrictEqual(expected);
  });
});
