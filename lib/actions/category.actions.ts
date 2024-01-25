"use server"

import { connectToDatabase } from "../database"
import Category from "../database/models/category.model";

type createCategoryParams = {
    categoryName: string
}

export async function createCategory({categoryName}: createCategoryParams) {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({ name: categoryName})

        return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    }
}

export async function getAllCategories() {
    try {
        await connectToDatabase();

        const categories = await Category.find()

        return JSON.parse(JSON.stringify(categories))
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    }
}