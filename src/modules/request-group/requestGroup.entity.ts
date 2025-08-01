import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from '../workspace/workspace.entity';
import { Request } from '../request/request.entity';

@Entity('request_group')
export class RequestGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.requestGroups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @OneToMany(() => Request, (request) => request.requestGroup)
  requests: Request[];

  @CreateDateColumn()
  created_at: Date;
}
