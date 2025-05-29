import { FormEvent, useState } from 'react';
import { Button } from './Button';
import { useAuthStore } from '../../store/authStore';
import { Lock } from 'lucide-react';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuthStore();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Área Administrativa</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Acesse o painel para gerenciar normas gráficas</p>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}