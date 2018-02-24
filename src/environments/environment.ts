export const environment = {
  production: false,
  useServiceWorker: true,
  imageManagerDomain: 'http://localhost:8005',

  useTestData: false,

  //API Urls
  apiAccountLogin: "http://localhost:8030/api/Token",
  apiNavigation: "/test_data/navigation.json",
  apiRecipeSearch: "http://localhost:8030/api/Recipe/Search",
  apiAccountCanActive: "/test_data/canActivate.txt",
  apiAccountData: "/test_data/account-data.json",
  apiRecipeOverview: "http://localhost:8030/api/Recipe/Overview",
  apiRecipeDetail: "http://localhost:8030/api/Recipe/Detail/",
  
  apiCmsRecipeOverview: "http://localhost:8030/api/Cms/Recipe/Overview",
  apiCmsRecipe: "http://localhost:8030/api/Cms/Recipe/",

  //Test URLs
  apiNavigationTest: "/test_data/navigation.json",
  apiRecipeSearchTest: "/test_data/recipe-search-result.json",
  apiAccountCanActiveTest: "/test_data/canActivate.txt",
  apiAccountDataTest: "/test_data/account-data.json",
  apiRecipeOverviewTest: "/test_data/recipe-overview.json",
};
