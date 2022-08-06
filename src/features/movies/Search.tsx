import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configuredAxios from "../../axios/axios";
import { VerticalList } from "./VerticalList";
import { NotFound } from "./NotFound";

export const Search = () => {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const fetchSearchResults = async (page: number, searchQuery: string | undefined) => {
    return await configuredAxios.get(`search/movie`, {
      params: {
        query: searchQuery,
        page: page
      }
    })
  }

  useEffect(() => {
    if (totalPages === undefined || currentPage <= totalPages) {
      fetchSearchResults(currentPage, searchQuery)
        .then(result => {
          setSearchResults([...searchResults, ...result.data.results])

          if (totalPages === undefined) setTotalPages(result.data.total_pages)
          setCurrentPage(currentPage + 1);


        });
    }
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(undefined);
    setSearchResults([])
    console.log("reset")
  }, [searchQuery])

  console.log(searchResults);

  if (searchResults.length === 0) return (
    <NotFound />
  )
  return (
    <VerticalList items={searchResults} />
  )
}