class View {
	_data;

	render(data = null) {
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();

		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderLoading() {
		const markup = `<p>Loading...</p>`;
		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderError(message = this._errorMessage) {
		this._clear();
		this._parentEl.insertAdjacentHTML(
			'afterbegin',
			`<p>${message}</p>`
		);
	}

	_clear() {
		this._parentEl.innerHTML = '';
	}
}

export default View;
