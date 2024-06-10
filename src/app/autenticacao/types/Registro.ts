export interface Registro{
    name: string,
    lastname: string,
    setor: string,
    email: string,
    password: string,
    perfil: [
        {
            perfil: string
        }
    ]
}