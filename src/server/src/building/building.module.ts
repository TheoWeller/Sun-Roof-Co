import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';

@Module({
  imports: [PrismaModule],
  providers: [BuildingService],
  controllers: [BuildingController],
  exports: [BuildingService],
})
export class BuildingModule {}
