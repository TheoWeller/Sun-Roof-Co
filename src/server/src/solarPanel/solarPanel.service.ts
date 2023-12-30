import { Injectable } from '@nestjs/common'
import { BuildingSolarPanel, Prisma, SolarPanel } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import SolarPanelNotFoundException from './exceptions/solarPanelNotFound.exception'

@Injectable()
export class SolarPanelService {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SolarPanelWhereUniqueInput
    where?: Prisma.SolarPanelWhereInput
    orderBy?: Prisma.SolarPanelOrderByWithRelationInput
  }): Promise<SolarPanel[] | null> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.solarPanel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findById(id: number): Promise<SolarPanel | null> {
    const solarPanel = this.prisma.solarPanel.findUnique({
      where: { id },
    })

    if (!solarPanel) {
      throw new SolarPanelNotFoundException(id)
    }

    return solarPanel
  }

  async findBuildingBySolarPanelId(
    solarPanelId: number,
  ): Promise<BuildingSolarPanel[] | null> {
    return this.prisma.buildingSolarPanel.findMany({
      where: { solarPanelId },
      include: {
        building: true,
      },
    })
  }

  async create(data: Prisma.SolarPanelCreateInput): Promise<SolarPanel> {
    return this.prisma.solarPanel.create({
      data,
    })
  }

  async update(params: {
    where: Prisma.SolarPanelWhereUniqueInput
    data: Prisma.SolarPanelUpdateInput
  }): Promise<SolarPanel> {
    try {
      const { where, data } = params
      return await this.prisma.solarPanel.update({
        data,
        where,
      })
    } catch (error) {
      if (error) {
        throw new Error(error.message)
      }
      throw new Error()
    }
  }

  async delete(where: Prisma.SolarPanelWhereUniqueInput): Promise<SolarPanel> {
    /*
    Alternatives options to manual deletion:
    - Soft Deletion with "deletedAt" (Filtering would have to be considered)
    - Schema update: onDelete Cascade
    */

    await this.prisma.buildingSolarPanel.deleteMany({
      where: { solarPanelId: where.id },
    })

    return this.prisma.solarPanel.delete({
      where,
    })
  }
}
