import type { Result } from "../types/inheritance";

interface Props {
  results: Result[];
  totalAssets: number;
  totalWarisan: number;
  onCalculate: () => void;
}

export default function ResultTable({
  results,
  totalAssets,
  totalWarisan,
  onCalculate,
}: Props) {
  return (
    <div className="border p-3 rounded-md">
      <div className="mb-2 text-sm text-gray-700">
        <strong>Total Aset:</strong> Rp {totalAssets.toLocaleString("id-ID")} <br />
        <strong>Total Warisan Bersih:</strong> Rp {totalWarisan.toLocaleString("id-ID")}
      </div>

      <button
        onClick={onCalculate}
        className="bg-green-600 text-white rounded px-4 py-2"
      >
        💰 Hitung Warisan
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">📊 Hasil Pembagian:</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Nama</th>
                <th className="border px-2 py-1">Hubungan</th>
                <th className="border px-2 py-1 text-right">Bagian (Rp)</th>
                <th className="border px-2 py-1">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{r.name}</td>
                  <td className="border px-2 py-1">{r.relation}</td>
                  <td className="border px-2 py-1 text-right">
                    {r.share.toLocaleString("id-ID")}
                  </td>
                  <td className="border px-2 py-1">{r.note || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
