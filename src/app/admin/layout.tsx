import React from "react"

export default function LayoutAdmin({children}: {children: React.ReactNode}){
    return(
        <body className="bg-[#1e1e1e] text-[#eee]">
            <div>ADMIN</div>
            {children}
        </body>
    )
}