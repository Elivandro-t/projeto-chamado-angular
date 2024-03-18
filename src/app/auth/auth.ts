const key = 'token'
export const Auth = {
   
    setLogued(token: string) {
        localStorage.setItem("id", "1");
    },
    RemoveToken() {
        localStorage.removeItem(key);
    },
    returnToken() {
        return localStorage.getItem('id');
    },
    getLogued() {
        return this.returnToken() ? true : false;
    },
}