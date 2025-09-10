import React from 'react';
import { useGetAllAdmins } from '../../../Hooks/useQueryAdmin';
import { useDeactivateAdmin } from '../../../Hooks/useMutationAdmins';
import Loading from '../../../Components/Loading';
import { confirmAlert } from 'react-confirm-alert';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // استايل الافتراضيات

export default function AdminsTable() {
    const { data, isLoading, isError } = useGetAllAdmins();
    const deactivateMutation = useDeactivateAdmin();
    const navigate = useNavigate();

    if (isLoading) return <Loading />;
    if (isError) return <p>حدث خطأ أثناء جلب المشرفين</p>;

    const handleDeactivate = (id) => {
        confirmAlert({
            title: 'تأكيد',
            message: 'هل أنت متأكد من تعطيل هذا المشرف؟',
            buttons: [
                {
                    label: 'نعم',
                    onClick: () => deactivateMutation.mutate(id)
                },
                {
                    label: 'لا',
                    onClick: () => { }
                }
            ]
        });

    };
    const handleEdit = (admin) => {
        navigate(`/dashboard/admins/edit-admin/${admin.id}`, { state: { admin } });
    };

    return (
        <div className="overflow-x-auto px-10 py-6">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-right">الاسم</th>
                        <th className="px-4 py-2 text-right">البريد الإلكتروني</th>
                        <th className="px-4 py-2 text-right">رقم الهاتف</th>
                        <th className="px-4 py-2 text-right">تاريخ الإنشاء</th>
                        <th className="px-4 py-2 text-right">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((admin) => (
                        <tr key={admin.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{admin.fullName}</td>
                            <td className="px-4 py-2">{admin.email}</td>
                            <td className="px-4 py-2">{admin.phoneNumber}</td>
                            <td className="px-4 py-2">
                                {new Date(admin.createdAt).toLocaleDateString('ar-EG')}
                            </td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(admin)}
                                    className="text-blue-500 px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
                                >
                                    تعديل
                                </button>
                                <button
                                    onClick={() => handleDeactivate(admin.id)}
                                    className="text-red-500  px-3 py-1 rounded hover:bg-red-600 hover:text-white"
                                >
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
