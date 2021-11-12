export default class Comments {
	constructor() {
		this._comments = [];
	}

	setComments(comments) {
		this._comments = Array.from(comments);
	}

  getComments() {
    return this._comments;
  }

  addComment(comments) {
    this._comments = [].concat(comments, this._comments);
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);
    
    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    return true;
  }
}
