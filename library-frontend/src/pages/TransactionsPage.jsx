import React, { useEffect, useState } from 'react';
import API from '../api/axiosClient';
import { ArrowLeftRight, CheckCircle2, Clock, Plus, X } from 'lucide-react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [issueData, setIssueData] = useState({
    bookId: '',
    memberId: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txRes, bookRes, memberRes] = await Promise.all([
        API.get('/transactions'),
        API.get('/books'),
        API.get('/members'),
      ]);
      setTransactions(txRes.data);
      setBooks(bookRes.data);
      setMembers(memberRes.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load transaction data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/transactions/borrow', {
        bookId: Number(issueData.bookId),
        memberId: Number(issueData.memberId),
      });
      setIsModalOpen(false);
      setIssueData({ bookId: '', memberId: '' });
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to issue book. Check inventory or member status.');
    }
  };

  const handleReturn = async (id) => {
    if (!window.confirm('Confirm returning this book?')) return;
    try {
      await API.put(`/transactions/return/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to return book.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Circulation Desk</h1>
          <p className="text-slate-500 text-sm">Issue books, register returns, and track dues</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Issue Book</span>
        </button>
      </div>

      {loading && <p className="text-slate-500">Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Tx ID</th>
                <th className="px-6 py-3">Book</th>
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Borrow Date</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Fine</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-slate-500">
                    No transactions recorded.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{tx.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{tx.bookTitle}</td>
                    <td className="px-6 py-4 text-slate-600">{tx.memberName}</td>
                    <td className="px-6 py-4 text-slate-500">{tx.borrowDate}</td>
                    <td className="px-6 py-4 text-slate-500">{tx.dueDate}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {tx.fineAmount > 0 ? (
                        <span className="text-red-600 font-semibold">${tx.fineAmount}</span>
                      ) : (
                        '$0.00'
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          tx.status === 'BORROWED'
                            ? 'bg-amber-100 text-amber-800'
                            : tx.status === 'OVERDUE'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {tx.status === 'BORROWED' && <Clock className="h-3 w-3" />}
                        {tx.status === 'RETURNED' && <CheckCircle2 className="h-3 w-3" />}
                        <span>{tx.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {tx.status !== 'RETURNED' ? (
                        <button
                          onClick={() => handleReturn(tx.id)}
                          className="text-xs bg-slate-800 hover:bg-slate-900 text-white font-medium px-3 py-1.5 rounded transition"
                        >
                          Return
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Issue Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100">
              <div className="flex items-center space-x-2 text-indigo-600">
                <ArrowLeftRight className="h-5 w-5" />
                <h2 className="text-lg font-bold text-slate-800">Issue Book to Patron</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Book</label>
                <select
                  required
                  value={issueData.bookId}
                  onChange={(e) => setIssueData({ ...issueData, bookId: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Choose an available book --</option>
                  {books
                    .filter((b) => b.availableCopies > 0)
                    .map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} ({b.availableCopies} available)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Member</label>
                <select
                  required
                  value={issueData.memberId}
                  onChange={(e) => setIssueData({ ...issueData, memberId: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Choose an active member --</option>
                  {members
                    .filter((m) => m.status === 'ACTIVE')
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.email})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;