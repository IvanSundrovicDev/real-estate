
const initialState = {
  categories:[],
  locations:[],
  searchQuery:{category:"", location:"", minSize:0, maxSize:0, minPrice:0, maxPrice:0, maxPriceLimit:0, maxSizeLimit:0},
  searchLink: '',
  newsLink:''
};


export function addFromApiToStore(state = initialState, action) {
  switch (action.type){
    case "ADD_LOCATIONS":
      return Object.assign({}, state, {
        locations: action.locations
      })

    case "ADD_CATEGORIES":
      return Object.assign({}, state, {
        categories: action.categories
      })

    case "ADD_SEARCHLINK":
      return Object.assign({}, state, {
        searchLink: action.searchLink
      })

    case "ADD_NEWSSEARCHLINK":
      return Object.assign({}, state, {
        newsLink: action.newsLink
      })

    case "ADD_SEARCHQUERY":
      return Object.assign({}, state, {
        searchQuery: action.searchQuery
      })

    default:
      return state
  }
}
