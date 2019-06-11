

export function storeLocations(locations) {
  return { type: "ADD_LOCATIONS", locations }
}

export function storeCategories(categories) {
  return { type: "ADD_CATEGORIES", categories }
}

export function storeSearchLink(searchLink) {
  return { type: "ADD_SEARCHLINK", searchLink }
}

export function storeNewsSearch(newsLink){
  return {type: "ADD_NEWSSEARCHLINK", newsLink}
}

export function storeSearchQuery(searchQuery){
  return {type: "ADD_SEARCHQUERY", searchQuery}
}
