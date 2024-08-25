/* eslint-disable @typescript-eslint/no-explicit-any */
export interface setor {
  name: string
}
export interface Foto {
  foto: any
}
export interface Chamados {
  id: number,
  usuarioid: number,
  servico: string,
  contato: any; 
  itens: [
    {
      id: number,
      sistemaid: number,
      issuetype: string,
      aceito: boolean,
      cardId: string,
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

  id: number,
  issuetype: string,
  cardId: string,
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
  servico: string;
  itens: Chamado[]
}
export interface ChamdoId {
  id: number;
  usuarioid: number,
  servico: string,
  contato: any; 
  itens: Chamado[];
}
export interface ApiResponse {
  [x: string]: any;
  content: {
    id: number,
    usuario_logado: any,
    servico: string,
    itens: Chamado;
    contato: any; 
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


export interface chamadoNew {
  titulo: string;
  setor: string;
  sistemaid: number;
  usuario_logado: any;
  issuetype: string;
  patrimonio: string;
  equipamento: string;
  solicitacao: string,
  descricao: string;
  usuarioid: any;
  usuario: string;
  sistem_erro: string;
  erro: string
}
export interface sistemaNew {
  titulo: string;
  setor: string;
  sistemaid: number;
  issuetype: string;
  sistema: string;
  erro: string;
  solicitacao: string,
  descricao: string;
  usuarioid: any;
  usuario: string;
}
export interface user {
  name: string,
  lastname: string,
  email: string,
  setor: string,
  filial: number,
  imagem: string,
  contato: string

}

export interface chamadoNew {
  titulo: string;
  setor: string;
  sistemaid: number;
  issuetype: string;
  patrimonio: string;
  equipamento: string;
  solicitacao: string,
  descricao: string;
  usuarioid: any;
  usuario: string;
  sistem_erro: string;
  erro: string
}
export interface sistemaReset{
  usuarioid: any;
  usuario_logado: any;
  sistemaid: number;
  titulo: string;
  usuario: string;
  setor: string;
  issuetype: string;
  gmid: string;
  funcao: string;
  solicitacao: string,
  cpf: any,
  descricao: string;
  filial: any;
  data_nasc: string;
  data_admin: string
}
export interface user {
  name: string,
  lastname: string,
  email: string,
  setor: string,
  filial: number,
  imagem: string,
  contato: string

}
export interface botoes {
  id: number,
  name: string,
  titulo: string,
  imagem: string,
  options: [
    {
      id: number,
      name: any,
      titulo: string
    }
  ]
}