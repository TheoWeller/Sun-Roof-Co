import { Injectable } from '@nestjs/common'
import { Building, BuildingSolarPanel, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import BuildingNotFoundException from './exceptions/BuildingNotFound.exception'

@Injectable()
export class BuildingService {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number
    take?: number
    cursor?: Prisma.BuildingWhereUniqueInput
    where?: Prisma.BuildingWhereInput
    orderBy?: Prisma.BuildingOrderByWithRelationInput
  }): Promise<Building[] | null> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.building.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findById(id: number): Promise<Building | null> {
    const building = this.prisma.building.findUnique({
      where: { id },
    })

    if (!building) {
      throw new BuildingNotFoundException(id)
    }

    return building
  }

  async findSolarPanelsByBuildingId(
    buildingId: number,
  ): Promise<BuildingSolarPanel[] | null> {
    return this.prisma.buildingSolarPanel.findMany({
      where: { buildingId },
      include: {
        solarPanel: true,
      },
    })
  }

  async create(data: Prisma.BuildingCreateInput): Promise<Building> {
    return this.prisma.building.create({
      data,
    })
  }

  async update(params: {
    where: Prisma.BuildingWhereUniqueInput
    data: Prisma.BuildingUpdateInput
  }): Promise<Building> {
    const { where, data } = params
    return this.prisma.building.update({
      data,
      where,
    })
  }

  async delete(where: Prisma.BuildingWhereUniqueInput): Promise<Building> {
    /*
    Alternatives options to manual deletion:
    - Soft Deletion with "deletedAt" (Filtering would have to be considered)
    - Schema update: onDelete Cascade
    */

    await this.prisma.buildingSolarPanel.deleteMany({
      where: { buildingId: where.id },
    })

    return this.prisma.building.delete({
      where,
    })
  }
}
