import { glob } from 'astro/loaders'
import { z, defineCollection } from 'astro:content'

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            Illustration: image(),
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
            description: z.string(),
            startDate: z.date(),
            endDate: z.date(),
            tags: z.array(z.string()),
        }),
})

export const collections = {
    projects,
    experiences,
}
