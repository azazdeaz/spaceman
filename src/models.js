import {observable} from 'mobservable'

export class Block {
  @observable selectedTabId: number = null
  @observable hole: boolean = false

  seralize() {
    return {
      selectedTabId: this.selectedTabId,
      hole: this.hole
    }
  }
}
