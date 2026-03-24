import { motion } from "motion/react";
import { useColors } from "./ThemeContext";
import { Search } from "lucide-react";
import { useState } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  hideOnMobile?: boolean;
  primary?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: string;
  title?: string;
  action?: React.ReactNode;
  renderMobileItem?: (item: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({ columns, data, searchKey, title, action, renderMobileItem }: DataTableProps<T>) {
  const c = useColors();
  const [search, setSearch] = useState("");

  const filtered = searchKey
    ? data.filter((item) => String(item[searchKey]).toLowerCase().includes(search.toLowerCase()))
    : data;

  const mobileColumns = columns.filter(col => !col.hideOnMobile);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 p-4 lg:p-5" style={{ borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center justify-between">
          {title && <h3 style={{ fontSize: 15, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>{title}</h3>}
          {action}
        </div>
        {searchKey && (
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: c.textFaint }} />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
              style={{ fontSize: 14, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }}
            />
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="lg:hidden">
        {filtered.map((item, i) => (
          <div
            key={item.id || i}
            className="px-4 py-3.5 active:bg-opacity-80"
            style={{ borderBottom: `1px solid ${c.border}` }}
          >
            {renderMobileItem ? (
              renderMobileItem(item)
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1.5">
                  {mobileColumns.map((col, ci) => (
                    <div key={col.key}>
                      {ci === 0 ? (
                        <div style={{ fontSize: 14, fontWeight: 500, color: c.text }}>
                          {col.render ? col.render(item) : item[col.key]}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2" style={{ fontSize: 12.5, color: c.textMuted }}>
                          {col.render ? col.render(item) : (
                            <span><span style={{ color: c.textFaint }}>{col.label}: </span>{item[col.key]}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10" style={{ color: c.textFaint, fontSize: 13 }}>
            Nenhum resultado encontrado.
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.border}` }}>
              {columns.map((col) => (
                <th key={col.key} className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <motion.tr
                key={item.id || i}
                className="transition-colors cursor-pointer"
                style={{ borderBottom: `1px solid ${c.border}` }}
                whileHover={{ backgroundColor: c.bgCardHover }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5" style={{ fontSize: 13.5, color: c.text }}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-10" style={{ color: c.textFaint, fontSize: 13 }}>
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
