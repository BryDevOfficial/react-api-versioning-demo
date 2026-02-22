import { Package } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 flex justify-center items-center gap-3">
          <Package size={40} className="text-indigo-600" />
          Inventory Versioning
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* VERSION 1 CARD */}
        <Section title="Version 1 (Legacy)" endpoint="/api/v1/inventory" color="blue">
           <InventoryList version={1} />
        </Section>

        {/* VERSION 2 CARD */}
        <Section title="Version 2 (Modern)" endpoint="/api/v2/inventory" color="purple">
           <InventoryList version={2} />
        </Section>
      </div>
    </div>
  );
}

function InventoryList({ version }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:3001/api/${version === 1 ? 'v1' : 'v2'}/inventory`)
      .then(res => res.json())
      .then(setData);
  }, [version]);

  return (
    <div className="space-y-3">
      {data.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between">
          {/* Dinhi ang matching logic! */}
          <span className="font-semibold text-gray-700">
            {version === 1 ? item.name : item.productTitle}
          </span>
          <span className="text-indigo-600 font-mono">
            {version === 1 ? `qty: ${item.qty}` : `Stock: ${item.stock}`}
          </span>
        </div>
      ))}
    </div>
  );
}

function Section({ title, endpoint, color, children }) {
  const colors = {
    blue: "border-blue-500 text-blue-700",
    purple: "border-purple-500 text-purple-700"
  };
  return (
    <div className={`border-t-4 ${colors[color]} bg-white p-6 rounded-b-xl shadow-lg`}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <code className="block bg-gray-100 p-2 rounded text-sm mb-6">{endpoint}</code>
      {children}
    </div>
  );
}