import { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface ProductTabsProp {
  description: string;
}

export default function ProductTabs({ description }: ProductTabsProp) {
  const tabs: Tab[] = [
    {
      label: "Описание",
      value: "description",
      content: <p>{description}</p>,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="flex flex-col mt-5">
      <div className="flex gap-4 border-b px-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-2 border-b-2 transition-all ${
              activeTab === tab.value
                ? "border-blue-500 font-semibold"
                : "border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{
          duration: 0.3,
        }}
        className="p-4"
      >
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </motion.div>
    </div>
  );
}
