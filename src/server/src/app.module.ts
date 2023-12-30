import { Module } from '@nestjs/common';
import { BuildingModule } from './building/building.module';
import { ProjectModule } from './project/project.module';
import { SolarPanelModule } from './solarPanel/solarPanel.module';

@Module({
  imports: [ProjectModule, BuildingModule, SolarPanelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
