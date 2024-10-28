import { json } from 'express';
import CursoDisciplinaService from '../services/CursoDisciplinaService.js';

export class CursoDisciplinaController {

  async addDisciplinaToCurso(req, res) {
    const { cursoId, disciplinaId, periodo } = req.body;

    try {
      // Mudança de método para 'add' no serviço para simplificação
      const result = await CursoDisciplinaService.add(cursoId, disciplinaId, periodo);

      // Mudança de redirecionamento para JSON para manter consistência na API
      return res.status(200).json({
        success: true,
        message: 'Disciplina vinculada com sucesso!',
        data: result
      });
    } catch (error) {
      // Mudança de redirecionamento para JSON em caso de erro
      return res.status(400).json({
        success: false,
        message: 'Disciplina já está vinculada!',
        error: error.message
      });
    }
  }

  async removeDisciplinaFromCurso(req, res) {
    const { cursoId, disciplinaId, periodo } = req.body;

    try {
      const result = await CursoDisciplinaService.remove(cursoId, disciplinaId, periodo);
      
      return res.status(200).json({
        success: true,
        message: 'Disciplina removida com sucesso!',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao remover disciplina do curso',
        error: error.message
      });
    }
  }

  async getDisciplinasByCurso(req, res) {
    const cursoId = parseInt(req.params.cursoId, 10);

    try {
      const result = await CursoDisciplinaService.getAllByCurso(cursoId);

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao obter disciplinas do curso',
        error: error.message
      });
    }
  }

  async getCursosByDisciplina(req, res) {
    const disciplinaId = parseInt(req.params.disciplinaId, 10);

    try {
      const result = await CursoDisciplinaService.getCursosByDisciplina(disciplinaId);

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao obter cursos por disciplina',
        error: error.message
      });
    }
  }
}
