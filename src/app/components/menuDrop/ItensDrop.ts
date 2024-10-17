
export const Itens = [
    {
        routerLink:"/lista",
        icon:"assets/lista.png",
        name:"Meus chamados",
        class:"li",
        role:["user","admin","suporte","dev"]
    },
    {
        routerLink:"/lista/aprovacoes/pendentes",
        icon:"assets/arquivo.png",
        name:"Aprovações",
        class:"li",
        role:["admin","suporte","dev","user"]
    },
    {
        routerLink:"/meuchamado/aceito",
        icon:"assets/aceito.png",
        name:"Atendimentos",
        class:"li",
        role:["admin","suporte","dev"]
    },
    {
        routerLink:"/lista/admin",
        icon:"assets/solicitacao.png",
        name:"Solicitações",
        class:"li",
        role:["admin","suporte","dev"]
    },
    {
        routerLink:"/lista/chamados/filiais",
        icon:"assets/all.png",
        name:"Solicitações Gerais",
        class:"li",
        role:["suporte"]
    }
];