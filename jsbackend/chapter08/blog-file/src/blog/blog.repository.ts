import { Logger } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';

export interface BlogRepository {
    getAll(): Promise<PostDto[]>;
    getById(id: string): Promise<PostDto>;
    create(post: PostDto): Promise<PostDto>;
    deleteById(id: string): Promise<void>;
    updateById(id: string, post: PostDto): Promise<PostDto>;
}

export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog/blog.data.json';

    private logger = new Logger(BlogFileRepository.name);

    async getAll(): Promise<PostDto[]> {
        return await this.loadPosts();
    }

    async getById(id: string): Promise<PostDto> {
        const posts = await this.loadPosts();
        const post = posts.find((post) => post.id === id);
        return post;
    }

    async create(post: PostDto): Promise<PostDto> {
        const posts = await this.loadPosts();
        const id = posts.length + 1;
        const createdPost = { id: id.toString(), createdAt: new Date(), ...post };
        posts.push(createdPost);
        await this.savePosts(posts);
        return createdPost;
    }

    async deleteById(id: string): Promise<void> {
        const posts = await this.loadPosts();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await this.savePosts(filteredPosts);
    }

    async updateById(id: string, post: PostDto): Promise<PostDto> {
        const posts = await this.loadPosts();
        const updatedIndex = posts.findIndex((post) => post.id === id);
        const updatedPost = { id, ...post, updatedAt: new Date() };
        posts[updatedIndex] = updatedPost;
        await this.savePosts(posts);
        return updatedPost;
    }

    private async loadPosts(): Promise<PostDto[]> {
        const jsonText = await readFile(this.FILE_NAME, 'utf-8');
        this.logger.debug(`Load posts from ${this.FILE_NAME}`);
        return JSON.parse(jsonText);
    }

    private async savePosts(posts: PostDto[]): Promise<void> {
        this.logger.debug(`Save posts to ${this.FILE_NAME}`);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}
