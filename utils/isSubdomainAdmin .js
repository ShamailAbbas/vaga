const isSubdomainAdmin = () => {
  const host = window.location.hostname;
  const subdomain = host.split(".")[0];

  return subdomain.toLowerCase() === "admin";
};
export default isSubdomainAdmin;
