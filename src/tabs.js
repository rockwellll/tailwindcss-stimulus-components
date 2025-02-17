import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['tab', 'panel']
  static classes = ['activeTab', 'inactiveTab']

  connect() {
    if (this.anchor) this.index = this.tabTargets.findIndex((tab) => tab.id === this.anchor)
    this.showTab()
  }

  change(event) {
    event.preventDefault()

    // If target specifies an index, use that
    if (event.currentTarget.dataset.index) {
      this.index = event.currentTarget.dataset.index

    // If target specifies an id, use that
    } else if (event.currentTarget.dataset.id) {
      this.index = this.tabTargets.findIndex((tab) => tab.id == event.currentTarget.dataset.id)

    // Otherwise, use the index of the current target
    } else {
      this.index = this.tabTargets.indexOf(event.currentTarget)
    }

    window.dispatchEvent(new CustomEvent('tsc:tab-change'))
  }

  showTab() {
    this.tabTargets.forEach((tab, index) => {
      const panel = this.panelTargets[index]

      if (index === this.index) {
        panel.classList.remove('hidden')
        tab.classList.remove(...this._inactiveTabClasses)
        tab.classList.add(...this._activeTabClasses)

        // Update URL with the tab ID if it has one
        // This will be automatically selected on page load
        if (tab.id) {
          location.hash = tab.id
        }
      } else {
        panel.classList.add('hidden')
        tab.classList.remove(...this._activeTabClasses)
        tab.classList.add(...this._inactiveTabClasses)
      }
    })
  }

  get index() {
    return parseInt(this.data.get('index') || 0)
  }

  set index(value) {
    this.data.set('index', (value >= 0 ? value : 0))
    this.showTab()
  }

  get anchor() {
    return (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : null;
  }

  get _activeTabClasses() {
    if(this.hasActiveTabClass) {
      return this.activeTabClasses
    } else {
      return (this.data.get('activeTab') || 'active').split(' ')
    }
  }

  get _inactiveTabClasses() {
    if(this.hasInactiveTabClass) {
      return this.inactiveTabClasses
    } else {
      return (this.data.get('inactiveTab') || 'inactive').split(' ')
    }
  }
}
