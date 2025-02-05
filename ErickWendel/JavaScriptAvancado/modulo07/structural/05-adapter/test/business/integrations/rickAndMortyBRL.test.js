import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import Character from "../../../src/entities/character.js";
import RickAndMortyBRL from "../../../src/business/integrations/rickAndMortyBRL.js";
import fs from "fs/promises";
import axios from "axios";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharactersFromJSON should return a list from Rick and Morty API", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters.json")
    );

    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });

  test("#getCharactersFromJSON should return an empty list from Rick and Morty API when nothing is returned", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters-empty.json")
    );

    const expected = response.results;

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
});
