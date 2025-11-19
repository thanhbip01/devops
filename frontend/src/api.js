// frontend/src/api.js
const BASE_URL = "http://localhost:5000/api"; // đổi port nếu cần

export const getMaintenances = async () => {
  const res = await fetch(`${BASE_URL}/maintenance`);
  return res.json();
};

export const getMaintenance = async (id) => {
  const res = await fetch(`${BASE_URL}/maintenance/${id}`);
  return res.json();
};

export const createMaintenance = async (data) => {
  const res = await fetch(`${BASE_URL}/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateMaintenance = async (id, data) => {
  const res = await fetch(`${BASE_URL}/maintenance/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteMaintenance = async (id) => {
  const res = await fetch(`${BASE_URL}/maintenance/${id}`, { method: "DELETE" });
  return res.json();
};
    