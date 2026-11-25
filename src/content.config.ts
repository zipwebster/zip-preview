import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const text=z.string().default('');
export const collections={
 programmes:defineCollection({loader:glob({pattern:'*.json',base:'./src/content/programmes'}),schema:z.object({title:z.string(),published:z.boolean(),tileClass:text,logo:text,logoAlt:text,website:z.union([z.literal(''),z.httpUrl()]).default(''),challenge:text,summary:text,zipRole:text,next:text,placeholder:z.boolean().default(false)})}),
 people:defineCollection({loader:glob({pattern:'*.json',base:'./src/content/people'}),schema:z.object({name:z.string(),published:z.boolean(),featured:z.boolean(),order:z.number(),role:text,bio:text,portrait:text})}),
 news:defineCollection({loader:glob({pattern:'*.json',base:'./src/content/news'}),schema:z.object({title:z.string(),published:z.boolean(),order:z.number(),category:text,image:text,imageAlt:text,url:z.union([z.literal(''),z.httpUrl()]).default('')})})
};
