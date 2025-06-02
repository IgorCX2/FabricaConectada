import { buscarMenuId } from "@/src/utils/apis/api";

export default async function UserButtons({btnID }) {
    const menu =  await buscarMenuId(btnID)
    return (
        <span style={{ backgroundColor: menu.cor || '#eee', color: '#333' }} className="inline-block px-2 py-1 text-xs font-medium rounded-full">{menu.nomeMenu}</span>
    );
}
