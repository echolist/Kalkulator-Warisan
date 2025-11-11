import React from "react";
import type { Member, Relation } from "../types/inheritance";
import { RELATIONS } from "../types/inheritance";
interface Props {
    members: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
    relations: Relation;
}

export default function MemberList({ members, setMembers, relations }: Props) {
    const addMember = () => {
        setMembers([
            ...members,
            { id: Date.now(), name: "", relation: relations },
        ]);
    };

    const deleteMember = (id: number) => {
        setMembers(members.filter((m) => m.id !== id));
    };

    return (
        <div className="border p-3 rounded-md">
            <h2 className="font-semibold mb-2">👪 Anggota Keluarga</h2>
            {members.map((m) => (
                <div key={m.id}
                    className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="flex flex-col sm:flex-row flex-1 gap-2">
                        <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Nama"
                            value={m.name}
                            onChange={(e) =>
                                setMembers(
                                    members.map((x) =>
                                        x.id === m.id ? { ...x, name: e.target.value } : x
                                    )
                                )
                            }
                        />
                        <select
                            className="border rounded px-2 py-1 w-full sm:w-auto"
                            value={m.relation}
                            onChange={(e) =>
                                setMembers(
                                    members.map((x) =>
                                        x.id === m.id ? { ...x, relation: e.target.value as Relation } : x
                                    )
                                )
                            }
                        >
                            {RELATIONS.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => deleteMember(m.id)}
                        className="bg-red-600 hover:bg-red-500 rounded px-3 py-1 self-end sm:self-auto transition-all duration-200 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            ))}
            <button
                onClick={addMember}
                className="bg-blue-500 text-white rounded px-3 py-1 mt-2"
            >
                + Tambah Anggota
            </button>
        </div>
    );
}
