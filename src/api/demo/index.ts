import request from "@/utils/axios/axios";

enum API {
  example = "/api/hotlist?type=history",
}

export const getAPI = () => {
  return request.get({ url: API.example });
};
