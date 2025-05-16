import { glob } from 'astro/loaders'
import { z, defineCollection } from 'astro:content'

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishingDate: z.date(),
        link: z.string(),
    }),
})

const experiences = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/experiences',
    }),
    schema: () =>
        z.object({
            title: z.string(),
            company: z.string(),
            companyUrl: z.string(),
            description: z.string(),
            startDate: z.date(),
            endDate: z.date().or(z.literal('Present')),
        }),
})

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishingDate: z.date(),
        tags: z.array(z.string()).optional(),
        published: z.boolean(),
        href: z.string(),
    }),
})

export const collections = {
    projects,
    experiences,
    blog,
}
