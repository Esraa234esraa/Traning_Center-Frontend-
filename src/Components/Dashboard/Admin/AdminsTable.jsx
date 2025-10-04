import React, { useMemo } from 'react';
import { useGetAllAdmins } from '../../../Hooks/Admin/useQueryAdmin';
import { useDeactivateAdmin } from '../../../Hooks/Admin/useMutationAdmins';
import Loading from '../../../Components/Loading';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminsTable() {
    const { data, isLoading, isError } = useGetAllAdmins();
    const deactivateMutation = useDeactivateAdmin();
    const navigate = useNavigate();
    const admins = useMemo(() => data?.data || [], [data]);

    if (isLoading) return <Loading />;
    if (isError) return <p className="text-red-500">حدث خطأ أثناء جلب المشرفين</p>;


    const handleDeactivate = (id) => {
        confirmAlert({
            title: 'تأكيد',
            message: 'هل أنت متأكد من تعطيل هذا المشرف؟',
            buttons: [
                {
                    label: 'نعم',
                    onClick: async () => {
                        try {
                            await deactivateMutation.mutateAsync(id);
                            toast.success('تم تعطيل المشرف بنجاح');
                        } catch (error) {
                            toast.error('حدث خطأ أثناء تعطيل المشرف');
                        }
                    }
                },
                { label: 'لا' }
            ]
        });
    };

    const handleEdit = (admin) => {
        navigate(`/dashboard/admins/edit-admin/${admin.id}`, { state: { admin } });
    };

    return (
        <div className="overflow-x-auto px-6 py-4">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-right">الاسم</th>
                        <th className="px-4 py-2 text-right">البريد الإلكتروني</th>
                        <th className="px-4 py-2 text-right">رقم الهاتف</th>
                        <th className="px-4 py-2 text-right">تاريخ الإنشاء</th>
                        <th className="px-4 py-2 text-right">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id} className="border-b hover:bg-gray-50 transition">
                            <td className="px-4 py-2">{admin.fullName}</td>
                            <td className="px-4 py-2">{admin.email}</td>
                            <td className="px-4 py-2">{admin.phoneNumber}</td>
                            <td className="px-4 py-2">
                                {new Date(admin.createdAt).toLocaleDateString('ar-EG')}
                            </td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(admin)}
                                    className="btn-soft btn-blue"
                                >
                                    تعديل
                                </button>
                                <button
                                    onClick={() => handleDeactivate(admin.id)}
                                    className="btn-soft btn-red"                    >
                                
                                    تعطيل
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
