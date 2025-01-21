export default function LogOut() {
    localStorage.removeItem("token");
    window.location.href = "/log-in";

    return;
}
