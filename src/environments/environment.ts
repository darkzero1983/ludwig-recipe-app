export const environment = {
  production: false,
  useServiceWorker: true,
  imageManagerDomain: 'http://localhost:8005/media/LudwigsRezepte/',
  
  //API Urls
  apiAccountLogin: "http://localhost:8030/api/Token",
  apiNavigation: "http://localhost:8030/api/Navigation/Load",
  apiRecipeSearch: "http://localhost:8030/api/Recipe/Search",
  apiRecipeOverview: "http://localhost:8030/api/Recipe/Overview",
  apiRecipeDetail: "http://localhost:8030/api/Recipe/Detail/",
  
  apiCmsRecipeOverview: "http://localhost:8030/api/Cms/Recipe/Overview",
  apiCmsRecipe: "http://localhost:8030/api/Cms/Recipe/",
  apiCmsDeleteRecipe: "http://localhost:8030/api/Cms/DeleteRecipe/",
  apiCmsMeasurements: "http://localhost:8030/api/Cms/Measurements",
  apiCmsIngredients: "http://localhost:8030/api/Cms/Ingredients",
  apiCmsUploadTeaserImage: "http://localhost:8030/api/Cms/UploadTeaserImage/",
};
