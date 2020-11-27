import http from "../http-common";

class PersonService {
  getAll() {
    return http.get("/employees");
  }

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data) {
    return http.post("/employees", data);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }

  getImageCount(id) {
    return http.get(`/imagecount/${id}`);
  }

  getImage(id) {
    return http.get(`/images/${id}`);
  }

  postImage(id, data) {
    return http.post(`/images/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteImages(id) {
    return http.delete(`/images/${id}`);
  }

}

export default new PersonService();