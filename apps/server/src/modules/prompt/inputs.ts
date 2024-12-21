import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GenreDTO {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}

export class MoodDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
export class MoviePromptDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => MoodDTO)
  mood: MoodDTO[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => GenreDTO)
  genre: GenreDTO[];

  @IsNotEmpty()
  @IsArray()
  streaming: string[];
}

export class PromptInputDTO {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MoviePromptDTO)
  content: MoviePromptDTO;

  @IsNotEmpty()
  @MaxLength(20)
  @IsIn(['music', 'movies'])
  type: string;

  @IsNotEmpty()
  @IsNumber()
  returnItems: number;
}
