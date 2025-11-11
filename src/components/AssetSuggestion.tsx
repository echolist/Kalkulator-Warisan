import type { Asset, Result, Suggestion } from "../types/inheritance";

type Props = {
    assets: Asset[];
    results: Result[];
};

export default function AssetSuggestion({ assets, results }: Props) {
    if (!assets.length || !results.length) return null;

    // 🚫 Skip aset yang berupa uang
    const nonCashAssets = assets.filter(
        (a) =>
            !/uang|tunai|cash|tabungan/i.test(a.name.trim())
    );

    if (!nonCashAssets.length)
        return (
            <p className="text-sm mt-4 italic text-gray-600">
                💰 Semua aset berupa uang — tidak perlu saran pembagian aset fisik.
            </p>
        );

    const sortedResults = [...results].sort((a, b) => b.share - a.share);
    const sortedAssets = [...nonCashAssets].sort((a, b) => b.value - a.value);

    const suggestions: Suggestion[] = [];
    let remaining = sortedResults.map((r) => ({
        ...r,
        remaining: r.share,
    }));

    for (const asset of sortedAssets) {
        const richest = remaining.sort((a, b) => b.remaining - a.remaining)[0];
        if (!richest) continue;

        suggestions.push({
            assetName: asset.name,
            assignedTo: richest.name,
            difference: richest.remaining - asset.value,
        });

        richest.remaining -= asset.value;
    }

    const totalPhysical = nonCashAssets.reduce((a, b) => a + b.value, 0);
    const totalValue = assets.reduce((a, b) => a + b.value, 0);
    const totalShare = results.reduce((a, b) => a + b.share, 0);
    const adjustment = totalShare - totalValue;

    return (
        <div className="waris:border waris:p-3 waris:rounded-md waris:mt-6">
            <h3 className="waris:font-semibold waris:mb-2">🏠 Saran Pembagian Aset Fisik</h3>

            <table className="waris:w-full border waris:text-sm">
                <thead>
                    <tr className="waris:bg-gray-100">
                        <th className="waris:border waris:px-2 waris:py-1">Aset</th>
                        <th className="waris:border waris:px-2 waris:py-1">Diusulkan Untuk</th>
                        <th className="waris:border waris:px-2 waris:py-1 waris:text-right">Selisih (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestions.map((s, i) => (
                        <tr key={i}>
                            <td className="waris:border waris:px-2 waris:py-1">{s.assetName}</td>
                            <td className="waris:border waris:px-2 waris:py-1">{s.assignedTo}</td>
                            <td
                                className={`waris:border waris:px-2 waris:py-1 waris:text-right ${s.difference > 0 ? "waris:text-green-600" : "waris:text-red-600"
                                    }`}
                            >
                                {s.difference > 0 ? "+" : ""}
                                {Math.round(s.difference).toLocaleString("id-ID")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="waris:text-xs mt-2 waris:text-gray-500">
                🔹 Total aset fisik yang disarankan dibagi:{" "}
                <strong>{totalPhysical.toLocaleString("id-ID")}</strong> rupiah.
            </p>

            {Math.abs(adjustment) > 1 && (
                <p className="waris:text-xs waris:text-gray-500">
                    ⚖️ Total perlu penyesuaian sekitar{" "}
                    <strong>{Math.round(adjustment).toLocaleString("id-ID")} rupiah</strong>{" "}
                    agar nilai aset dan warisan seimbang.
                </p>
            )}
        </div>
    );
}
