import { PartialType } from '@nestjs/mapped-types';
import { CreateExformDto } from './create-exform.dto';

export class UpdateExformDto extends PartialType(CreateExformDto) {}
