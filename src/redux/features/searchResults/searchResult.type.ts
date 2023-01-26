export interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  matched_substrings: MainTextMatchedSubstrings[];
  place_id: string;
  reference: string;
  terms: { offset: number; value: string }[];
  types: string[];
  category?: string;
}

export type SearchResultInitialState = {
  searchResultsLoading: boolean;
  searchResults: PlaceType[];
  searchResultsError: string;
};

export type FetchSearchResultsParamsType = {
  apiService: any;
  request: { input: string };
  callback: (results?: readonly PlaceType[]) => void;
};
