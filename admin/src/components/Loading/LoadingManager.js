class LoadingManager {
  _defaultLoading = null;

  register(_ref) {
    this._defaultLoading = _ref;
  }

  unregister(_ref) {
    if (!!this._defaultLoading && this._defaultLoading._id && this._defaultLoading._id === _ref._id) {
      this._defaultLoading = null;
    }
  }

  getDefault() {
    return this._defaultLoading;
  }
}

const loadingManager = new LoadingManager();

export default loadingManager;
