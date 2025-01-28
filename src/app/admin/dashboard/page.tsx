'use client';

import { Wine, Package, MessageSquare, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalWines: number;
  totalPlans: number;
  totalContacts: number;
  recentContacts: Array<{
    id: string;
    name: string;
    subject: string;
    status: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalWines: 0,
    totalPlans: 0,
    totalContacts: 0,
    recentContacts: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/dashboard/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const statCards = [
    {
      title: 'Total de Vinhos',
      value: stats.totalWines,
      icon: Wine,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Planos Ativos',
      value: stats.totalPlans,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Contatos Recebidos',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-text-primary">Dashboard</h1>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-text-secondary hover:bg-gray-50"
        >
          <TrendingUp size={18} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={card.color} size={24} />
                </div>
                <span className="text-3xl font-medium text-text-primary">{card.value}</span>
              </div>
              <h3 className="text-text-secondary">{card.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Contatos Recentes */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="font-display text-xl text-text-primary mb-6">Contatos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Nome</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Assunto</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-text-primary">{contact.name}</td>
                  <td className="py-3 px-4 text-text-secondary">{contact.subject}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        contact.status === 'PENDING'
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'bg-green-50 text-green-600'
                      }`}
                    >
                      {contact.status === 'PENDING' ? 'Pendente' : 'Respondido'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 