export const getInitialsFromName = (name) => {
    return name.split(" ")
        .filter(Boolean)
        .map((word) => word[0].toUpperCase())
        .slice(0, 2)
        .join("") || "";
}