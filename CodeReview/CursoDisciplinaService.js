import { prismaClient } from '../database/prismaClient.js';
import { validateInteger } from '../validators.js';

// Uso de injeção de dependência para facilitar testes e manutenção
class CursoDisciplinaService {

  constructor(prisma) {
    this.prisma = prisma;
  }

  async add(cursoId, disciplinaId, periodo) {
    try {
      // Valida cursoId, disciplinaId e periodo como inteiros
      const cursoIdInt = validateInteger(cursoId, 'cursoId');
      const disciplinaIdInt = validateInteger(disciplinaId, 'disciplinaId');
      const periodoInt = validateInteger(periodo, 'periodo');

      return await this.prisma.cursoDisciplina.create({
        data: {
          curso: { connect: { id: cursoIdInt } },
          disciplina: { connect: { id: disciplinaIdInt } },
          periodo: periodoInt
        }
      });
    } catch (error) {
      handleServiceError(error, 'Erro ao adicionar disciplina ao curso');
    }
  }

  async remove(cursoId, disciplinaId, periodo) {
    try {
      const cursoIdInt = validateInteger(cursoId, 'cursoId');
      const disciplinaIdInt = validateInteger(disciplinaId, 'disciplinaId');
      const periodoInt = validateInteger(periodo, 'periodo');

      return await this.prisma.cursoDisciplina.deleteMany({
        where: {
          cursoId: cursoIdInt,
          disciplinaId: disciplinaIdInt,
          periodo: periodoInt
        },
      });
    } catch (error) {
      handleServiceError(error, 'Erro ao remover disciplina do curso');
    }
  }

  async getAllByCurso(cursoId) {
    try {
      const cursoIdInt = validateInteger(cursoId, 'cursoId');
      
      return await this.prisma.curso.findUnique({
        where: { id: cursoIdInt },
        include: {
          disciplinas: {
            include: { disciplina: true },
          },
        },
      });
    } catch (error) {
      handleServiceError(error, 'Erro ao obter disciplinas do curso');
    }
  }

}

// Exporta a instância do serviço com prismaClient injetado
export default new CursoDisciplinaService(prismaClient);
