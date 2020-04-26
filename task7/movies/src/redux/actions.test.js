import * as act from "./actions";

test("appSearch should create action for search", () => {
  const phrase = "phrase";
  const searchBy = "search-by";
  const result = act.appSearch(phrase, searchBy);
  expect(result).toEqual({
    type: "APP_SEARCH",
    payload: {
      searchPhrase: "phrase",
      searchBy: "search-by"
    }
  });
});

test("searchPhraseChange should create action for search phrase", () => {
  const phrase = "phrase";
  const result = act.searchPhraseChange(phrase);
  expect(result).toEqual({
    type: "SEARCH_PHRASE_CHANGE",
    payload: "phrase"
  });
});
