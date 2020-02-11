export default class Api {
  constructor(config) {
    this.url = config.url;
    this.token = config.token;
    this.content_type = config.content_type;
    this.user = {};
  }

  async getCards() {
    return fetch(this.url + "/cohort6/cards", {
      method: "GET",
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async addNewCard(name, link) {
    return fetch(this.url + "/cohort6/cards", {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": this.content_type
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async deleteCard(card_id) {
    return fetch(this.url + "/cohort6/cards/" + card_id, {
      method: "DELETE",
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async getUser() {
    return fetch(this.url + "/cohort6/users/me", {
      method: "GET",
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async saveProfile(name, about) {
    return fetch(this.url + "/cohort6/users/me", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": this.content_type
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async addLike(card_id) {
    return fetch(this.url + "/cohort6/cards/like/" + card_id, {
      method: "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": this.content_type
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async disLike(card_id) {
    return fetch(this.url + "/cohort6/cards/like/" + card_id, {
      method: "DELETE",
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}