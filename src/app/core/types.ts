export interface setor{
    name:string
}
export interface Foto{
    foto:any
}
export interface Chamado {
    id: number;
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
  export interface ChamdoId{
    id: number;
      servico:string,
      itens: Chamado[];
  }
  export interface ApiResponse {
    content: {
      id: number;
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
  
    