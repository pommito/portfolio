import { getCollection } from 'astro:content'

export async function getBlogCollection(lang: 'fr' | 'en') {
    const blogCollection = await getCollection('blog', ({ data, id }) => {
        return (
            id.startsWith(lang) &&
            Boolean(import.meta.env.DEV || data.published)
        )
    }).then((data) =>
        data.toSorted((a, b) => {
            if (a.data.publishingDate > b.data.publishingDate) {
                return -1
            } else if (a.data.publishingDate < b.data.publishingDate) {
                return 1
            } else {
                return 0
            }
        })
    )

    return blogCollection.map((entry) => {
        const langPrefix = lang === 'fr' ? '' : lang + '/'
        return {
            ...entry,
            path: `/${langPrefix}blog/${entry.data.href}`,
        }
    })
}

export async function getProjectCollection(lang: 'fr' | 'en') {
    const projectCollection = await getCollection(
        'projects',
        ({ data, id }) => {
            return id.startsWith(lang)
        }
    ).then((data) =>
        data.toSorted((a, b) => {
            if (a.data.publishingDate > b.data.publishingDate) {
                return -1
            } else if (a.data.publishingDate < b.data.publishingDate) {
                return 1
            } else {
                return 0
            }
        })
    )
    return projectCollection
}
