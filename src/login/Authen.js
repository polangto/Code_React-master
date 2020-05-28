let checkIsAuthenticated = () =>{
    if ( typeof(Storage) !== 'undefined') {
        if (sessionStorage.getItem("isAuthenticated") === null) {
            return false;
        }
        return true;
    } else {
        alert('Trình duyệt của bạn không hỗ trợ!');
    }
}
export const fakeAuth= {
    isAuthenticated:(typeof sessionStorage.getItem("isAuthenticated") === "undefined"?false:true),
    getIsAuthenticated(){
        if ( typeof(Storage) !== 'undefined') {
            if (typeof(sessionStorage.getItem("isAuthenticated")) === "undefined") {
                return false;
            }
            return true;
        } else {
            alert('Trình duyệt của bạn không hỗ trợ!');
        }
    },
    authenticate(){
        sessionStorage.setItem('isAuthenticated', true);
    },
    signout(){
        sessionStorage.removeItem('isAuthenticated');
        console.log("Sign Out");
    }
};
