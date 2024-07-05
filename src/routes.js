import { Router } from 'express';
import {
  uploadItem,
  getItems,
  getSelectedItems,
  getItemById,
  updateItem,
  deleteItem,
  toggleItemSelected
} from './controllers/ItemController.js';
import checkToken from './helpers/check-token.js';

const routes = Router();

routes.post('/item/upload', checkToken, uploadItem);
routes.get('/item', getItems);
routes.get('/item/selected', getSelectedItems);
routes.get('/item/:id', getItemById);
routes.put('/item/:id', checkToken, updateItem);
routes.delete('/item/:id', checkToken, deleteItem);
routes.put('/item/select/:id', checkToken, toggleItemSelected);

export default routes;
