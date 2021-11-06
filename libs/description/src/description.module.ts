import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionEntity } from './entities/description.entity';
import { DescriptionRepository } from './repositories/description.repository';
import { CreateDescriptionController } from './use-case/create/create-description.controller';
import { CreateDescriptionService } from './use-case/create/create-description.service';
import { FindByNameDescriptionController } from './use-case/findByName/findbyname-description.controller';
import { FindByNameDescriptionService } from './use-case/findByName/findbyname-description.service';
import { GetDescriptionByNameController } from './use-case/getDescriptionsByName/findbyname-description.controller';
import { GetDescriptionByNameService } from './use-case/getDescriptionsByName/findbyname-description.service';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionEntity])],
  controllers: [
    CreateDescriptionController,
    FindByNameDescriptionController,
    GetDescriptionByNameController,
  ],
  providers: [
    CreateDescriptionService,
    DescriptionRepository,
    FindByNameDescriptionService,
    GetDescriptionByNameService,
  ],
  exports: [CreateDescriptionService, FindByNameDescriptionService],
})
export class DescriptionModule {}
