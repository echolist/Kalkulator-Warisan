import React from "react";

interface Props {
    wasiat: number;
    utang: number;
    biaya: number;
    setWasiat: (v: number) => void;
    setUtang: (v: number) => void;
    setBiaya: (v: number) => void;
}

const WasiatUtangBiayaForm: React.FC<Props> = ({
    wasiat,
    utang,
    biaya,
    setWasiat,
    setUtang,
    setBiaya,
}) => {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-3">
            <h2 className="font-semibold text-lg mb-2">💰 Pengurangan dari Harta Warisan</h2>

            <div className="space-y-2">
                <label className="block">
                    <span className="text-gray-700 font-medium">Wasiat</span>
                    <input
                        type="number"
                        value={wasiat}
                        onChange={(e) => setWasiat(Number(e.target.value))}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        placeholder="Masukkan jumlah wasiat"
                        onFocus={e => e.target.value === "0" && (e.target.value = "")}
                        onBlur={e => e.target.value === "" && (e.target.value = "0")}
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 font-medium">Utang</span>
                    <input
                        type="number"
                        value={utang}
                        onChange={(e) => setUtang(Number(e.target.value))}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        placeholder="Masukkan jumlah utang"
                        onFocus={e => e.target.value === "0" && (e.target.value = "")}
                        onBlur={e => e.target.value === "" && (e.target.value = "0")}
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 font-medium">Biaya Pemakaman</span>
                    <input
                        type="number"
                        value={biaya}
                        onChange={(e) => setBiaya(Number(e.target.value))}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        placeholder="Masukkan biaya pemakaman"
                        onFocus={e => e.target.value === "0" && (e.target.value = "")}
                        onBlur={e => e.target.value === "" && (e.target.value = "0")}
                    />
                </label>
            </div>
        </div>
    );
};

export default WasiatUtangBiayaForm;
