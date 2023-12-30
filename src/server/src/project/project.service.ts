import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import ProjectNotFoundException from './exceptions/ProjectNotFound.exception';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findById(id: number): Promise<Project | null> {
    const project = this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new ProjectNotFoundException(id);
    }

    return project;
  }

  async findByIdWithBuildingsAndPanels(id: number): Promise<Project | null> {
    const project = this.prisma.project.findUnique({
      where: { id },
      include: {
        buildings: {
          include: {
            solarPanels: {
              include: {
                solarPanel: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new ProjectNotFoundException(id);
    }

    return project;
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    return this.prisma.project.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({
      where,
    });
  }
}
