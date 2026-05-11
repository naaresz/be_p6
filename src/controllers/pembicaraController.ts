import { Request, Response } from 'express';
import { Speaker } from "../types/pembicara";

let speakers: Speaker[] = [];

//menampilkan semua pembicara
export const getAllSpeakers = (req: Request, res: Response) => {
    res.json(speakers);
};

// menampilkan data terbaru
export const createSpeaker = (req: Request, res: Response) => {
    try{
        const { nama, jabatan, foto } = req.body;

        if (!nama || !jabatan || !foto){
            return res.status(500).json({
                message: "Nama, jabatan, dan foto harus di isi"
            });
        }

        const newSpeaker: Speaker = {
            id: speakers.length + 1,
            nama,
            jabatan,
            foto,
        };

        speakers.push(newSpeaker);

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
export const getSpeakerById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const speaker = speakers.find((s) => s.id === id);

    if (!speaker){
        return res.status(404).json({
            message: "Pembicara tidak ditemukan"
        });
    }

    res.json(speaker);
};

//Mengupdadte data speaker berdasarkan id
export const updateSpeakerById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const speaker = speakers.find((s) => s.id === id);

    if (!speaker) {
        return res.status(404).json({
            message: "Speaker tidak ditemukan"
        });
    }

    speaker.nama = req.body.nama ?? speaker.nama;
    speaker.jabatan = req.body.jabatan ?? speaker.jabatan;
    speaker.foto = req.body.foto ?? speaker.foto;

    res.json(speaker);
};

//Menghapus data pembicara berdasarkan id
export const deleteSpeakerById = (req: Request, res:Response) => {
    const id = Number(req.params.id);

    speakers = speakers.filter((s) => s.id !== id);

    res.json({
        message: "Pembicara berhasil di hapus"
    });
};