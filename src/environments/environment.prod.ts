export const environment = {
  production: true,
  useServiceWorker: true,
  imageManagerDomain: '',

  useTestData: false,
  
  //API Urls
  apiAccountLogin: "/api/api/Token",
  apiNavigation: "/test_data/navigation.json",
  apiRecipeSearch: "/test_data/recipe-search-result.json",
  apiAccountCanActive: "/test_data/canActivate.txt",
  apiAccountData: "/test_data/account-data.json",
  apiRecipeOverview: "/api/api//Recipe/Overview",
  apiRecipeDetail: "/api/Recipe/Detail/",
  
  //Test URLs
  apiNavigationTest: "/test_data/navigation.json",
  apiRecipeSearchTest: "/test_data/recipe-search-result.json",
  apiAccountCanActiveTest: "/test_data/canActivate.txt",
  apiAccountDataTest: "/test_data/account-data.json",
  apiRecipeOverviewTest: "/test_data/recipe-overview.json",
};
