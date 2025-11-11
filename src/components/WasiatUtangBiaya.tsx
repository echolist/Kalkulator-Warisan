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
        <div className="waris:bg-gray-50 waris:p-4 waris:rounded-md waris:shadow-sm waris:space-y-3">
            <h2 className="waris:font-semibold waris:text-lg mb-2">💰 Pengurangan dari Harta Warisan</h2>

            <div className="waris:space-y-2">
                <label className="waris:block">
                    <span className="waris:text-gray-700 waris:font-medium">Wasiat</span>
                    <input
                        type="number"
                        value={wasiat}
                        onChange={(e) => setWasiat(Number(e.target.value))}
                        className="waris:mt-1 waris:block waris:w-full waris:rounded waris:border-gray-300 waris:shadow-sm 
                        waris:focus:ring-blue-500 waris:focus:border-blue-500 waris:p-2"
                        placeholder="Masukkan jumlah wasiat"
                        onFocus={e => e.target.value === "0" && (e.target.value = "")}
                        onBlur={e => e.target.value === "" && (e.target.value = "0")}
                    />
                </label>

                <label className="block">
                    <span className="waris:text-gray-700 waris:font-medium">Utang</span>
                    <input
                        type="number"
                        value={utang}
                        onChange={(e) => setUtang(Number(e.target.value))}
                        className="waris:mt-1 waris:block waris:w-full waris:rounded waris:border-gray-300 waris:shadow-sm 
                        waris:focus:ring-blue-500 waris:focus:border-blue-500 waris:p-2"
                        placeholder="Masukkan jumlah utang"
                        onFocus={e => e.target.value === "0" && (e.target.value = "")}
                        onBlur={e => e.target.value === "" && (e.target.value = "0")}
                    />
                </label>

                <label className="block">
                    <span className="waris:text-gray-700 waris:font-medium">Biaya Pemakaman</span>
                    <input
                        type="number"
                        value={biaya}
                        onChange={(e) => setBiaya(Number(e.target.value))}
                        className="waris:mt-1 waris:block waris:w-full waris:rounded waris:border-gray-300 waris:shadow-sm 
                        waris:focus:ring-blue-500 waris:focus:border-blue-500 waris:p-2"
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
