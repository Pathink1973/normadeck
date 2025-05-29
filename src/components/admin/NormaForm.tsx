import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import type { Norma } from '../../types';

interface NormaFormProps {
  norma?: Norma;
  onSuccess: () => void;
  onCancel?: () => void;
}

export function NormaForm({ norma, onSuccess, onCancel }: NormaFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    pais: '',
    categoria: '',
    ano: '',
    imagem_url: '',
    pdf_url: '',
    autor: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const isEditMode = !!norma;
  
  useEffect(() => {
    if (norma) {
      setFormData({
        nome: norma.nome,
        pais: norma.pais,
        categoria: norma.categoria || '',
        ano: norma.ano || '',
        imagem_url: norma.imagem_url,
        pdf_url: norma.pdf_url,
        autor: norma.autor || '',
      });
      setPreview(norma.imagem_url);
    }
  }, [norma]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'imagem_url') {
      setPreview(value);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { nome, pais, categoria, ano, imagem_url, pdf_url, autor } = formData;
      
      if (!nome || !pais || !imagem_url || !pdf_url) {
        throw new Error('Preencha todos os campos obrigatórios');
      }
      
      const normaData = {
        nome,
        pais,
        categoria: categoria || null,
        ano: ano || null,
        imagem_url,
        pdf_url,
        autor: autor || null,
      };
      
      let result;
      
      if (isEditMode) {
        result = await supabase
          .from('normas')
          .update(normaData)
          .eq('id', norma.id);
      } else {
        result = await supabase
          .from('normas')
          .insert([normaData]);
      }
      
      if (result.error) {
        throw result.error;
      }
      
      onSuccess();
      
      if (!isEditMode) {
        // Reset form if it's a new norma
        setFormData({
          nome: '',
          pais: '',
          categoria: '',
          ano: '',
          imagem_url: '',
          pdf_url: '',
          autor: '',
        });
        setPreview(null);
      }
      
    } catch (err: any) {
      console.error('Error saving norma:', err);
      setError(err.message || 'Erro ao salvar a norma');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome da Entidade <span className="text-red-500">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="pais" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            País <span className="text-red-500">*</span>
          </label>
          <input
            id="pais"
            name="pais"
            type="text"
            required
            value={formData.pais}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Instituição pública">Instituição pública</option>
            <option value="Escola">Escola</option>
            <option value="Empresa">Empresa</option>
            <option value="Outra">Outra</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="ano" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ano
          </label>
          <input
            id="ano"
            name="ano"
            type="text"
            value={formData.ano}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="imagem_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL da Imagem de Capa <span className="text-red-500">*</span>
          </label>
          <input
            id="imagem_url"
            name="imagem_url"
            type="url"
            required
            value={formData.imagem_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="pdf_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL do PDF <span className="text-red-500">*</span>
          </label>
          <input
            id="pdf_url"
            name="pdf_url"
            type="url"
            required
            value={formData.pdf_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="autor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Autor (Opcional)
          </label>
          <input
            id="autor"
            name="autor"
            type="text"
            value={formData.autor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        {preview && (
          <div className="md:col-span-2">
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pré-visualização da imagem:
            </p>
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-2 max-w-md">
              <img 
                src={preview} 
                alt="Pré-visualização" 
                className="max-h-64 object-contain mx-auto" 
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 mt-8">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Salvando...' : isEditMode ? 'Atualizar Norma' : 'Adicionar Norma'}
        </Button>
      </div>
    </form>
  );
}