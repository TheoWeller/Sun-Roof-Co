import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SolarPanelController } from './solarPanel.controller';
import { SolarPanelService } from './solarPanel.service';

@Module({
  imports: [PrismaModule],
  providers: [SolarPanelService, Logger],
  controllers: [SolarPanelController],
  exports: [SolarPanelService],
})
export class SolarPanelModule {}
