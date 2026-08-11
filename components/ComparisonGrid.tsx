export default function ComparisonGrid({
  columns,
  rows,
}: {
  columns: [string, string]
  rows: { label: string; col1: string; col2: string }[]
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="grid grid-cols-3">
        <div className="bg-[#9185FF] px-5 py-3" />
        <div className="bg-[#9185FF] px-5 py-3 text-white font-bold font-slab text-center">
          {columns[0]}
        </div>
        <div className="bg-[#9185FF] px-5 py-3 text-white font-bold font-slab text-center">
          {columns[1]}
        </div>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${i < rows.length - 1 ? 'border-b border-gray-200' : ''}`}
        >
          <div className="px-5 py-4 font-bold font-slab text-black">{row.label}</div>
          <div className="px-5 py-4 text-gray-700 font-flex text-center">{row.col1}</div>
          <div className="px-5 py-4 text-gray-700 font-flex text-center">{row.col2}</div>
        </div>
      ))}
    </div>
  )
}
