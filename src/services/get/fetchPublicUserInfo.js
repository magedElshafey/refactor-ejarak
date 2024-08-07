import { request } from "../axios";
const fetchUserNamePhoto = async (id) => {
  try {
    if (id) {
      const response = await request({ url: `/users/name-photo/${id}` });
      if (response.status === 200) {
        return response.data;
      }
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default fetchUserNamePhoto;
