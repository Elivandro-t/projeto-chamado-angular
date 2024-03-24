export interface setor{
    name:string
}
export interface Foto{
    foto:any
}
export interface Chamados {
  id:number,
  usuarioid:number,
  servico:string,
  itens:[
    {
    id:number,
    aceito:boolean,
    chamadoid:string,
    titulo: string;
    setor: string;
    patrimonio: string;
    equipamento: string;
    status: string;
    data: string;
    ativo: boolean;
    descricao: string;
    imagem: string;
    usuario_id: number;
    usuario: string;
    tecnicoid: number;
    tecnico_responsavel: string | null;
    }
  ]
  
}
export interface Chamado {
 
    id:number,
    servico:string,
      chamadoid:string,
      titulo: string;
      setor: string;
      patrimonio: string;
      equipamento: string;
      status: string;
      data: string;
      ativo: boolean;
      descricao: string;
      imagem: string;
      usuario_id: number;
      usuario: string;
      tecnicoid: number;
      tecnico_responsavel: string | null;
  }
  export interface ChamadoRes {
    id: number;
    servico:string;
    itens:Chamado[]
  }
  export interface ChamdoId{
    id: string;
      servico:string,
      itens: Chamado[];
  }
  export interface ApiResponse {
    content: {
      id:{
        id:number
      }
      servico:string,
      itens: Chamado;
    }[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  
    
export interface chamadoNew{
  titulo: string;
  setor: string;
  patrimonio: string;
  equipamento: string;
  solicitacao:string,
  descricao: string;
  usuarioid: number;
  usuario: string;
}
