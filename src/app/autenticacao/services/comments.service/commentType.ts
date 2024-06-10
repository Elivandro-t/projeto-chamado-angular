export interface comment{
    id: number,
    chamadoid: number,
    itens: [
        {
            id: number,
            usuario: string,
            email: string,
            comments: string,
            userImagem: string

        }
    ]
}
export interface commentRegiste{

            usuario: string,
            email: string,
            comments: string,
            userImagem: string

}