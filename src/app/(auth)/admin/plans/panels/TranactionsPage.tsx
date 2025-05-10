import DynamicTable from "@/components/tables/DTable";
import DataTable from "@/components/UI/data-table";
import { ColumnConfig } from "@/types";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type InvoiceRecord = {
  id: number;
  updated_at: string;
  invoice: number;
  avatar?: string;
  plan: string;
  name: string;
  payment: string;
  amount: number;
  status: string;
  recipt: number;
};
// transactions dummy data
const transaction: InvoiceRecord[] = [
  {
    id: 1,
    updated_at: "13 July, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
  {
    id: 2,
    updated_at: "13 July, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
  {
    id: 3,
    updated_at: "22 September, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
  {
    id: 4,
    updated_at: "30 October, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
];
// transactions columns
const columns: ColumnConfig<InvoiceRecord>[] = [
  {
    header: "#",
    render: (_transaction: InvoiceRecord, index: number) => (
      <span>{index + 1}</span>
    ),
  },
  {
    header: "Date",
    render: (transaction: InvoiceRecord) => {
      const formattedDate = new Date(transaction.updated_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      );

      return <span className="text-sm">{formattedDate || "-"}</span>;
    },
  },
  {
    key: "plan",
    header: "plan",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.plan || "-"}</span>;
    },
  },
  {
    header: "employer",
    render: (transaction: InvoiceRecord) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            className="h-9 w-9 rounded-full object-cover"
            src={transaction?.avatar || "/images/avatar-placeholder.png"}
            alt={transaction.name}
            width={200}
            height={200}
          />
          <span className="text-sm">{transaction.name}</span>
        </div>
      );
    },
  },
  {
    header: "Payment Method",
    render: (transaction: InvoiceRecord) => {
      return (
        <span className="text-center text-sm">
          {transaction.payment || "-"}
        </span>
      );
    },
  },
  {
    key: "amount",
    header: "Amount",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.amount || "-"}</span>;
    },
  },
  {
    key: "status",
    header: "Status",
    render: (transaction: InvoiceRecord) => {
      return (
        <span
          className={`rounded-lg border px-3 py-1 text-xs ${
            transaction.status.toLowerCase() === "active"
              ? "border-green-500 bg-green-50 text-green-700 ring-green-600/20"
              : "border-red-500 bg-red-50 text-red-700 ring-red-600/10"
          }`}
        >
          {transaction.status}
        </span>
      );
    },
  },
  {
    header: "Receipt",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.recipt || "-"}</span>;
    },
  },
  {
    header: "Action",
    render: () => (
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white transition hover:bg-blue-700">
          <Eye size={17} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white transition hover:bg-green-700">
          <Download size={17} />
        </button>
      </div>
    ),
  },
];

const TranactionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<(number | string)[]>([]);

  const filteredemployers = transaction?.filter((transaction) => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      transaction.name.toLowerCase().includes(query) ||
      transaction.plan?.toLowerCase().includes(query) ||
      transaction.payment.toLowerCase().includes(query);

    return searchMatch;
  });
  return (
    <div className="space-y-4 rounded-xl border bg-white p-3 shadow-soft">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-lg font-semibold">All Transactions</h2>
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      {/* Table */}
      <DataTable<InvoiceRecord>
        data={filteredemployers}
        columns={columns}
        isSelectable
        searchQuery={searchQuery}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};
export default TranactionsPage;
