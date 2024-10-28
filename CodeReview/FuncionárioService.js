import { prismaClient } from '../database/prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    try {
      // Mudança de retorno direto de findMany para inclusão de try-catch e tratamento de erro
      return await prismaClient.funcionario.findMany({
        include: {
          usuario: true,
        }
      });
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err.message);
      throw new Error('Não foi possível buscar os funcionários. Tente novamente mais tarde.');
    }
  }

  async getFuncionarioById(id) {
    try {
      // Mudança para garantir que id é um número
      return await prismaClient.funcionario.findUnique({
        where: { id: parseInt(id) },
        include: {
          usuario: true
        },
      });
    } catch (err) {
      console.error('Erro ao buscar funcionário:', err.message);
      throw new Error('Não foi possível buscar o funcionário. Tente novamente mais tarde.');
    }
  }

  async getAllProfessores() {
    try {
      // Mudança de filtro direto para incluir cargo de "PROFESSOR"
      return await prismaClient.funcionario.findMany({
        where: { cargo: "PROFESSOR" },
        include: {
          usuario: true
        },
      });
    } catch (err) {
      console.error('Erro ao buscar professores:', err.message);
      throw new Error('Não foi possível buscar os professores. Tente novamente mais tarde.');
    }
  }

  async createFuncionario(funcionarioData) {
    try {
      // Mudança para garantir que dataAdmissao é uma data válida formatada para o banco
      const dataAdmissao = new Date(funcionarioData.dataAdmissao).toISOString();

      // Mudança para garantir que salario seja convertido para número
      const funcionario = await prismaClient.funcionario.create({
        data: {
          salario: parseFloat(funcionarioData.salario),
          dataAdmissao: dataAdmissao,
          usuarioId: funcionarioData.usuarioId,
          cargo: funcionarioData.cargo,
        }
      });

      return funcionario;
    } catch (err) {
      console.error('Erro ao criar funcionário:', err.message);
      throw new Error('Não foi possível criar o funcionário. Tente novamente mais tarde.');
    }
  }

  async updateFuncionario(id, funcionarioData) {
    try {
      // Mudança para converter dataAdmissao em data ISO antes de salvar
      const dataAdmissao = new Date(funcionarioData.dataAdmissao).toISOString();

      return await prismaClient.funcionario.update({
        where: { id: parseInt(id, 10) },
        data: {
          salario: parseFloat(funcionarioData.salario),
          dataAdmissao: dataAdmissao,
          usuarioId: funcionarioData.usuarioId,
          cargo: funcionarioData.cargo,
        },
      });
    } catch (err) {
      console.error('Erro ao atualizar funcionário:', err.message);
      throw new Error('Não foi possível atualizar o funcionário. Tente novamente mais tarde.');
    }
  }

  async deleteFuncionario(id) {
    try {
      // Mudança para garantir que id é convertido para número antes de deletar
      return await prismaClient.funcionario.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      console.error('Erro ao deletar funcionário:', err.message);
      throw new Error('Não foi possível deletar o funcionário. Tente novamente mais tarde.');
    }
  }
}

export default new FuncionarioService();
