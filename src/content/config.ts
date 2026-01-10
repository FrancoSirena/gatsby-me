import { defineCollection, z } from 'astro:content';

const techPosts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    permalink: z.string(),
    summary: z.string().optional(),
  }),
});

export const collections = {
  'tech-posts': techPosts,
};
