import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'request_logs',
})
export class RequestLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_url' })
  requestUrl: string;

  @Column({ name: 'user_agent' })
  userAgent: string;

  @Column()
  ip: string;

  @Column({ name: 'status_code' })
  statusCode: number;

  @Column({ name: 'status_message' })
  statusMessage: string;

  @Column()
  referrer: string;

  @Column({ name: 'content_length' })
  contentLength: number;

  @Column()
  dnt: boolean;

  @Column({ name: 'request_time', type: 'timestamp' })
  requestTime: Date;

  @Column({ name: 'response_time', type: 'timestamp' })
  responseTime: Date;
}
