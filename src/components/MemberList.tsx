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
        <div className="waris:border waris:p-3 waris:rounded-md">
            <h2 className="waris:font-semibold waris:mb-2">👪 Anggota Keluarga</h2>
            {members.map((m) => (
                <div key={m.id}
                    className="waris:flex waris:flex-col waris:sm:flex-row waris:gap-2 waris:mb-3">
                    <div className="waris:flex waris:flex-col waris:sm:flex-row waris:flex-1 waris:gap-2">
                        <input
                            type="text"
                            className="waris:border waris:rounded waris:px-2 waris:py-1 waris:w-full"
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
                            className="waris:border waris:rounded waris:px-2 waris:py-1 waris:w-full waris:sm:w-auto"
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
                        className="waris:bg-red-600 waris:hover:bg-red-500 waris:rounded waris:px-3 waris:py-1 waris:self-end waris:sm:self-auto waris:transition-all waris:duration-200 waris:cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="waris:h-5 waris:w-5 waris:text-white"
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
                className="waris:bg-blue-600 waris:hover:bg-blue-500 waris:text-white waris:rounded waris:px-3 waris:py-1 waris:mt-2
                waris:transition-all waris:duration-200 waris:cursor-pointer"
            >
                + Tambah Anggota
            </button>
        </div>
    );
}
