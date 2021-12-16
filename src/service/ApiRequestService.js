import { API_BACKEND_ADDRESS } from '../const';

export const ApiRequestService = async (method, data) => {
  console.log(API_BACKEND_ADDRESS)
  const url = `${API_BACKEND_ADDRESS}/${method}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};
