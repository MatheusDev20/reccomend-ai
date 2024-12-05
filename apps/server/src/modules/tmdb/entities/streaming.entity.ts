import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('streamings')
export class Streaming {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  active: boolean;
}
