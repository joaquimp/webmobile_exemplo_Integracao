import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarefa, TarefaSchema } from './tarefa.schema';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';

@Module({
  controllers: [TarefasController],
  providers: [TarefasService],
  imports: [
    MongooseModule.forFeature([{ name: Tarefa.name, schema: TarefaSchema }]),
  ],
})
export class TarefasModule {}
