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
                <div key={m.id} className="flex gap-2 mb-2">
                    <input
                        type="text"
                        className="border rounded px-2 py-1 flex-1"
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
                        className="border rounded px-2 py-1"
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
                    <button
                        onClick={() => deleteMember(m.id)}
                        className="bg-red-500 text-white rounded px-2"
                    >
                        ❌
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
