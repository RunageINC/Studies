import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter.js";

describe("#RickAndMortyBRLAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharacters should be an adapter for RickAndMortyBRL.getCharactersFromJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockReturnValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();

    expect(result).toEqual([]);

    expect(brlIntegration).toHaveBeenCalled();
  });
});
