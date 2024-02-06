import * as z  from "zod";

export const postFormSchema = z.object({
    title: z.string().min(2, 'Title most be at least 2 characters'),
    description: z.string().min(20, 'Desciption most be at least 20 characters').max(2000,'Desciption most be less than 2000 characters'),
    private: z.boolean(),
    imageUrl: z.string(),
    categoryId: z.string(),
  });