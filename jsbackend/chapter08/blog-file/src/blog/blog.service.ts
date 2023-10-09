import { Injectable, Logger } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
    constructor(
        private readonly blogRepository: BlogFileRepository,
        private readonly logger: Logger,
    ) {}

    async getAll(): Promise<PostDto[]> {
        return await this.blogRepository.getAll();
    }

    async getById(id: string): Promise<PostDto> {
        return await this.blogRepository.getById(id);
    }

    async create(post: PostDto): Promise<PostDto> {
        return await this.blogRepository.create(post);
    }

    async deleteById(id: string) {
        return await this.blogRepository.deleteById(id);
    }

    async updateById(id: string, post: PostDto): Promise<PostDto> {
        return await this.blogRepository.updateById(id, post);
    }
}
