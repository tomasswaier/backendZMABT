import Place from "#models/place";
import Post from "#models/post";
import {placeGetValidator} from '#validators/place'
import type {HttpContext} from '@adonisjs/core/http'

// anyone questions why I have a services for stuff i dont need and controllers
// in place of services I do need I'll remove your G spot
export default class PlacesController {
  static async store(aiDescription: string, longitude: number,
                     latitude: number) {
    var place = await this.get(longitude, latitude)

    if (place == undefined || place.length == 0) {
      return await Place.create({
        latitude : latitude,
        longitude : longitude,
        aiDescription : aiDescription
      });
    }
    return place[0]
  }
  static async get(longitude: number, latitude: number) {
    return await Place.query()
        .where("latitude", latitude)
        .where("longitude", longitude)
        .limit(1);
  }
  async getInfo({request, response}: HttpContext) {
    const data = await request.validateUsing(placeGetValidator)
    var place = null
    if (data.placeId) {
      place = await Place.find(data.placeId)
    }
    else if (data.latitude && data.longitude) {

      place = await Place.query()
                  .where("latitude", data.latitude)
                  .where("longitude", data.longitude)
                  .limit(1);
      if (place.length > 0) {
        place = place[0]
      } else {
        place = null
      }
    }
    const rating = await this.getRating(place)
    return response.ok({place : place, rating : rating});
  }
  async getRating(place: Place|null) {
    if (!place) {
      return undefined
    }
    const avg =
        await Post.query().where('place_id', place.id).avg('stars as avg');
    return await avg[0].$extras.avg
  }
}
