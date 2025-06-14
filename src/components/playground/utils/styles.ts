
export const getCategoryColor = (category: string) => {
  const colors = {
    automation: "bg-blue-100 text-blue-800",
    document: "bg-green-100 text-green-800",
    entertainment: "bg-purple-100 text-purple-800",
    creative: "bg-pink-100 text-pink-800",
    content: "bg-orange-100 text-orange-800",
    education: "bg-indigo-100 text-indigo-800",
    productivity: "bg-yellow-100 text-yellow-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export const getStatusColor = (status: string) => {
  const colors = {
    pending: "bg-gray-100 text-gray-700",
    running: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700"
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};
