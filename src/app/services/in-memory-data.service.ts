import {InMemoryDbService, ResponseOptions, RequestInfo, STATUS, getStatusText} from 'angular-in-memory-web-api';

const materials = [];

export class InMemoryDataService implements InMemoryDbService {
  id = 1;

  constructor() {
  }

  // In memory DB generator
  createDb(reqInfo?: RequestInfo) {
    for (this.id; this.id <= 300; this.id++) {
      materials.push({
        id: this.id,
        name: 'Material_' + this.id,
        article_id: 'article_' + this.id,
        tags: ['Paid'],
        customers: [{value: 'customer_1'}, {value: 'customer_2'}],
        states: [{value: 'completed'}],
        work_states: [{value: 'Waiting for external feedback'}],
        special_requests: 'Need to be inside scene. At least five objects must be used in scene. The area of the scene should be more than 12x30ft.',
        gallery_image: '../assets/images/shader-balls/mat_' + Math.floor(Math.random() * (22 - 1 + 1) + 1) + '.jpg',
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue nunc nec interdum posuere. Curabitur bibendum vestibulum ex eget elementum. Phasellus imperdiet tortor mauris. Maecenas vestibulum ligula cursus lectus tempus posuere. Quisque rutrum nisl non urna ullamcorper, eu volutpat nibh ornare. Nunc ac lectus rutrum, aliquet ante sed, aliquam justo. Etiam libero nisi, pulvinar sed ligula quis, ultrices dignissim lacus. Phasellus facilisis tempor sollicitudin.'
      });
    }
    return {materials};
  }

  // HTTP GET interceptor
  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'materials' && reqInfo.query.has('page')) {
      return this.getMaterials(reqInfo);
    }
    return undefined;
  }

  // HTTP GET interceptor handles requests for Materials
  private getMaterials(reqInfo: RequestInfo) {

    return reqInfo.utils.createResponse$(() => {
      // console.log('HTTP GET override');
      const page = reqInfo.query.get('page');
      const limit = reqInfo.query.has('limit') ? reqInfo.query.get('limit') : 10;
      console.log('PAGE is ' + page + ' LIMIT is ' + limit);
      const data = materials.slice(Number(limit[0]) * (Number(page[0]) - 1), Number(limit[0]) * (Number(page[0])));
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? {data} : data,
          status: STATUS.OK
        } :
        {
          body: {error: 'No data found'},
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);

    });
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
