import axios from 'axios';
import { config } from '../config';

export async function getImageForItem(id) {
  try {
    const response = await axios.get(
      `${config.api.baseUrl}/media?parent=${id}`
    );
    const images = getImageList(response.data);
    return { id, images };
  } catch (err) {
    return {};
  }
}

function  getImageList(array){
   var response = [
     {
      key: "image_base_poster",
      lable:"poster",
      link: ""
     },
     {
      key: "image_base_16x9",
      lable:"16x9",
      link: ""
     },
     {
      key: "image_base_1x1",
      lable:"1x1",
      link: ""
     },
     {
      key: "image_base_3x4",
      lable:"3x4",
      link: ""
     }
  ];
  
  if(array && array.length > 0 ){
    response.map(image => {
        array.map(item => {
          if(image.lable == item.slug ){
            image.link = item.source_url;
          }
          return;
        })
    })
    response.push(
     {
       key: "image_base",
       lable:"image_base",
       link: array[0].source_url
      }
    )
  }
   
  return response;
}
