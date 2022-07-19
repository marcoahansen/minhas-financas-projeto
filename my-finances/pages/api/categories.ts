import { NextApiRequest, NextApiResponse } from 'next';
import ICategories from '../../models/ICategories';
import { IExpenses } from './../../models/IExpense';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICategories[]>
) {
  res.status(200).json([
    {
      "id": 1,
      "name": "Comida"
    },
    {
      "id": 2,
      "name": "Lazer"
    },
    {
      "id": 3,
      "name": "Supermercado"
    },
    {
      "id": 4,
      "name": "Transporte"
    },
    {
      "id": 5,
      "name": "Jogos"
    },
    {
      "id": 6,
      "name": "Farmácia"
    },
    {
      "id": 7,
      "name": "Roupas"
    }
  ])
}