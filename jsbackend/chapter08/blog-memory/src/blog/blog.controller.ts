import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogService } from './blog.service';

@Controller('blog-memory')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get()
    getAllPosts(): PostDto[] {
        return this.blogService.getAll();
    }

    @Post()
    createPost(@Body() post: any): PostDto {
        console.log('게시글 생성');
        console.log(post);
        return this.blogService.create(post);
    }

    @Get('/:id')
    getPostById(@Param('id') id: string): PostDto {
        console.log(`게시글 [${id}] 조회`);
        return this.blogService.getById(id);
    }

    @Delete('/:id')
    deletePostById(@Param('id') id: string) {
        console.log('게시글 삭제');
        this.blogService.deleteById(id);
    }

    @Put('/:id')
    updatePostById(@Param('id') id: string, @Body() post: PostDto): PostDto {
        console.log(`게시글 [${id}] 수정`);
        console.log(post);
        return this.blogService.updateById(id, post);
    }
}
