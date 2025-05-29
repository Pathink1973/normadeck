import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { NormaTable } from '../components/admin/NormaTable';
import { NormaForm } from '../components/admin/NormaForm';
import { AuthForm } from '../components/ui/AuthForm';
import { useAuthStore } from '../store/authStore';
import type { Norma } from '../types';

export function AdminPage() {
  const [selectedTab, setSelectedTab] = useState('view');
  const [editingNorma, setEditingNorma] = useState<Norma | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const { user, loading, checkSession } = useAuthStore();
  
  useEffect(() => {
    checkSession();
  }, [checkSession]);
  
  const handleEdit = (norma: Norma) => {
    setEditingNorma(norma);
    setSelectedTab('add');
  };
  
  const handleFormSuccess = () => {
    setEditingNorma(undefined);
    setSelectedTab('view');
    setRefreshKey(prev => prev + 1);
  };
  
  const handleCancelEdit = () => {
    setEditingNorma(undefined);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
        <div className="container mx-auto">
          <AuthForm />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Painel de Administração
        </h1>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="view">Ver Normas</TabsTrigger>
            <TabsTrigger value="add">
              {editingNorma ? 'Editar Norma' : 'Adicionar Nova Norma'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
            <NormaTable 
              key={refreshKey}
              onEdit={handleEdit}
              onRefresh={() => setRefreshKey(prev => prev + 1)}
            />
          </TabsContent>
          
          <TabsContent value="add" className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 p-6">
            <NormaForm 
              norma={editingNorma}
              onSuccess={handleFormSuccess}
              onCancel={editingNorma ? handleCancelEdit : undefined}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}