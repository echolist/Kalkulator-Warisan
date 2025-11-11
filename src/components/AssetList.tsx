import React from "react";
import type { Asset } from "../types/inheritance";

interface Props {
    assets: Asset[];
    setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

export default function AssetList({ assets, setAssets }: Props) {
    const addAsset = () => {
        setAssets([...assets, { id: Date.now(), name: "", value: 0 }]);
    };

    const deleteAsset = (id: number) => {
        setAssets(assets.filter((a) => a.id !== id));
    };

    return (
        <div className="border p-3 rounded-md">
            <h2 className="font-semibold mb-2">🏠 Aset</h2>
            {assets.map((a) => (
                <div key={a.id} className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="flex flex-col sm:flex-row flex-1 gap-2">
                        <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Nama aset (misal: Rumah)"
                            value={a.name}
                            onChange={(e) =>
                                setAssets(
                                    assets.map((x) =>
                                        x.id === a.id ? { ...x, name: e.target.value } : x
                                    )
                                )
                            }
                        />
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-full sm:w-auto"
                            placeholder="Nilai"
                            value={a.value}
                            onChange={(e) =>
                                setAssets(
                                    assets.map((x) =>
                                        x.id === a.id
                                            ? { ...x, value: parseFloat(e.target.value) || 0 }
                                            : x
                                    )
                                )
                            }
                            onFocus={e => e.target.value === "0" && (e.target.value = "")}
                            onBlur={e => e.target.value === "" && (e.target.value = "0")}
                        />
                    </div>
                    <button
                        onClick={() => deleteAsset(a.id)}
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
                onClick={addAsset}
                className="bg-blue-500 text-white rounded px-3 py-1 mt-2"
            >
                + Tambah Aset
            </button>
        </div>
    );
}