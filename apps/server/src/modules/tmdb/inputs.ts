import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetMovieDetailsDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  movieName: string;
}

export class PostStreamingDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  url: string;
}
