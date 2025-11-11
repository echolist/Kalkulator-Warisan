import React, { useState } from "react";
import InheritanceFlow from "./components/InheritanceFlow";
import type { Member, Result, Asset } from "./types/inheritance";
import AssetList from "./components/AssetList";
import MemberList from "./components/MemberList";
import ResultTable from "./components/ResultTable";
import WasiatUtangBiayaForm from "./components/WasiatUtangBiaya";
import AssetSuggestion from "./components/AssetSuggestion";

export const InheritanceCalculator: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [showDiagram, setShowDiagram] = useState(false);
  const [wasiat, setWasiat] = useState<number>(0);
  const [utang, setUtang] = useState<number>(0);
  const [biaya, setBiaya] = useState<number>(0);

  const totalAssets = assets.reduce((acc, a) => acc + (a.value || 0), 0);
  const totalWarisan = Math.max(totalAssets - wasiat - utang - biaya, 0);

  const roundToThousands = (num: number) => Math.round(num / 1000) * 1000;

  const calculate = () => {
    let remaining = totalWarisan;
    if (remaining <= 0) return alert("Tidak ada harta yang bisa dibagi.");

    const hasSon = members.some((m) => m.relation === "Anak Laki-laki");
    const hasDaughter = members.some((m) => m.relation === "Anak Perempuan");
    const hasChildren = hasSon || hasDaughter;

    const husband = members.find((m) => m.relation === "Suami");
    const wives = members.filter((m) => m.relation === "Istri");
    const father = members.find((m) => m.relation === "Ayah");
    const mother = members.find((m) => m.relation === "Ibu");

    const brother = members.filter((m) => m.relation === "Saudara Kandung Laki-laki");
    const sister = members.filter((m) => m.relation === "Saudara Kandung Perempuan");
    const halfBrother = members.filter((m) => m.relation === "Saudara Seibu Laki-laki");
    const halfSister = members.filter((m) => m.relation === "Saudara Seibu Perempuan");




    const shares: Result[] = [];

    // 1️⃣ Suami
    if (husband) {
      const share = roundToThousands(totalWarisan * (hasChildren ? 1 / 4 : 1 / 2));
      shares.push({ ...husband, share });
      remaining -= share;
    }

    // 2️⃣ Istri (bisa lebih dari satu)
    if (wives.length > 0) {
      const totalWifeShare = totalWarisan * (hasChildren ? 1 / 8 : 1 / 4);
      const perWife = roundToThousands(totalWifeShare / wives.length);
      wives.forEach((w) => shares.push({ ...w, share: perWife }));
      remaining -= totalWifeShare;
    }

    // 3️⃣ Ibu
    if (mother) {
      const hasSiblings =
        brother.length + sister.length + halfBrother.length + halfSister.length >= 2;
      let share = 0;
      if (hasChildren || hasSiblings) share = roundToThousands(totalWarisan * (1 / 6));
      else share = roundToThousands(totalWarisan * (1 / 3));
      shares.push({ ...mother, share });
      remaining -= share;
    }

    // 4️⃣ Ayah
    if (father) {
      let share = 0;
      let note = "";
      if (hasChildren) share = roundToThousands(totalWarisan * (1 / 6));
      else {
        // jika tidak ada anak → jadi asabah
        share = remaining;
        remaining = 0;
        note = "Sebagai asabah (sisa warisan)";
      }
      share = roundToThousands(share);
      shares.push({ ...father, share, note });
      remaining -= share;
    }

    // 5️⃣ Anak-anak
    const sons = members.filter((m) => m.relation === "Anak Laki-laki");
    const daughters = members.filter((m) => m.relation === "Anak Perempuan");

    if (sons.length === 0 && daughters.length === 1 && remaining > 0) {
      const share = roundToThousands(totalWarisan * (1 / 2));
      shares.push({ ...daughters[0], share });
      remaining -= share;
    } else if (sons.length === 0 && daughters.length > 1 && remaining > 0) {
      const totalShare = totalWarisan * (2 / 3);
      const perDaughter = roundToThousands(totalShare / daughters.length);
      daughters.forEach((d) => shares.push({ ...d, share: perDaughter }));
      remaining -= totalShare;
    } else if (hasChildren && remaining > 0) {
      const totalPortion = sons.length * 2 + daughters.length * 1;
      sons.forEach((s) => {
        shares.push({ ...s, share: (roundToThousands(remaining * 2 / totalPortion)) });
      });
      daughters.forEach((d) => {
        shares.push({ ...d, share: roundToThousands(remaining / totalPortion) });
      });
      remaining = 0;
    }

    // 6️⃣ Saudara (jika tidak ada anak & tidak ada ayah)
    const canInheritBrothers = !hasChildren && !father;
    if (canInheritBrothers && remaining > 0) {
      // Saudara seibu
      if (halfBrother.length + halfSister.length > 0) {
        const count = halfBrother.length + halfSister.length;
        if (count === 1) {
          const share = roundToThousands(totalWarisan * (1 / 6));
          const person = halfBrother[0] || halfSister[0];
          shares.push({ ...person, share });
          remaining -= share;
        } else {
          const totalShare = totalWarisan * (1 / 3);
          const perPerson = roundToThousands(totalShare / count);
          [...halfBrother, ...halfSister].forEach((p) =>
            shares.push({ ...p, share: perPerson })
          );
          remaining -= totalShare;
        }
      }

      // Saudara kandung (asabah)
      if (remaining > 0 && (brother.length > 0 || sister.length > 0)) {
        const totalPortion = roundToThousands(brother.length * 2 + sister.length * 1);
        brother.forEach((b) =>
          shares.push({ ...b, share: (remaining * 2) / totalPortion })
        );
        sister.forEach((s) =>
          shares.push({ ...s, share: remaining / totalPortion })
        );
        remaining = 0;
      }
    }

    // 7️⃣ Tandai yang terhalang (mahjub)
    members.forEach((m) => {
      const isSibling =
        m.relation.includes("Saudara Kandung") ||
        m.relation.includes("Saudara Seibu");
      if (isSibling && (hasChildren || father)) {
        // kalau ada anak / ayah, saudara terhalang
        shares.push({
          ...m,
          share: 0,
          note: "Terhalang oleh anak atau ayah",
        });
      }
    });

    setResults(shares);
  };

  return (
    <div className="waris:p-6 waris:max-w-3xl waris:mx-auto waris:space-y-4">
      <h1 className="waris:text-2xl waris:font-bold waris:mb-4">🕌 Kalkulator Warisan Islam (Faraidh)</h1>

      <AssetList assets={assets} setAssets={setAssets} />

      <WasiatUtangBiayaForm
        wasiat={wasiat}
        utang={utang}
        biaya={biaya}
        setWasiat={setWasiat}
        setUtang={setUtang}
        setBiaya={setBiaya}
      />

      <MemberList members={members} setMembers={setMembers} relations="Ibu" />

      <ResultTable
        results={results}
        totalAssets={totalAssets}
        totalWarisan={totalWarisan}
        onCalculate={calculate}
      />

      <AssetSuggestion assets={assets} results={results} />

      <button
        onClick={() => setShowDiagram(!showDiagram)}
        className="waris:bg-purple-600 waris:hover:bg-purple-500 waris:text-white waris:px-4 waris:py-2 waris:rounded
        waris:transition-all waris:duration-200 waris:cursor-pointer"
      >
        {showDiagram ? "Sembunyikan Diagram" : "Tampilkan Diagram"}
      </button>

      {showDiagram && (
        results.length > 0 && (
          <>
            <h3 className="waris:font-semibold waris:mt-4">Diagram Silsilah:</h3>
            <InheritanceFlow total={totalAssets} results={results} />
          </>
        ))}
    </div>
  );
};
