'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface ContactType {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const response = await fetch('/pt/api/admin/contacts');
      if (!response.ok) {
        throw new Error('Falha ao carregar contatos');
      }
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError('Erro ao carregar lista de contatos');
      console.error('Erro ao carregar contatos:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este contato?')) {
      return;
    }

    try {
      const response = await fetch(`/pt/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir contato');
      }

      await loadContacts();
    } catch (err) {
      console.error('Erro ao excluir contato:', err);
      alert('Erro ao excluir contato');
    }
  }

  async function handleStatusChange(id: string, status: 'RESOLVED' | 'REJECTED') {
    try {
      const response = await fetch(`/pt/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar status');
      }

      await loadContacts();
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao atualizar status');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display text-gray-900">Contatos</h1>
        <p className="text-gray-600">Gerencie as mensagens de contato</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-600">Nome</th>
                <th className="text-left p-4 font-medium text-gray-600">Email</th>
                <th className="text-left p-4 font-medium text-gray-600">Assunto</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Data</th>
                <th className="text-right p-4 font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare size={20} className="text-green-600" />
                      </div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{contact.email}</td>
                  <td className="p-4 text-gray-600">{contact.subject}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : contact.status === 'RESOLVED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {contact.status === 'PENDING'
                        ? 'Pendente'
                        : contact.status === 'RESOLVED'
                        ? 'Resolvido'
                        : 'Rejeitado'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {contact.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(contact.id, 'RESOLVED')}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg"
                            title="Marcar como resolvido"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(contact.id, 'REJECTED')}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                            title="Rejeitar contato"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                        title="Excluir contato"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
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