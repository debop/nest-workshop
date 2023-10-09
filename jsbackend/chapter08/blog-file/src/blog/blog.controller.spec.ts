import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogFileRepository } from './blog.repository';
import { BlogService } from './blog.service';

describe('BlogController', () => {
    let controller: BlogController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BlogController],
            providers: [BlogService, BlogFileRepository],
        }).compile();

        controller = module.get<BlogController>(BlogController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
