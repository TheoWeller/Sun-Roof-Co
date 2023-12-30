import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Building, Prisma } from '@prisma/client';
import { BuildingService } from './building.service';

@Controller('buildings')
export class BuildingController {
  constructor(private readonly building: BuildingService) {}

  @Get()
  getProjects() {
    return this.building.find({});
  }

  @Get(':id')
  getProject(@Param('id') id: number): Promise<Building> {
    return this.building.findById(Number(id));
  }

  @Get(':id/solar-panels')
  getSolarPanelsByBuildingId(@Param('id') id: number) {
    return this.building.findSolarPanelsByBuildingId(Number(id));
  }

  @Post('create')
  async create(@Body() data: Prisma.BuildingCreateInput): Promise<Building> {
    return this.building.create({
      ...data,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Prisma.BuildingUpdateInput,
  ): Promise<Building> {
    return this.building.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Building> {
    return this.building.delete({ id: Number(id) });
  }
}
