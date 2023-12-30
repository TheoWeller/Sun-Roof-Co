import { NotFoundException } from '@nestjs/common'

class SolarPanelNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Solar Panel with id ${id} not found`)
  }
}

export default SolarPanelNotFoundException
