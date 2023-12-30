import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Prisma, Project } from '@prisma/client'
import { ProjectService } from './project.service'

@Controller('projects')
export class ProjectController {
  constructor(private readonly project: ProjectService) {}

  @Get()
  getProjects() {
    return this.project.find({})
  }

  @Get(':id')
  getProject(@Param('id') id: number): Promise<Project> {
    return this.project.findById(Number(id))
  }

  @Get(':id/buildings-solar-panels')
  getProjectWithBuildingsAndPanels(@Param('id') id: number): Promise<Project> {
    return this.project.findByIdWithBuildingsAndPanels(Number(id))
  }

  @Post(':id')
  async create(@Body() data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.project.create({
      ...data,
    })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Prisma.ProjectUpdateInput,
  ): Promise<Project> {
    return this.project.update({
      where: { id: Number(id) },
      data: updateData,
    })
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Project> {
    return this.project.delete({ id: Number(id) })
  }
}
