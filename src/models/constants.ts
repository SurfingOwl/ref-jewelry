import {HeadCell} from "@/models/types";

export const companies = [
  'Chaumet',
  'Fred',
  'Dinh Van',
  'Repossi',
  'Cartier',
  'Autres'
];
export const types = [
  'SOD',
  'CM',
  'CYL',
  'Stock',
  'SAV',
  'R. Rh',
  'Gravure'
];
export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Référence produit',
  },
  {
    id: 'type',
    numeric: false,
    label: 'Type de travail',
  },
  {
    id: 'company',
    numeric: false,
    label: 'Maison',
  },
  {
    id: 'count',
    numeric: false,
    label: 'Nombre de pièces',
  },
  {
    id: 'receptionDate',
    numeric: false,
    label: 'Date de réception',
  },
  {
    id: 'deliveryDate',
    numeric: false,
    label: 'Date de livraison',
  },
];

export const companyLabel = "Maison";
export const typeLabel = "Type de travail effectué";
