import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionEntity } from './entities/description.entity';
import { DescriptionRepository } from './repositories/description.repository';
import { CreateDescriptionController } from './routes/create/create-description.controller';
import { CreateDescriptionService } from './routes/create/create-description.service';
import { FindByNameDescriptionController } from './routes/findByName/findbyname-description.controller';
import { FindByNameDescriptionService } from './routes/findByName/findbyname-description.service';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionEntity])],
  controllers: [CreateDescriptionController, FindByNameDescriptionController],
  providers: [
    CreateDescriptionService,
    DescriptionRepository,
    FindByNameDescriptionService,
  ],
  exports: [CreateDescriptionService, FindByNameDescriptionService],
})
export class DescriptionModule {}
