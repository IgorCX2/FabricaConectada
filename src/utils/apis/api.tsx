import { fetchFromAPI } from "./conexao"

export async function carregarPermissoesDepartamento(departamento) {
    return await fetchFromAPI(`/api/sistema/menu-departamento?departamento=${departamento}`, {
        cache: "no-store",
    })
}

export async function usuariosDepartamento(departamento, fabrica) {
    return await fetchFromAPI(`/api/auth/usuarios?status=aprovar.${departamento}.${fabrica}&departamento=${departamento}`, {
        cache: "no-store",
    })
}

export async function cargosDepartamento(departamento) {
    return await fetchFromAPI(`/api/sistema/cargos?departamento=${departamento}`, {
        cache: "no-store",
    })
}

export async function carregarTodosDepartamento() {
    return await fetchFromAPI(`/api/sistema/departamentos`, {
        cache: "force-cache",
    })
}

export async function buscarMenuId(btnID) {
    return await fetchFromAPI(`/api/sistema/menu/${btnID}`, {
        cache: "force-cache",
    })
}

export async function buscarFichas(planta) {
    return await fetchFromAPI(`/api/qualidade/buscar-ficha/${planta}`, {
        cache: "no-store",
    })
}
export async function atualizarFichaSic(id, campo, valor) {
    return await fetchFromAPI(`/api/qualidade/atualizar-ficha`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, campo, valor })
    })
}

export async function atualizarUser(dados) {
    return await fetchFromAPI(`/api/auth/atualizar-usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
}