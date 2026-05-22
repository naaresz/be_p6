import { Request, Response } from 'express';
import { prisma } from "../lib/db.js";


//menampilkan semua pembicara
export const getAllSpeakers = async (req: Request, res: Response) => {
    try {
        const speakers = await prisma.speaker.findMany();
        res.json(speakers);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil Pembicara",
            error,
        });
    }
};

// menampilkan data terbaru
export const createSpeaker = async (req: Request, res: Response) => {
    try{
        const { nama, materi, jabatan, foto } = req.body;

        if (!nama || !jabatan || !foto){
            return res.status(500).json({
                message: "Nama, jabatan, dan foto harus di isi"
            });
        }

        const newSpeaker = await prisma.speaker.create ({
            data: {
                nama, 
                materi,
                jabatan,
                foto,
            },
        });

        res.status(201).json(newSpeaker);
    } catch (error) {
        res
            .status(500)
            .json({message: "Terjadi kesalahan saat membuat pembicara", 
                    error
        });
    }
};

// menampilkan data speaker berdasarkan id
export const getSpeakerById = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const speaker =  await prisma.speaker.findUnique({
            where: { id }
        });
        
        if (!speaker){
            return res.status(404).json({
                message: "Pembicara tidak ditemukan"
            });
        }
        res.json(speaker);
    }catch (error){
        res.status(500).json({message: "Terjadi kesalahan", error});
    }
};

//Mengupdadte data speaker berdasarkan id
export const updateSpeakerById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { nama, materi, jabatan, foto } = req.body;

        const updateSpeakerById = await prisma.speaker.update({
            where: { id },
            data: {
                nama,
                materi,
                jabatan,
                foto,
            },
        });
        res.json(updateSpeakerById);

    } catch (error) {
        res.status(500).json({
            message: "Gagal update Pembicara",
            error
        });
    }
};

//Menghapus data pembicara berdasarkan id
export const deleteSpeakerById = async (req: Request, res:Response) => {
    
    try {
        const id = Number(req.params.id);

        await prisma.speaker.delete({
            where: { id },
        });

        res.json({message: "Pembicara berhasil dihapus"});
    } catch (error) {
        res.status(500).json({message:"Gagal menghapus pembicara", error});
    }
};