import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Tarefa } from './tarefa.schema';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get() // GET   http://localhost:3000/tarefas
  async getTarefas(): Promise<Tarefa[]> {
    return await this.tarefasService.getTarefas();
  }

  @Get(':id') // GET   http://localhost:3000/tarefas/2
  async getTarefa(@Param('id') id: string): Promise<Tarefa> {
    return this.tarefasService.getTarefaById(id);
  }

  @Post() // POST   http://localhost:3000/tarefas
  async setTarefa(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return await this.tarefasService.createTarefa(tarefa);
  }

  @Delete(':id') // DELETE http://localhost:3000/tarefas
  async delete(@Param('id') id: string): Promise<Tarefa> {
    return await this.tarefasService.delete(id);
  }

  @Patch(':id') // PATCH http://localhost:3000/tarefas
  async atualizar(
    @Param('id') id: string,
    @Body() tarefa: Tarefa,
  ): Promise<Tarefa> {
    return await this.tarefasService.atualizar(id, tarefa);
  }
}
