export const environment = {
  production: true,
  useServiceWorker: true,
  imageManagerDomain: '',

  //API Urls
  apiAccountLogin: "/api/api/Token",
  apiNavigation: "/api/api/Navigation/Load",
  apiRecipeSearch: "/api/api/Recipe/Search",
  apiRecipeOverview: "/api/api//Recipe/Overview",
  apiRecipeDetail: "/api/api/Recipe/Detail/",
  
  apiCmsRecipeOverview: "/api/api/Cms/Recipe/Overview",
  apiCmsRecipe: "/api/api/Cms/Recipe/",
  apiCmsDeleteRecipe: "/api/Cms/DeleteRecipe/",
  apiCmsMeasurements: "/api/api/Cms/Measurements",
  apiCmsIngredients: "/api/api/Cms/Ingredients",
  apiCmsUploadTeaserImage: "/api/api/Cms/UploadTeaserImage/"
};
