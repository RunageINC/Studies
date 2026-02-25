class Paciente {
  constructor(
    id,
    cpf,
    nome,
    dataNasc,
    genero,
    tipoSanguineo,
    alergias,
    endereco,
    telefone,
    email,
    contatoEmergencia,
    historicoMedico,
  ) {
    this.id = id;
    this.cpf = cpf;
    this.nome = nome;
    this.dataNasc = dataNasc;
    this.genero = genero;
    this.tipoSanguineo = tipoSanguineo;
    this.alergias = alergias;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.contatoEmergencia = contatoEmergencia;
    this.historicoMedico = [];
    this.consultas = [];
    this.exames = [];
  }

  adicionarEventoHistorico(evento) {
    this.historicoMedico.push(evento);

    console.log(`Evento adicionado ao histórico: ${evento}`);
  }

  agendarConsulta(consulta) {
    const consultaNoMesmoHorario = this.consultas.find(
      (c) => c.data === consulta.data,
    );

    if (consultaNoMesmoHorario) {
      throw new Error("Consulta no mesmo horário já agendada");
    }

    this.consultas.push(consulta);

    console.log(
      `Consulta agendada para ${consulta.data} com o médico ${consulta.medico}`,
    );
  }

  adicionarExame(exame) {
    this.exames.push(exame);
    console.log(`Exame adicionado para ${exame.data} com o tipo ${exame.tipo}`);
  }
}

module.exports = Paciente;
