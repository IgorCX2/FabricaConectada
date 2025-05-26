import React from "react"
import MenuNav from "../../components/menu/menuNav"

export default function LayoutPrincipal({children}: {children: React.ReactNode}){
    return(
        <body className="bg-[#FBFAFC] ">
            <MenuNav/>
            {children}
        </body>
    )
}