import { Request, Response } from "express";
import { Category } from "../types/category"

let categories: Category [] = [];

//1. Menampilkan semuan kategori
export const getAllCategories = (req: Request, res: Response) => {
    res.json(categories)
}

 //2. Menyimpan data kategoori
 export const createCategory = (req: Request, res: Response) => {
    try{
        const { nama, description } = req.body;

        if (!nama ||
            !description
        ) {
            return res.status(500).json({message: "Nama dan deskripsi harus diisi"})
        }

        const newCategory: Category = {
            id: categories.length + 1,
            nama,
            description,
        };

        categories.push(newCategory);

        res.status(201).json(newCategory);
    } catch (error) {
        res
            .status(500)
            .json({message: "Terjadi kesalahan saat membuat event", error});
    }
 };

 //3. Menampilkan data category berdasarkan id
 export const getCategoryById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = categories.find((c) => c.id === id);
    
    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }

    res.json(category);
 }

 //4. mengupdate data category berdasarkan id
 export const updateCategoryById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = categories.find((c) => c.id === id);

    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    category.nama = req.body.nama ?? category.nama;
    category.description = req.body.description ?? category.description;

    res.json(category);
 };

 // 5. menhapus data category berdasarkan id
 export const deleteCategoryById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    categories = categories.filter((c) => c.id !== id);

    res.json({
        message: "Category berhasil dihapus"
    });
 }