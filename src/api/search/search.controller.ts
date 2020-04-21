import { SearchService } from "./search.service";

export class SearchController{

    private searchService: SearchService;

    constructor(private app: any) {
      this.searchService = new SearchService();
      this.routes();
    }
  
    public routes() {
      this.app.route("/api/v1/search").get(this.searchService.getPlacesByName);
    
    }
}