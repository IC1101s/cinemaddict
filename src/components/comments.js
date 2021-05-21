import {getRandomIntegerNumber} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createCommentMarkup = (comment) => {
  return comment.map((it) => { 
    return (
      `<li class="film-details__comment">
				<span class="film-details__comment-emoji">
				  <img src="${it.emojiImage}" width="55" height="55" alt="emoji-${it.name}">
				</span>
				<div>
				  <p class="film-details__comment-text">${it.text}</p>
				  <p class="film-details__comment-info">
				    <span class="film-details__comment-author">${it.author}</span>
				    <span class="film-details__comment-day">${it.day}</span>
				    <button class="film-details__comment-delete">Delete</button>
				  </p>
				</div>
			</li>`
    );
  })
	.join(`\n`);
};

const createEmogiInputMarkup = (emogi) => {
  return emogi.map((it, index) => { 
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${it.name[index]}" value="${it.name[index]}">
			 <label class="film-details__emoji-label" for="emoji-${it.name[index]}">
			   <img src="${it.emojiImage[index]}" width="30" height="30" alt="emoji">
			 </label>`
    );
  })
	.join(`\n`);
};

const createCommentsTemplate = (comments, emogis) => {
  const createComments = createCommentMarkup(comments);
  const createEmogisInputs = createEmogiInputMarkup(emogis);
  const commentCount = getRandomIntegerNumber(0, 5);

  return `<div class="form-details__bottom-container">
	  <section class="film-details__comments-wrap">
	    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

	    <ul class="film-details__comments-list">
	    	${createComments}
	    </ul>

	    <div class="film-details__new-comment">
	      <div for="add-emoji" class="film-details__add-emoji-label"></div>

	      <label class="film-details__comment-label">
	        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
	      </label>

	      <div class="film-details__emoji-list">
	        ${createEmogisInputs}
	      </div>
	    </div>
	  </section>
  </div>`
};

export default class Comments extends AbstractComponent {
  constructor(comments, emogis) {
  	super();

    this._comments = comments;
    this._emogis = emogis;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments, this._emogis);
  }
}
