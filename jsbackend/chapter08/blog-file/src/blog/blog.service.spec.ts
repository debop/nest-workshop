import { Test, TestingModule } from '@nestjs/testing';
import { BlogFileRepository } from './blog.repository';
import { BlogService } from './blog.service';

describe('BlogService', () => {
    let service: BlogService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlogService, BlogFileRepository],
        }).compile();

        service = module.get<BlogService>(BlogService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
