import { NextApiRequest, NextApiResponse } from 'next';
import { IExpenses } from './../../models/IExpense';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IExpenses[]>
) {
  res.status(200).json([
      {
        "id": 1,
        "date": 1649041200000,
        "description": "Compra no mercadinho da esquina",
        "category": "Supermercado",
        "value": 234
      },
      {
        "id": 2,
        "date": 1651719600000,
        "description": "Restaurante do Shopping",
        "category": "Comida",
        "value": 99.99
      },
      {
        "id": 3,
        "date": 1644116400000,
        "description": "FIFA 2022",
        "category": "Jogos",
        "value": 120.5
      },
      {
        "id": 4,
        "date": 1651806000000,
        "description": "Ingressos no cinema",
        "category": "Lazer",
        "value": 94.29
      },
      {
        "id": 5,
        "date": 1657076400000,
        "description": "Passagem de ônibus público",
        "category": "Transporte",
        "value": 10
      }
  ])
}