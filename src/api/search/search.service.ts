import { Request, Response } from 'express';
import { OpenCageDataProviderService } from './providers/OpenCageDataProvider';
import bodyParser from "body-parser";

export class SearchService {

  constructor() {}

  public getPlacesByName(req: Request, res: Response) {
    // let openCageDataProviderService= new OpenCageDataProviderService;
    // const q: string = req.query.q;
    // console.log(`Param is: ${q}`);
    // if (q.length < 3) {
    //   return {
    //     type: 'FeatureCollection',
    //     features: [],
    //   };
    // }
    // const response  = openCageDataProviderService.getPlaces(q);
    // let resp :any;
   
    // return response;
    return null;
  };
}
