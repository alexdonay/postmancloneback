import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequestGroup } from '../request-group/requestGroup.entity';

@Entity('request')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column({ type: 'jsonb', nullable: true })
  headers: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  body: Record<string, any>;

  @ManyToOne(() => RequestGroup, (group) => group.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_group_id' })
  requestGroup: RequestGroup;

  @CreateDateColumn()
  created_at: Date;
}
