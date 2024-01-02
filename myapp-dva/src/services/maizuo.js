import request from "../utils/request";

export function getListApi() {
  return request(
    "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
    {
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }
  );
}
