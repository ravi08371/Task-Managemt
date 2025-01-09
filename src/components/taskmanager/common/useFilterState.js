import { useQueryClient, useQuery } from "react-query";
const defaultFilterState = {
  searchTerm: "",
  category: "",
  dueDate: "",
};

// Custom hook for managing filter state
export const useFilterState = () => {
  const queryClient = useQueryClient();

  // Update filter state
  const updateFilter = (newFilters) => {
    queryClient.setQueryData(
      "filterState",
      (prevFilters = defaultFilterState) => ({
        ...prevFilters,
        ...newFilters,
      })
    );
  };

  // Fetch current filter state using `useQuery`
  const { data: filterState = defaultFilterState } = useQuery(
    "filterState",
    () => queryClient.getQueryData("filterState") || defaultFilterState
  );

  return { filterState, updateFilter };
};
