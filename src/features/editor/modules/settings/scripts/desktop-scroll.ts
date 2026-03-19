export function desktopScrolltoCurrent(node: HTMLElement | null) {
  node?.scrollIntoView({
    inline: "nearest",
    behavior: "auto",
    block: "nearest",
  });
}
