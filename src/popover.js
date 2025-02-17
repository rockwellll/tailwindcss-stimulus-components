// A simple inline popover to be used wherever needed, with a configurable offset.
// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
//<p>
//  Beginning in 2015, Google introduced what is called the
//    <div class="popover inline-block" data-controller="popover" data-popover-translate-x="0" data-popover-translate-y="-128%" data-action="mouseover->popover#mouseOver mouseout->popover#mouseOut">
//      <span class="underline">'local snack pack',</span>
//      <div class="content hidden absolute max-w-xs bg-grey-light rounded p-2" data-popover-target="content">
//        Terrible name - we know. But the biggest name in SEO came up with it.
//      </div>
//    </div>
//  which shows you local search results before normal organic results.
//</p>

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['content']
  static values = {
    translateX: { type: String, default: "0" },
    translateY: { type: String, default: "0"},
  }

  static classes = ['toggle']

  // Sets the popover offset using Stimulus data map objects.
  initialize() {
    if(this.data.get('translateX')) {
      this.translateXValue = this.data.get('translateX')
    }

    if(this.data.get('translateY')) {
      this.translateYValue = this.data.get('translateY')
    }

    this.contentTarget.setAttribute(
      'style',
      `transform:translate(${this.translateXValue}, ${this.translateYValue});`,
    )
  }

  // Show the popover
  mouseOver() {
    this.contentTarget.classList.remove(this._toggleClass)
  }
  // Hide the popover
  mouseOut() {
    this.contentTarget.classList.add(this._toggleClass)
  }

  get _toggleClass() {
    return this.hasToggleClass ? this.toggleClass : 'hidden'
  }
}
