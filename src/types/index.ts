export interface Norma {
  id: string;
  nome: string;
  pais: string;
  categoria: string | null;
  ano: string | null;
  imagem_url: string;
  pdf_url: string;
  created_at: string;
  autor: string | null;
}

export type SortOption = {
  label: string;
  field: keyof Norma;
  direction: 'asc' | 'desc';
};