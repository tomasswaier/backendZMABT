import Place from "#models/place";
import type {HttpContext} from '@adonisjs/core/http'

export default class PlacesController {
  async store(longitude: number, latitude: number) {
    const place = await Place.firstOrCreate(
        {latitude : latitude},
        {longitude : longitude},
    )
    return place
  }
}