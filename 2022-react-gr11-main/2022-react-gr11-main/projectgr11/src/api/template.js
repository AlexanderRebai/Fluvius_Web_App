import { axios } from '.';
import config from '../config.json';

export const getAllTemplates = async () => {
  const {data} = await axios.get(`${config.base_url}/template`);
  
  return data
};

export const getTemplateById = async (id) => {
    const {data} = await axios.get(`${config.base_url}/template/${id}`);
    
    return data
  };

export const updateTemplate = async (
    id,
    role,
    template,
    categorieIDs,
) => {
    const {
        data
    } = await axios({
        method: 'post',
        url: `template/${id}`,
        data: {
            role,
            template,
            categorieIDs,
        },
    });
    return data;
};
