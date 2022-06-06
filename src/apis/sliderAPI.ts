import { getHttpClient } from '../app/appHttpClient';
import { appendQuery } from '../utils/url';

export const sliderAPI = {
  async loadSlider(sliderId: string, slidePath?: string) {
    let apiPath = `/slider/${sliderId}`;
    if (slidePath) {
      apiPath = appendQuery(slidePath, {
        sliderId,
      })
    }
    return getHttpClient()
      .get(apiPath, {
        headers: {
          "x-mock-url": `./mockData/${sliderId}`
        }
      })
  }
}
