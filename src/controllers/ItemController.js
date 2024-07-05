import { Donation } from '../models/DonationItem.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadItem = [
    upload.single('image'),
    async (req, res) => {
        try {
            const newItem = new Donation({
                name: req.body.name,
                niche: req.body.niche,
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                },
                createdAt: Date.now(),
            });

            await newItem.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).send('Erro ao salvar a imagem.');
        }
    }
];

const getItems = async (req, res) => {
    try {
        const items = await Donation.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send('Erro ao recuperar os itens.');
    }
};

const getSelectedItems = async (req, res) => {
    try {
        const items = await Donation.find({ selected: true });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send('Erro ao recuperar os itens selecionados.');
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Donation.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item não encontrado.');
        }
        res.set('Content-Type', item.image.contentType);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).send('Erro ao recuperar o item.');
    }
};

const updateItem = [
    upload.single('image'),
    async (req, res) => {
        try {
            const updateData = {
                name: req.body.name,
                niche: req.body.niche,
            };

            if (req.file) {
                updateData.image = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                };
            }

            const updatedItem = await Donation.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedItem) {
                return res.status(404).send('Item não encontrado.');
            }

            res.status(200).send('Item atualizado com sucesso!');
        } catch (error) {
            res.status(500).send('Erro ao atualizar o item.');
        }
    }
];

const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Donation.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).send('Item não encontrado.');
        }
        res.status(200).send('Item deletado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao deletar o item.');
    }
};

const toggleItemSelected = async (req, res) => {
    try {
        const item = await Donation.findById(req.params.id);

        if (!item) {
            return res.status(404).send('Item não encontrado.');
        }

        item.selected = !item.selected;
        await item.save();

        res.status(200).send(`Item marcado como ${item.selected ? 'selecionado' : 'não selecionado'}.`);
    } catch (error) {
        res.status(500).send('Erro ao marcar o item como selecionado.');
    }
};

export { uploadItem, getItems, getSelectedItems, getItemById, updateItem, deleteItem, toggleItemSelected };
