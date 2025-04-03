import { glob } from 'astro/loaders'
import { z, defineCollection } from 'astro:content'

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
    }),
})

const experiences = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/experiences' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            company: z.string(),
            companyLogo: image(),
            companyUrl: z.string(),
            description: z.string(),
            startDate: z.date(),
            endDate: z.date(),
            tags: z.array(z.string()),
        }),
})

const articles = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/articles' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
    }),
})

export const collections = {
    projects,
    experiences,
    articles,
}
