import { Logger, Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogFileRepository } from './blog.repository';
import { BlogService } from './blog.service';

@Module({
    controllers: [BlogController],
    providers: [BlogService, BlogFileRepository, Logger],
})
export class BlogModule {}
