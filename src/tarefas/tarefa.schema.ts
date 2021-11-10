import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TarefaDocument = Tarefa & Document;

@Schema()
export class Tarefa {
  @Prop()
  titulo: string;

  @Prop()
  executada: boolean;
}

export const TarefaSchema = SchemaFactory.createForClass(Tarefa);
