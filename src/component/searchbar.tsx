import React from "react"

interface Props {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBar: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
  )
}

export default React.memo(SearchBar)
