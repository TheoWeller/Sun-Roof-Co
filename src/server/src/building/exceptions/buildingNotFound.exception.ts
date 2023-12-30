import { NotFoundException } from '@nestjs/common'

class BuildingNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Building with id ${id} not found`)
  }
}

export default BuildingNotFoundException
