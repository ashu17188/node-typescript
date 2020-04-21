import { Request, Response } from 'express';
import { OpenCageDataProviderService } from './providers/OpenCageDataProvider';

export class SearchService {

  private openCageDataProviderService: OpenCageDataProviderService;

  constructor() {
    this.openCageDataProviderService = new OpenCageDataProviderService();
  }

  public getPlacesByName(req: Request, res: Response) {
    let q = req.query.q;
    console.log(`Param is: ${q}`);
    if (q.length < 3) {
      return {
        type: 'FeatureCollection',
        features: [],
      };
    }
    return res.json(new OpenCageDataProviderService().getPlaces(q));
    //return new OpenCageDataProviderService().getPlaces(q);

  };

}

// export const getPlacesByName = async (q: string) => {
//   if (q.length < 3) {
//     return {
//       type: 'FeatureCollection',
//       features: [],
//     };
//   }

//   return getPlaces(q);
// };
