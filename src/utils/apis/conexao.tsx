const getBaseURL = () => {
  const baseURL =
    typeof window === "undefined"
      ? process.env.API_INTERNAL_URL
      : process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseURL) {
    throw new Error("Base URL não definida nas variáveis de ambiente");
  }

  return baseURL;
};

export async function fetchFromAPI(path: string, options: RequestInit = {}) {
  const baseURL = getBaseURL();
  const headers = new Headers(options.headers || {});
  let token: string | undefined;
  const response = {
        error: false,
        msg: ''
      }
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const allCookies = await cookies();
    token = allCookies.get("token")?.value;
  } else {
    token = localStorage.getItem("token") || undefined;
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  try {
    const res = await fetch(`${baseURL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
    const dataResponse = await res.json();

    return dataResponse;
  } catch (err) {
    alert("Erro de conexão com o servidor.");
    return;
  }
}
