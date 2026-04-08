import Place from "#models/place";
import type {HttpContext} from '@adonisjs/core/http'

export default class PlacesController {
  async store(aiDescription: string, longitude: number, latitude: number) {
    var place = await Place.query()
                    .where("latitude", latitude)
                    .where("longitude", longitude);
    if (place == null) {
      place = await Place.create({
        latitude : latitude,
        longitude : longitude,
        aiDescription : aiDescription
      });
    }
    return place
  }
}