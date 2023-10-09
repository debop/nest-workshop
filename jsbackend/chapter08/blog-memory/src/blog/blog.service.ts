import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';

@Injectable()
export class BlogService {
    private posts: PostDto[] = [];

    getAll(): PostDto[] {
        return this.posts;
    }

    getById(id: string): PostDto {
        const post = this.posts.find((post) => post.id === id);
        console.log(post);
        return post;
    }

    create(post: PostDto): PostDto {
        const id = this.posts.length + 1;
        this.posts.push({ id: id.toString(), createdAt: new Date(), ...post });
        return this.posts[this.posts.length - 1];
    }

    deleteById(id: string) {
        const filteredPosts = this.posts.filter((post) => post.id !== id);
        this.posts = [...filteredPosts];
    }

    updateById(id: string, post: PostDto): PostDto {
        let updatedIndex = this.posts.findIndex((post) => post.id === id);
        const updatedPost = { id, ...post, updatedAt: new Date() };
        this.posts[updatedIndex] = updatedPost;
        return updatedPost;
    }
}
