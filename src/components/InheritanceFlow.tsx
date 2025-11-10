import { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import type { Result } from "../types/inheritance";

interface Props {
    total: number;
    results: Result[];
}

export default function InheritanceFlow({ total, results }: Props) {
    const nodes = useMemo(() => {
        // --- 1. Buat node root (pusaka) ---
        const nodes = [
            {
                id: "root",
                data: {
                    label: (
                        <div className="text-center">
                            💰 <b>Total Harta</b>
                            <div>Rp {total.toLocaleString("id-ID")}</div>
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                style: {
                    border: "2px solid #94a3b8",
                    borderRadius: 10,
                    padding: 10,
                    background: "#f8fafc",
                    width: 200,
                },
            },
        ];

        // --- 2. Bagi berdasarkan hubungan ---
        const parents = results.filter(r =>
            ["Ayah", "Ibu"].includes(r.relation)
        );
        const spouse = results.filter(r =>
            ["Istri", "Suami"].includes(r.relation)
        );
        const children = results.filter(r =>
            r.relation.toLowerCase().includes("anak")
        );

        let yStep = 150;

        // --- 3. Tambahkan node orang tua (di atas) ---
        parents.forEach((p, i) => {
            nodes.push({
                id: p.id.toString(),
                data: {
                    label: (
                        <div className="text-center">
                            👨‍👩‍👧‍👦 {p.name} <br />
                            <small>{p.relation}</small>
                            <div>Rp {Math.round(p.share).toLocaleString("id-ID")}</div>
                        </div>
                    ),
                },
                position: { x: (i - (parents.length - 1) / 2) * 250, y: -yStep },
                style: {
                    border: "1px solid #cbd5e1",
                    borderRadius: 10,
                    padding: 10,
                    background: "#e0f2fe",
                    width: 180,
                },
            });
        });

        // --- 4. Tambahkan pasangan (sejajar dengan root) ---
        spouse.forEach((s, i) => {
            nodes.push({
                id: s.id.toString(),
                data: {
                    label: (
                        <div className="text-center">
                            ❤️ {s.name} <br />
                            <small>{s.relation}</small>
                            <div>Rp {Math.round(s.share).toLocaleString("id-ID")}</div>
                        </div>
                    ),
                },
                position: { x: (i + 1) * 250, y: 0 },
                style: {
                    border: "1px solid #cbd5e1",
                    borderRadius: 10,
                    padding: 10,
                    background: "#fef9c3",
                    width: 180,
                },
            });
        });

        // --- 5. Tambahkan anak-anak (di bawah) ---
        children.forEach((c, i) => {
            nodes.push({
                id: c.id.toString(),
                data: {
                    label: (
                        <div className="text-center">
                            👶 {c.name} <br />
                            <small>{c.relation}</small>
                            <div>Rp {Math.round(c.share).toLocaleString("id-ID")}</div>
                        </div>
                    ),
                },
                position: { x: (i - (children.length - 1) / 2) * 250, y: yStep },
                style: {
                    border: "1px solid #cbd5e1",
                    borderRadius: 10,
                    padding: 10,
                    background: "#dcfce7",
                    width: 180,
                },
            });
        });

        return nodes;
    }, [results, total]);

    // --- Buat edges otomatis ---
    const edges = useMemo(() => {
        const edges: any[] = [];
        const parentIds = results.filter(r =>
            ["Ayah", "Ibu"].includes(r.relation)
        ).map(r => r.id.toString());
        const spouseIds = results.filter(r =>
            ["Istri", "Suami"].includes(r.relation)
        ).map(r => r.id.toString());
        const childIds = results.filter(r =>
            r.relation.toLowerCase().includes("anak")
        ).map(r => r.id.toString());

        // Hubungkan root dengan semuanya
        parentIds.forEach(id => edges.push({ id: `e-root-${id}`, source: id, target: "root" }));
        spouseIds.forEach(id => edges.push({ id: `e-root-${id}`, source: "root", target: id }));
        childIds.forEach(id => edges.push({ id: `e-root-${id}`, source: "root", target: id }));

        return edges;
    }, [results]);

    return (
        <div style={{ height: 500 }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
