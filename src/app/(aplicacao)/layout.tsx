import MenuNav from "@/src/components/principais/menu/menuNav"
import React from "react"
export default function LayoutPrincipal({children}: {children: React.ReactNode}){
    return(
        <body className="bg-[#FBFAFC] ">
            <MenuNav/>
            {children}
        </body>
    )
}
