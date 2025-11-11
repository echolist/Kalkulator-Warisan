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
        <div className="waris:border waris:p-3 waris:rounded-md">
            <h2 className="waris:font-semibold waris:mb-2">🏠 Aset</h2>
            {assets.map((a) => (
                <div key={a.id} className="waris:flex waris:flex-col waris:sm:flex-row waris:gap-2 waris:mb-3">
                    <div className="waris:flex waris:flex-col waris:sm:flex-row waris:flex-1 waris:gap-2">
                        <input
                            type="text"
                            className="waris:border waris:rounded waris:px-2 waris:py-1 waris:w-full"
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
                            className="waris:border waris:rounded waris:px-2 waris:py-1 waris:w-full waris:sm:w-auto"
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
                onClick={addAsset}
                className="waris:bg-blue-500 waris:text-white waris:rounded waris:px-3 waris:py-1 waris:mt-2 waris:transition-all waris:duration-200 waris:hover:bg-blue-400 waris:cursor-pointer"
            >
                + Tambah Aset
            </button>
        </div>
    );
}