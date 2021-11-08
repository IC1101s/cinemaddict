import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatDateHumanReadable} from "../utils/date.js"; 

const createEmojiTemplate = (valueEmoji) => {
	return `<img src="./images/emoji/${valueEmoji}.png" width="55" height="55" alt="emoji-${valueEmoji}">`;
};

const createCommentMarkup = (comments) => {	
  return comments.map((it) => { 
		const dateHumanReadable = formatDateHumanReadable(it.date);

    return (
      `<li class="film-details__comment">
				<span class="film-details__comment-emoji">
				  <img src="${it.emojiImage}" width="55" height="55" alt="emoji-${it.emoji}">
				</span>
				<div>
				  <p class="film-details__comment-text">${it.text}</p>
				  <p class="film-details__comment-info">
				    <span class="film-details__comment-author">${it.author}</span>
				    <span class="film-details__comment-day">${dateHumanReadable}</span>
				    <button class="film-details__comment-delete">Delete</button>
				  </p>
				</div>
			</li>`
    );
  })
	.join(`\n`);
};

const createEmojisInputMarkup = (comments) => {
  return comments.map((it, index) => { 	
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${it.emojis[index]}" value="${it.emojis[index]}">
			 <label class="film-details__emoji-label" for="emoji-${it.emojis[index]}">
			   <img src="${it.emojiImages[index]}" width="30" height="30" alt="emoji-${it.emojis[index]}">
			 </label>`
    );
  })
  .join(`\n`);
};

const createCommentsTemplate = (film, comments, valueEmoji) => {
	const commentsLength = film.countComments;
	const countComments = comments.slice(0, commentsLength);

  const createComments = createCommentMarkup(countComments);
  const createEmojisInputs = createEmojisInputMarkup(comments);
  const createEmoji = valueEmoji ? createEmojiTemplate(valueEmoji) : ``;
  
  return (
  	`<div class="form-details__bottom-container">
		  <section class="film-details__comments-wrap">
		    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsLength}</span></h3>

		    <ul class="film-details__comments-list">
		    	${createComments}
		    </ul>

		    <div class="film-details__new-comment">
		      <div for="add-emoji" class="film-details__add-emoji-label">${createEmoji}</div>

		      <label class="film-details__comment-label">
		        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
		      </label>

		      <div class="film-details__emoji-list">
		        ${createEmojisInputs}
		      </div>
		    </div>
		  </section>
	  </div>`
  );
};

export default class FilmDetailsComments extends AbstractSmartComponent {
  constructor(film, comments) {
  	super();

    this._film = film;
    this._comments = comments;

    this._valueEmoji = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentsTemplate(this._film, this._comments, this._valueEmoji);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._valueEmoji = null;

    this.rerender();
  }

  _subscribeOnEvents() {
  	const element = this.getElement();

		element.querySelectorAll(`.film-details__emoji-item`).forEach((it) => {
      it.addEventListener(`click`, () => {
        this._valueEmoji = it.value;

        this.rerender();  
      });
    });
  }
}
