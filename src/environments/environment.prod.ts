export const environment = {
  production: true,
  useServiceWorker: true,
  imageManagerDomain: '',

  useTestData: false,
  
  //API Urls
  apiAccountLogin: "/api/api/Token",
  apiNavigation: "/test_data/navigation.json",
  apiRecipeSearch: "/api/api//Recipe/Search",
  apiAccountCanActive: "/test_data/canActivate.txt",
  apiAccountData: "/test_data/account-data.json",
  apiRecipeOverview: "/api/api//Recipe/Overview",
  apiRecipeDetail: "/api/api/Recipe/Detail/",
  
  apiCmsRecipeOverview: "/api/api/Cms/Recipe/Overview",
  apiCmsRecipe: "/api/api/Cms/Recipe/",
  apiCmsMeasurements: "/api/api/Cms/Measurements",
  apiCmsIngredients: "/api/api/Cms/Ingredients",
  apiCmsUploadTeaserImage: "/api/api/Cms/UploadTeaserImage/",

  //Test URLs
  apiNavigationTest: "/test_data/navigation.json",
  apiRecipeSearchTest: "/test_data/recipe-search-result.json",
  apiAccountCanActiveTest: "/test_data/canActivate.txt",
  apiAccountDataTest: "/test_data/account-data.json",
  apiRecipeOverviewTest: "/test_data/recipe-overview.json",
};
