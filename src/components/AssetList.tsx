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
                <div key={a.id} className="flex gap-2 mb-2">
                    <input
                        type="text"
                        className="border rounded px-2 py-1 flex-1"
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
                        className="border rounded px-2 py-1 w-32 text-right"
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
                    />
                    <button
                        onClick={() => deleteAsset(a.id)}
                        className="bg-red-500 text-white rounded px-2"
                    >
                        ❌
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