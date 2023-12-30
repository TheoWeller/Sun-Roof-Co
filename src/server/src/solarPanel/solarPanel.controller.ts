import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Prisma, SolarPanel } from '@prisma/client'
import { SolarPanelService } from './solarPanel.service'

@Controller('solar-panels')
export class SolarPanelController {
  constructor(private readonly solarPanel: SolarPanelService) {}

  @Get()
  getProjects() {
    return this.solarPanel.find({})
  }

  @Get(':id')
  getProject(@Param('id') id: number): Promise<SolarPanel> {
    return this.solarPanel.findById(Number(id))
  }

  @Get(':id/buildings')
  getSolarPanelsByBuildingId(@Param('id') id: number) {
    return this.solarPanel.findBuildingBySolarPanelId(Number(id))
  }

  @Post(':id')
  async create(
    @Body() data: Prisma.SolarPanelCreateInput,
  ): Promise<SolarPanel> {
    return this.solarPanel.create({
      ...data,
    })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Prisma.SolarPanelUpdateInput,
  ): Promise<SolarPanel> {
    return this.solarPanel.update({
      where: { id: Number(id) },
      data: updateData,
    })
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SolarPanel> {
    return this.solarPanel.delete({ id: Number(id) })
  }
}
