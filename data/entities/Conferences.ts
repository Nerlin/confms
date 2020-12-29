import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IConference } from "../../types/Conference";

@Entity()
export class Conference implements IConference {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  slug: string

  @Column()
  name: string

  @Column()
  shortDescription: string

  @Column()
  date: string

  public toJSON(): IConference {
    return { ...this };
  }
}