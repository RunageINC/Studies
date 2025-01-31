const { describe, it } = require("mocha");
const { expect } = require("chai");
const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");

const mock = require("./mock/valid");

describe("TextProcessorAPI", () => {
  it("#build", () => {
    const result = new TextProcessorFluentAPI(mock).build();

    expect(result).to.be.deep.equal(mock);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#divideTextInColumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();

    const expected = [
      {
        contratante: "Xuxa da Silva",
        nacionalidade: " brasileira",
        estadoCivil: " casada",
        cpf: " CPF 235.743.420-12",
        endereco:
          " residente e \ndomiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      },
      {
        contratante: "Arya Robbin",
        nacionalidade: " belga",
        estadoCivil: " casado",
        cpf: " CPF 884.112.200-52",
        endereco:
          " residente e \ndomiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ",
      },
      {
        contratante: "Júlia Menezes",
        nacionalidade: " brasileira",
        estadoCivil: " solteira",
        cpf: " CPF 297.947.800-81",
        endereco:
          " residente e \ndomiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      },
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#mapPerson", () => {
    const content = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo.",
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();

    const expected = [
      {
        name: "Xuxa da Silva",
        nationality: "Brasileira",
        civilState: "Casada",
        document: "23574342012",
        address: {
          street: "Rua dos bobos",
          number: "zero",
          neighborhood: "Alphaville",
          state: "São Paulo",
        },
      },
    ];

    expect(result).to.be.deep.equal(expected);
  });

  //TODO check this method below bc it will break
  // it("#removeEmptyColumns", () => {
  //   const content = [
  //     {
  //       contratante: "Xuxa da Silva",
  //       nacionalidade: " brasileira",
  //       estadoCivil: " casada",
  //       cpf: " 235.743.420-12",
  //       endereco:
  //         " residente e \ndomiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo ",
  //     },
  //     {
  //       contratante: "Arya Robbin",
  //       nacionalidade: " belga",
  //       estadoCivil: " casado",
  //       cpf: " 884.112.200-52",
  //       endereco:
  //         " residente e \ndomiciliada a Av. paulista, 1400, bairro Consolação, São Paulo ",
  //     },
  //     {
  //       contratante: "Júlia Menezes",
  //       nacionalidade: " brasileira",
  //       estadoCivil: " solteira",
  //       cpf: " 297.947.800-81",
  //       endereco:
  //         " residente e \ndomiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo ",
  //     },
  //   ];

  //   const result = new TextProcessorFluentAPI(content)
  //     .removeEmptyColumns()
  //     .build();

  //   const expected = [
  //     {
  //       contratante: "Xuxa da Silva",
  //       nacionalidade: "brasileira",
  //       estadoCivil: "casada",
  //       cpf: "235.743.420-12",
  //       endereco:
  //         "residente e \ndomiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo ",
  //     },
  //     {
  //       contratante: "Arya Robbin",
  //       nacionalidade: "belga",
  //       estadoCivil: "casado",
  //       cpf: "884.112.200-52",
  //       endereco:
  //         "residente e \ndomiciliada a Av. paulista, 1400, bairro Consolação, São Paulo ",
  //     },
  //     {
  //       contratante: "Júlia Menezes",
  //       nacionalidade: "brasileira",
  //       estadoCivil: "solteira",
  //       cpf: "297.947.800-81",
  //       endereco:
  //         "residente e \ndomiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo ",
  //     },
  //   ];

  //   expect(result).to.be.deep.equal(expected);
  // });
});
