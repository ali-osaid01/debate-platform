import api from "./middleware";

export const fetchCalenderEvents = async () => {
    const { data } = await api.get("/calender");
    return {events:data.data.data}
}