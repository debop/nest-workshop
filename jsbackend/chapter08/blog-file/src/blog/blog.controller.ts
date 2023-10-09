import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';

import { PostDto } from './blog.model';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    private readonly logger = new Logger(BlogController.name);

    constructor(private readonly blogService: BlogService) {}

    @Get()
    async getAllPosts() {
        this.logger.debug(`모든 게시글 조회`);
        return await this.blogService.getAll();
    }

    @Post()
    async createPost(@Body() post: any): Promise<PostDto> {
        this.logger.log(`게시글 생성: ${JSON.stringify(post)}`);
        return await this.blogService.create(post);
    }

    @Get('/:id')
    async getPostById(@Param('id') id: string): Promise<PostDto> {
        const post = await this.blogService.getById(id);
        this.logger.log(`게시글[${id}] 조회: ${post}`);
        return post;
    }

    @Delete('/:id')
    async deletePostById(@Param('id') id: string) {
        console.log(`게시글 삭제. id=${id}`);
        await this.blogService.deleteById(id);
    }

    @Put('/:id')
    async updatePostById(@Param('id') id: string, @Body() post: PostDto): Promise<PostDto> {
        console.log(`게시글 [${id}] 수정`, id, post);
        return await this.blogService.updateById(id, post);
    }
}
