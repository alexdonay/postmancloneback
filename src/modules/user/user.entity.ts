import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Workspace } from '../workspace/workspace.entity';

export enum AuthProvider {
  GOOGLE = 'google',
  LOCAL = 'local',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider: AuthProvider;

  @OneToMany(() => Workspace, (workspace) => workspace.user)
  workspaces: Workspace[];
}
