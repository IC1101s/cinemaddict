export default class Comments {
	constructor() {
		this._comments = [];
	}

	setComments(comments) {
		this._comments = comments;
	}

  getComments() {
    return this._comments;
  }
}
