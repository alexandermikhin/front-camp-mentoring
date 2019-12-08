function fillIn() {
    const movies = [];
    for (let i = 0; i < 100; i++) {
        movies.push({
            id: i.toString(),
            year: 1990 + (i / 5).toFixed(),
            title: `Movie title-${i}`,
            category: `category-${i % 3}`,
            annotation: `Movie ${i} annotation.`
        });
    }

    return movies;
}

export const movies = fillIn();