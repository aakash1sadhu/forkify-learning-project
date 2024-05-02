import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    //Last page
    if (curPage === numPages) {
      return this._generateMarkupButton('prev');
    }
    //Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }

    //Page 1, no other pages
    return '';
  }

  _generateMarkupButton(type) {
    const curPage = this._data.page;
    const direction = type === 'prev' ? 'left' : 'right';
    const target = type === 'prev' ? curPage - 1 : curPage + 1;
    return `
    <button class="btn--inline pagination__btn--${type}" data-goto="${target}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${direction}"></use>
          </svg>
          <span>Page ${target}</span>
        </button>
    `;
  }
}

export default new PaginationView();
