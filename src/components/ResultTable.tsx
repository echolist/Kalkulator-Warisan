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
    <div className="waris:border waris:p-3 waris:rounded-md">
      <div className="waris:mb-2 waris:text-sm waris:text-gray-700">
        <strong>Total Aset:</strong> Rp {totalAssets.toLocaleString("id-ID")} <br />
        <strong>Total Warisan Bersih:</strong> Rp {totalWarisan.toLocaleString("id-ID")}
      </div>

      <button
        onClick={onCalculate}
        className="waris:bg-green-600 waris:hover:bg-green-500 waris:text-white waris:rounded waris:px-4 waris:py-2
        waris:transition-all waris:duration-200 waris:cursor-pointer"
      >
        💰 Hitung Warisan
      </button>

      {results.length > 0 && (
        <div className="waris:mt-4">
          <h3 className="waris:font-semibold waris:mb-2">📊 Hasil Pembagian:</h3>
          <table className="waris:w-full waris:border">
            <thead>
              <tr className="waris:bg-gray-100">
                <th className="waris:border waris:px-2 waris:py-1">Nama</th>
                <th className="waris:border waris:px-2 waris:py-1">Hubungan</th>
                <th className="waris:border waris:px-2 waris:py-1 waris:text-right">Bagian (Rp)</th>
                <th className="waris:border waris:px-2 waris:py-1">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td className="waris:border waris:px-2 waris:py-1">{r.name}</td>
                  <td className="waris:border waris:px-2 waris:py-1">{r.relation}</td>
                  <td className="waris:border waris:px-2 waris:py-1 waris:text-right">
                    {r.share.toLocaleString("id-ID")}
                  </td>
                  <td className="waris:border waris:px-2 waris:py-1">{r.note || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
