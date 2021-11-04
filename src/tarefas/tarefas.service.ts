import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tarefa, TarefaDocument } from './tarefa.schema';


@Injectable()
export class TarefasService {
  constructor( 
    @InjectModel(Tarefa.name) private tarefaModel: Model<TarefaDocument>,
  ) {}

  async getTarefas(): Promise<Tarefa[]> {
    return await this.tarefaModel.find().exec();
  }

  async getTarefaById(id: string): Promise<Tarefa> {
    if (Types.ObjectId.isValid(id)) {
      const resposta = await this.tarefaModel.findById(id);

      if (resposta) return resposta;

      throw new NotFoundException(
        `Não foi encontrado registro tarefa com o id ${id}`,
      );
    }
    throw new BadRequestException(`O ID ${id} não é válido`);
  }

  async createTarefa(tarefa: Tarefa): Promise<Tarefa> {
    tarefa.titulo = tarefa.titulo.trim();

    if (!tarefa.titulo && tarefa.titulo === '') {
      throw new BadRequestException(
        'O título da tarefa deve ser informado e não pode ser vazio',
      );
    }

    const createdTarefa = new this.tarefaModel(tarefa);
    return await createdTarefa.save();
  }

  async delete(id: string): Promise<Tarefa> {
    let tarefa = await this.getTarefaById(id);
    await this.tarefaModel.findByIdAndDelete(id);
    return tarefa;
  }

  async atualizar(id: string, tarefa: Tarefa): Promise<Tarefa> {
    if (Types.ObjectId.isValid(id)) {
      await this.tarefaModel.findByIdAndUpdate(id, tarefa);
      return await this.getTarefaById(id);
    }

    throw new BadRequestException(`O ID ${id} não é válido`);
  }
}
