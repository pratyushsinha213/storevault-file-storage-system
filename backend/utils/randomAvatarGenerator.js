export const randomAvatarGenerator = () => {
    const randomColor = Math.floor(Math.random() * 100);
    return `https://avatar.iran.liara.run/public/${randomColor}`;
};