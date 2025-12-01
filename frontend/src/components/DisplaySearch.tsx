import type { NotaFiscal } from "../entities/NotaFiscal";
import { ColumnMap } from "../entities/ColumnMap";

interface DisplaySearchProps {
    results: NotaFiscal[];
}


function DisplaySearch({ results }: DisplaySearchProps) {
    if (!results || results.length === 0) {
        return <div>Nenhum resultado encontrado.</div>;
    }

    return (
        <table border={1} cellPadding={5}>
            <thead>
                <tr>
                    {ColumnMap.map((title, index) => (
                        <th key={index}>{title}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {results.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((val, i) => (
                            <td key={i}>{String(val)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DisplaySearch;