import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TarefasModule } from './tarefas/tarefas.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const mongodb =
  'mongodb+srv://joaquim:jocafilho@cluster0.nyase.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forRoot(mongodb), 
    TarefasModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'] 
    }),
  ]
})
export class AppModule {}
