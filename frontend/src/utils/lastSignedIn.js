const lastSignedIn = (date) => {
    const today = new Date();
    const lastSignedInDate = new Date(date);
    const timeDifference = today - lastSignedInDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}

export default lastSignedIn;