import { BadRequestException, PipeTransform } from '@nestjs/common';
import { RecipeStatus } from '../recipe.enum';

export class RecipeStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [RecipeStatus.OPEN, RecipeStatus.CLOSED];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status!`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
