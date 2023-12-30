import { NotFoundException } from '@nestjs/common';

class ProjectNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Panel with id ${id} not found`);
  }
}

export default ProjectNotFoundException;
