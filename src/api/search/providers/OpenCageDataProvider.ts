import request from "request-promise";
import dotenv from "dotenv";

dotenv.config();

export class OpenCageDataProviderService {

  constructor() { }

  public getPlaces(query: string) {
    const key = process.env.OPEN_CAGE_DATA_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`;
    console.log(`url : ${url}`);
    return request(url);
  };

}
