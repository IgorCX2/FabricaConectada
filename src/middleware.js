import { NextResponse, NextRequest } from "next/server"

export default function middleware(request) {
    const urlHome = new URL('/home', request.url)
    const urlInicial = new URL ('/', request.url)
    const valueTokenUser = request.cookies.get('UserToken')?.value
    const valueTokenSession = request.cookies.get('TokenSessionEmpresa')?.value

    console.log(request)
    
    if(!valueTokenUser && (request.nextUrl.pathname != '/' && request.nextUrl.pathname != '/empresa')){
        console.log("criarSessao")
        return NextResponse.redirect(urlInicial)
    }
    if(valueTokenUser && (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/empresa')){
        return NextResponse.redirect(urlHome)
        console.log("criarSessao")
    }

    if (!valueTokenUser && request.nextUrl.pathname != '/empresa') {
        return fetch('http://localhost:8080/api/sistemaLogin/empresaBuscar', {
            method: 'POST',
          
        })
        .then(response => response.json())
        .then(data => {
            console.log('Você será redirecionado para a empresa:', data);
            const urlEmpresa = new URL('/empresa', request.url)
            const newResponse = NextResponse.redirect(urlEmpresa);
            newResponse.headers.set('chavedeIdentificacaoUnica', "ola");
            console.log('Resultado do fetch:', data);
            return newResponse;
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição VALIDAR USUARIO:', error);
            return NextResponse.next();
        });
    }
}
export const config = {
    matcher: ['/:path*']
}