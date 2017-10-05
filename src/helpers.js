export function requireAuth() {
    if (!localStorage.jwt) {
        return false;
    }
    return true;
}