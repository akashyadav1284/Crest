"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface JoinRequest {
    _id: string;
    name: string;
    email: string;
    department: string;
    interestDomain: string;
    requestStatus: string;
    remarks?: string;
    createdAt: string;
}

export default function RequestsManagement() {
    const [requests, setRequests] = useState<JoinRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
    const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
    const [actionType, setActionType] = useState<"approved" | "rejected">("approved");
    const [remarks, setRemarks] = useState("");
    const [addToTeam, setAddToTeam] = useState(false);

    const apiUrl = "http://localhost:5000/api";

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`${apiUrl}/join`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setRequests(data);
        } catch (err) {
            console.error("Failed to fetch requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedReqId) return;

        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`${apiUrl}/join/${selectedReqId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ requestStatus: actionType, remarks, addToTeam: actionType === 'approved' ? addToTeam : false })
            });

            if (res.ok) {
                setIsRemarksModalOpen(false);
                setSelectedReqId(null);
                setRemarks("");
                setAddToTeam(false);
                fetchRequests();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openActionModal = (id: string, type: "approved" | "rejected") => {
        setSelectedReqId(id);
        setActionType(type);
        setIsRemarksModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this request forever?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${apiUrl}/join/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchRequests();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white flex items-center gap-3">
                    <FileText className="text-yellow-500" />
                    Join Requests
                </h1>
                <p className="text-white/50 text-sm mt-2 font-inter">Review, approve, or reject new membership applications.</p>
            </header>

            {loading ? (
                <div className="text-white/50 animate-pulse">Loading requests...</div>
            ) : (
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/70">
                            <thead className="bg-white/5 text-xs uppercase text-white/50 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-widest">Applicant</th>
                                    <th className="px-6 py-4 font-bold tracking-widest">Details</th>
                                    <th className="px-6 py-4 font-bold tracking-widest">Date</th>
                                    <th className="px-6 py-4 font-bold tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white text-base">{req.name}</div>
                                            <div className="text-xs text-cyan-400">{req.email}</div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-xs text-white/80"><strong className="text-white">Dept:</strong> {req.department || 'N/A'}</p>
                                            <p className="text-xs text-white/50 truncate"><strong className="text-white/80">Domain:</strong> {req.interestDomain || 'N/A'}</p>
                                            {req.remarks && <p className="text-xs text-yellow-500 mt-1 italic w-full truncate">Remarks: {req.remarks}</p>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full border ${req.requestStatus === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                                req.requestStatus === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                                }`}>
                                                {req.requestStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {req.requestStatus === 'pending' && (
                                                    <>
                                                        <button title="Approve" onClick={() => openActionModal(req._id, 'approved')} className="text-green-500 hover:text-green-400 bg-green-500/10 p-2 rounded-lg transition-colors"><CheckCircle size={18} /></button>
                                                        <button title="Reject" onClick={() => openActionModal(req._id, 'rejected')} className="text-red-500 hover:text-red-400 bg-red-500/10 p-2 rounded-lg transition-colors"><XCircle size={18} /></button>
                                                    </>
                                                )}
                                                <button title="Delete" onClick={() => handleDelete(req._id)} className="text-white/30 hover:text-white bg-white/5 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-white/40 italic">
                                            No join requests found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Modal for Remarks & Actions */}
            {isRemarksModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6"
                    >
                        <h2 className={`text-xl font-bold uppercase ${actionType === 'approved' ? 'text-green-400' : 'text-red-400'} mb-4`}>
                            {actionType === 'approved' ? 'Approve Request' : 'Reject Request'}
                        </h2>
                        <form onSubmit={handleUpdateStatus} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-white/50 font-mono mb-2">Remarks (Optional)</label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Enter your notes here..."
                                />
                            </div>

                            {actionType === 'approved' && (
                                <div className="flex items-center gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        id="addToTeam"
                                        checked={addToTeam}
                                        onChange={(e) => setAddToTeam(e.target.checked)}
                                        className="w-5 h-5 accent-cyan-500 bg-black border-white/20 rounded"
                                    />
                                    <label htmlFor="addToTeam" className="text-sm font-inter text-white/80 select-none cursor-pointer">
                                        Add directly to Members Roster
                                    </label>
                                </div>
                            )}

                            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                                <button type="button" onClick={() => setIsRemarksModalOpen(false)} className="px-4 py-2 rounded-lg text-white/50 hover:bg-white/5 transition-colors">Cancel</button>
                                <button type="submit" className={`px-4 py-2 font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 ${actionType === 'approved' ? 'bg-green-500 hover:bg-green-400 text-black' : 'bg-red-500 hover:bg-red-400 text-black'}`}>
                                    Confirm Action
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

