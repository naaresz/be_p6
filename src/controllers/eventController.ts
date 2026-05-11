import { Request, Response } from 'express';
import { Event } from "../types/event";

let events: Event[] = [];

// menampilkan semua event
export const getAllEvents = (req: Request, res: Response) => {
    res.json(events);
};

// menampilkan data event terbaru
export const createEvent = (req: Request, res: Response) => {
    try{
        const { kategori, nama, tanggal, jam, lokasi, kampus } = req.body;

        if (!kategori ||
            !nama ||
            !tanggal ||
            !jam ||
            !lokasi ||
            !kampus
        ){
            return res.status(500).json({message: "Nama, tanggal, dan lokasi harus di isi"});
        }

        const newEvent: Event = {
            id: events.length + 1,
            kategori,
            nama,
            tanggal: new Date(tanggal),
            jam,
            lokasi,
            kampus,
        };

        events.push(newEvent);

        res.status(201).json(newEvent);
    } catch (error) {
        res
            .status(500)
            .json({message: "Terjadi kesalahan saat membuat event", error});
    }
};

//menampilkan data event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = events.find((e) => e.id === id);

    if (!event) {
        return res.status(404).json({
            message: "Event tidak ditemukan",
        });
    }

    res.json(event);
};

//mengupdate data event berdasarkan id
export const updateEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = events.find((e) => e.id === id);

    if (!event) {
        return res.status(404).json({
            message: "Event tidak ditemukan"
        });
    }

    event.kategori = req.body.kategori ?? event.kategori;
    event.nama = req.body.nama ?? event.nama;
    event.tanggal = req.body.tanggal
        ? new Date(req.body.tanggal)
        : event.tanggal;
    event.jam = req.body.jam ?? event.jam;
    event.lokasi = req.body.lokasi ?? event.lokasi;
    event.kampus = req.body.kampus ?? event.kampus;

    res.json(event);
};

//menghapus data event berdasarkan id
export const deleteEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    events = events.filter((e) => e.id !== id);

    res.json({
        message: "Event berhasil dihapus"
    });
}
