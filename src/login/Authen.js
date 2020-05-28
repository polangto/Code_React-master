export const fakeAuth = {
    isAuthenticated: false,
    authenticate() {
        fakeAuth.isAuthenticated = true;
    },
    signout() {
        fakeAuth.isAuthenticated = false;
        console.log("Sign Out");
    }
};