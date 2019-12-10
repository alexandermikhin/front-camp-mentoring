function fillIn() {
  const movies = [];
  for (let i = 0; i < 100; i++) {
    movies.push({
      id: i.toString(),
      year: 1990 + Math.round(i / 5),
      title: `Movie title-${i}`,
      category: `category-${i % 3}`,
      annotation: `Movie ${i} annotation.`,
      imgUrl: "/placeholder.png",
      rating: (100 - i) / 100 * 5,
      duration: 144
    });
  }

  return movies;
}

const movies = fillIn();

export default movies;
