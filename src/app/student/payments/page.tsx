'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  ChevronRight,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPayments, Payment } from '@/lib/firebase/firestore';

// Demo payments
const demoPayments: Payment[] = [
  { id: '1', studentId: '1', studentName: 'Test', month: 'Januari', year: 2025, amount: 150000, status: 'paid', paidAt: new Date(2025, 0, 5) },
  { id: '2', studentId: '1', studentName: 'Test', month: 'Februari', year: 2025, amount: 150000, status: 'paid', paidAt: new Date(2025, 1, 3) },
  { id: '3', studentId: '1', studentName: 'Test', month: 'Maret', year: 2025, amount: 150000, status: 'pending' },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments('demo');
        if (data.length > 0) {
          setPayments(data);
        } else {
          setPayments(demoPayments);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments(demoPayments);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const totalPaid = payments.filter(p => p.status === 'paid').length;
  const totalPending = payments.filter(p => p.status === 'pending').length;
  const totalAmount = payments.filter(p => p.status === 'paid').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pembayaran SPP</h1>
        <p className="text-gray-500">Riwayat pembayaran biaya bimbingan belajar</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
        >
          <CheckCircle className="w-5 h-5 mx-auto mb-2 text-[#38ef7d]" />
          <div className="text-2xl font-bold text-gray-800">{totalPaid}</div>
          <div className="text-xs text-gray-500">Lunas</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
        >
          <Clock className="w-5 h-5 mx-auto mb-2 text-[#fee140]" />
          <div className="text-2xl font-bold text-gray-800">{totalPending}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
        >
          <Wallet className="w-5 h-5 mx-auto mb-2 text-[#667eea]" />
          <div className="text-xl font-bold text-gray-800">
            Rp {(totalAmount / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-500">Total</div>
        </motion.div>
      </div>

      {/* Pending Payment Alert */}
      {totalPending > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#fee140] to-[#fa709a] rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Pembayaran Tertunda</h3>
              <p className="text-white/80 text-sm">Anda memiliki {totalPending} pembayaran yang belum lunas</p>
            </div>
            <Button className="bg-white text-[#fa709a] rounded-xl">
              Bayar Sekarang
            </Button>
          </div>
        </motion.div>
      )}

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Riwayat Pembayaran</h2>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="divide-y divide-gray-50">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : payments.length > 0 ? (
            payments.map((payment, index) => (
              <div key={payment.id || index} className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  payment.status === 'paid'
                    ? 'bg-green-100'
                    : 'bg-yellow-100'
                }`}>
                  {payment.status === 'paid' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{payment.month} {payment.year}</p>
                  <p className="text-xs text-gray-500">
                    {payment.status === 'paid' && payment.paidAt
                      ? `Dibayar: ${new Date(payment.paidAt).toLocaleDateString('id-ID')}`
                      : 'Belum dibayar'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    Rp {payment.amount.toLocaleString('id-ID')}
                  </p>
                  <Badge className={
                    payment.status === 'paid'
                      ? 'bg-green-100 text-green-600 border-0'
                      : 'bg-yellow-100 text-yellow-600 border-0'
                  }>
                    {payment.status === 'paid' ? 'Lunas' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Wallet className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Belum ada riwayat pembayaran</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
