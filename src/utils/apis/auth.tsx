import { fetchFromAPI } from "./conexao";

export async function loginUsuario(data) {
  return await fetchFromAPI(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
}

export async function cadastroUsuario(data) {
  return await fetchFromAPI(`/api/auth/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
