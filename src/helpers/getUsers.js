export const getUsers = () => {
  return {
    user: localStorage.getItem("user") || null,
    desktop: localStorage.getItem("desktop") || null,
  };
};
