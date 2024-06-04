export function windowOpen(url, name, specs) {
    if (!url.match(/^https?:\/\//i)) {
        url = "http://" + url;
    }
    return window.open(url, name, specs);
}